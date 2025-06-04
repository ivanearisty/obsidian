---
tags:
  - ns
---
# Proof of Lab Completion: ARP Cache Poisoning and MITM Attacks

This document outlines the successful completion of each task in the lab, referencing specific frames within the submitted `netID.pcap` file as evidence. The `settings.txt` file used for this lab is:

```
IP_A=10.9.0.5
MAC_A=02:42:0a:09:00:05
IP_B=10.9.0.6
MAC_B=02:42:0a:09:00:06
MAC_M=02:42:0a:09:00:69
payload=iae225
```

---

### **Q1.1 Task 1.A: ARP Cache Poisoning (using ARP request)**

- **Task Objective:** On Host M, construct an ARP _request_ packet and send it to Host A. This packet should be crafted to poison Host A’s ARP cache, making Host A map Host B’s IP address (`10.9.0.6`) to Host M’s MAC address (`02:42:0a:09:00:69`).
- **Understood Requirements:**
    1. The packet must be an ARP Request (`opcode=1`).
    2. It must be sent from Host M to Host A.
    3. The Ethernet source MAC should be `MAC_M`.
    4. The Ethernet destination MAC should be `MAC_A`.
    5. In the ARP layer:
        - Sender MAC (`arp.hw.src`) must be `MAC_M`.
        - Sender IP (`arp.src.proto_ipv4`) must be `IP_B` (the IP being impersonated).
        - Target MAC (`arp.hw.dst`) can be `00:00:00:00:00:00` (typical for requests).
        - Target IP (`arp.dst.proto_ipv4`) must be `IP_A` (the IP whose MAC is being requested).
- **Proof of Completion (Frame 1):**
    - **Frame 1 Details:**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:05 (MAC_A)`
        - `Address Resolution Protocol (request)`
        - `Opcode: request (1)`
        - `Sender MAC address: 02:42:0a:09:00:69 (MAC_M)`
        - `Sender IP address: 10.9.0.6 (IP_B)`
        - `Target MAC address: 00:00:00:00:00:00`
        - `Target IP address: 10.9.0.5 (IP_A)`
        - (Info column in Wireshark: "Who has 10.9.0.5? Tell 10.9.0.6")
- **Reasoning for Sufficiency:** Frame 1 precisely matches all the characteristics of the malicious ARP request required for Task 1.A. It is an ARP request (`opcode=1`) originating from Host M's MAC, targeting Host A's MAC. Crucially, within the ARP payload, it falsely claims that the sender IP is `10.9.0.6` (`IP_B`) while providing `MAC_M` as the sender MAC. This packet is designed to trick Host A into mapping `IP_B` to `MAC_M`.

---

### **Q1.2 Task 1.B: ARP Cache Poisoning (using ARP reply)**

- **Task Objective:** On Host M, construct an ARP _reply_ packet and send it to Host A. This packet should attempt to poison Host A’s cache to map B’s IP (`10.9.0.6`) to M’s MAC (`02:42:0a:09:00:69`). This was to be tested in two scenarios (B's IP already cached, and B's IP not in cache). The critical part is capturing the correctly formed ARP reply.
- **Understood Requirements:**
    1. The packet must be an ARP Reply (`opcode=2`).
    2. It must be sent from Host M to Host A.
    3. The Ethernet source MAC should be `MAC_M`.
    4. The Ethernet destination MAC should be `MAC_A`.
    5. In the ARP layer:
        - Sender MAC (`arp.hw.src`) must be `MAC_M`.
        - Sender IP (`arp.src.proto_ipv4`) must be `IP_B` (the IP being impersonated).
        - Target MAC (`arp.hw.dst`) must be `MAC_A`.
        - Target IP (`arp.dst.proto_ipv4`) must be `IP_A`.
- **Proof of Completion (Frame 224 or Frame 24):**
    - **Frame 224 Details:**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:05 (MAC_A)`
        - `Address Resolution Protocol (reply)`
        - `Opcode: reply (2)`
        - `Sender MAC address: 02:42:0a:09:00:69 (MAC_M)`
        - `Sender IP address: 10.9.0.6 (IP_B)`
        - `Target MAC address: 02:42:0a:09:00:05 (MAC_A)`
        - `Target IP address: 10.9.0.5 (IP_A)`
        - (Info column in Wireshark: "10.9.0.6 is at 02:42:0a:09:00:69")
    - _(Frame 24 shows the same structure and content, indicating a successful packet was sent for this task)._
- **Reasoning for Sufficiency:** Frame 224 (and others like Frame 24) is a correctly constructed malicious ARP reply as required by Task 1.B. It is an ARP reply (`opcode=2`) sent from `MAC_M` to `MAC_A`. The ARP payload falsely asserts that `IP_B` (`10.9.0.6`) is located at `MAC_M` (`02:42:0a:09:00:69`), directly targeting `IP_A` (`10.9.0.5`) as the recipient of this information. This fulfills the requirements for this attack.

---

### **Q1.3 Task 1.C: ARP Cache Poisoning (using Gratuitous ARP request)**

- **Task Objective:** On Host M, construct a gratuitous ARP _request_ packet. This special packet should have the source and destination IP addresses in the ARP layer set to B’s IP (`10.9.0.6`). The destination MAC in both Ethernet and ARP headers should be the broadcast address (`ff:ff:ff:ff:ff:ff`). The goal is to map M’s MAC (`02:42:0a:09:00:69`) to B’s IP.
- **Understood Requirements:**
    1. The packet must be an ARP Request (`opcode=1`).
    2. Ethernet source MAC: `MAC_M`.
    3. Ethernet destination MAC: `ff:ff:ff:ff:ff:ff` (Broadcast).
    4. In the ARP layer:
        - Sender MAC (`arp.hw.src`): `MAC_M`.
        - Sender IP (`arp.src.proto_ipv4`): `IP_B`.
        - Target MAC (`arp.hw.dst`): `ff:ff:ff:ff:ff:ff` (Broadcast, as specified for this task, though sometimes it's `00:00:00:00:00:00` for other gratuitous types).
        - Target IP (`arp.dst.proto_ipv4`): `IP_B` (same as Sender IP).
- **Proof of Completion (Frame 127 or Frame 177):**
    - **Frame 127 Details:**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: Broadcast (ff:ff:ff:ff:ff:ff)`
        - `Address Resolution Protocol (request)`
        - `Opcode: request (1)`
        - `Sender MAC address: 02:42:0a:09:00:69 (MAC_M)`
        - `Sender IP address: 10.9.0.6 (IP_B)`
        - `Target MAC address: Broadcast (ff:ff:ff:ff:ff:ff)` (as per task spec)
        - `Target IP address: 10.9.0.6 (IP_B)`
        - (Info column in Wireshark: "Gratuitous ARP for 10.9.0.6 (Request)")
- **Reasoning for Sufficiency:** Frame 127 demonstrates a correctly formed gratuitous ARP request as per the lab specifications. It's an ARP request sent from `MAC_M` to the Ethernet broadcast address. The ARP payload has `IP_B` as both the sender and target IP addresses, and `MAC_M` as the sender MAC, with the ARP target MAC also set to broadcast. This packet serves to announce that `IP_B` is located at `MAC_M`.

---

### **Q2 Task 2: MITM Attack on Telnet (Replace 'Q' with 'Z')**

- **Task Objective:** Intercept a Telnet session between Host A (client) and Host B (server). Modify TCP packets from A to B by replacing every instance of the character 'Q' with 'Z'. Packets from B to A should be forwarded unchanged.
- **Understood Requirements:**
    1. Successful ARP poisoning of both Host A and Host B, redirecting their traffic through Host M.
    2. Host M's IP forwarding initially on to establish the connection, then turned off.
    3. A Scapy script on Host M to perform the sniff-and-spoof.
    4. Wireshark capture must show:
        - Packet from A to M (destined for B) with payload 'Q'.
        - Packet from M to B (original sender A) with payload 'Z'.
        - Packet from B to M (destined for A, echo) with payload 'Z'.
        - Packet from M to A (original sender B, echo) with payload 'Z'.
- **Proof of Completion (Frames 662, 663, 665, 666):**
    - **Frame 662 (A->M with 'Q'):**
        - `Ethernet II, Src: 02:42:0a:09:00:05 (MAC_A), Dst: 02:42:0a:09:00:69 (MAC_M)`
        - `Internet Protocol Version 4, Src: 10.9.0.5 (IP_A), Dst: 10.9.0.6 (IP_B)`
        - `Transmission Control Protocol, Src Port: <A_Telnet_Port>, Dst Port: 23 (Telnet)`
        - `Telnet, Data: Q` (Actual payload: `51`)
    - **Frame 663 (M->B with 'Z'):**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:06 (MAC_B)`
        - `Internet Protocol Version 4, Src: 10.9.0.5 (IP_A), Dst: 10.9.0.6 (IP_B)`
        - `Transmission Control Protocol, Src Port: <A_Telnet_Port>, Dst Port: 23 (Telnet)`
        - `Data: Z` (Actual payload: `5a`)
    - **Frame 665 (B->M with echoed 'Z'):**
        - `Ethernet II, Src: 02:42:0a:09:00:06 (MAC_B), Dst: 02:42:0a:09:00:69 (MAC_M)`
        - `Internet Protocol Version 4, Src: 10.9.0.6 (IP_B), Dst: 10.9.0.5 (IP_A)`
        - `Transmission Control Protocol, Src Port: 23 (Telnet), Dst Port: <A_Telnet_Port>`
        - `Telnet, Data: Z` (Actual payload: `5a`)
    - **Frame 666 (M->A with forwarded echoed 'Z'):**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:05 (MAC_A)`
        - `Internet Protocol Version 4, Src: 10.9.0.6 (IP_B), Dst: 10.9.0.5 (IP_A)`
        - `Transmission Control Protocol, Src Port: 23 (Telnet), Dst Port: <A_Telnet_Port>`
        - `Data: Z` (Actual payload: `5a`)
- **Reasoning for Sufficiency:** This sequence of four frames perfectly demonstrates the successful MITM attack on Telnet.
    - Frame 662 shows Host A sending 'Q', which is routed to Host M due to ARP poisoning (Eth Dst is `MAC_M`).
    - Frame 663 shows Host M changing the payload to 'Z' and forwarding it to Host B (Eth Src `MAC_M`, Eth Dst `MAC_B`).
    - Frame 665 shows Host B echoing the 'Z' it received, with this packet also being routed to Host M (Eth Dst `MAC_M`).
    - Frame 666 shows Host M forwarding Host B's echo of 'Z' back to Host A (Eth Src `MAC_M`, Eth Dst `MAC_A`). This fulfills all specified packet capture requirements for Task 2.

---

### **Q3 Task 3: MITM Attack on Netcat (Replace Student ID with 'a's)**

- **Task Objective:** Intercept a Netcat session (port 9090) between Host A (client) and Host B (server). Replace every occurrence of your student ID (`iae225`) in messages from A to B with a sequence of lowercase 'a's of the same length (`aaaaaa`).
- **Understood Requirements:**
    1. Successful ARP poisoning of Host A and B.
    2. Host M's IP forwarding initially on, then off.
    3. A Scapy script on Host M for the sniff-and-spoof.
    4. Wireshark capture must show:
        - Packet from A to M (destined for B) with payload containing the student ID.
        - Packet from M to B (original sender A) with payload containing the 'a' string replacement.
- **Proof of Completion (Frames 1315, 1316):**
    - **Frame 1315 (A->M with student ID 'iae225'):**
        - `Ethernet II, Src: 02:42:0a:09:00:05 (MAC_A), Dst: 02:42:0a:09:00:69 (MAC_M)`
        - `Internet Protocol Version 4, Src: 10.9.0.5 (IP_A), Dst: 10.9.0.6 (IP_B)`
        - `Transmission Control Protocol, Src Port: <A_Netcat_Port>, Dst Port: 9090`
        - `Data: iae225\n` (Actual payload: `6961653232350a`)
    - **Frame 1316 (M->B with 'aaaaaa'):**
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:06 (MAC_B)`
        - `Internet Protocol Version 4, Src: 10.9.0.5 (IP_A), Dst: 10.9.0.6 (IP_B)`
        - `Transmission Control Protocol, Src Port: <A_Netcat_Port>, Dst Port: 9090`
        - `Data: aaaaaa\n` (Actual payload: `6161616161610a`)
- **Reasoning for Sufficiency:**
    - Frame 1315 shows Host A sending the student ID "iae225" (plus a newline) to port 9090. Due to ARP poisoning, this packet is routed to Host M (Eth Dst is `MAC_M`).
    - Frame 1316 immediately follows, showing Host M sending a packet to Host B (Eth Src `MAC_M`, Eth Dst `MAC_B`) on port 9090, with the original IP source and destination. The payload has been successfully modified from "iae225\n" to "aaaaaa\n", which is the same length. This sequence directly demonstrates the interception and modification as required by Task 3.

---

This detailed breakdown, referencing specific frames and their contents, confirms that all tasks were executed correctly, and the required evidence is present in the submitted `.pcap` file.