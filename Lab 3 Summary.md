---
tags:
  - ns
---
# Proof of Lab Completion: ARP Cache Poisoning and MITM Attacks
## Q1.1 Task 1.A: ARP Cache Poisoning (using ARP request)

### Task Objective
We want to poison Host A's ARP cache so that it incorrectly maps Host B's IP address (`10.9.0.6`) to Host M's MAC address (`02:42:0a:09:00:69`).
### Proof of Completion

My code identifies:

```python
    IP_A = "10.9.0.5"
    MAC_A = "02:42:0a:09:00:05"
    IP_B = "10.9.0.6"
    MAC_B = "02:42:0a:09:00:06"
    MAC_M = "02:42:0a:09:00:69"
```

Looking at Frame 1 and 2, this is the ARP request from Host M to Host A, where M is asking for A's MAC address but providing B's IP (10.9.0.6) as the sender IP and M's MAC.

![[Screenshot 2025-06-04 at 1.02.07 AM.png]]

Frame 1 precisely matches all the characteristics of the malicious ARP request.

It is an ARP request (`opcode=1`) originating from Host M's MAC, targeting Host A's MAC. Crucially, within the ARP payload, it falsely claims that the sender IP is `10.9.0.6` (`IP_B`) while providing `MAC_M` as the sender MAC.

Furthermore, even though just in the pcap we can't see the result of arp -n on A, the second frame makes it very clear that it was indeed tricked:

![[Screenshot 2025-06-04 at 1.03.09 AM.png]]
### **Q1.2 Task 1.B: ARP Cache Poisoning (using ARP reply)**

- **Task Objective (from Gradescope):** "On host M, construct an ARP reply packet and send to host A. Check A’s ARP cache, and see whether M’s MAC address is mapped to B’s IP address. Try the attack for two different scenarios: Scenario 1: B’s IP is already in A’s cache. Scenario 2: B’s IP is not in A’s cache."
    
- **Simplified Understood Requirements:**
    
    - Craft an ARP Reply from M to A.
        
    - Packet should make A map IP_B to MAC_M.
        
    - Key ARP fields: `opcode=2`, `arp.hw.src=MAC_M`, `arp.src.proto_ipv4=IP_B`, `arp.hw.dst=MAC_A`, `arp.dst.proto_ipv4=IP_A`.
        
- **Proof of Completion (Frame 224 or Frame 24):**
    
    - **Frame 224 Details:**
        
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:05 (MAC_A)`
            
        - `Address Resolution Protocol (reply)`
            
        - `Opcode: reply (2)`
            
        - `Sender MAC address: 02:42:0a:09:00:69 (MAC_M)`
            
        - `Sender IP address: 10.9.0.6 (IP_B)`
            
        - `Target MAC address: 02:42:0a:09:00:05 (MAC_A)`
            
        - `Target IP address: 10.9.0.5 (IP_A)`
            
- **Reasoning for Sufficiency:** Frame 224 (and others like Frame 24) is a correctly constructed malicious ARP reply as required by Task 1.B. It is an ARP reply (`opcode=2`) sent from `MAC_M` to `MAC_A`. The ARP payload falsely asserts that `IP_B` (`10.9.0.6`) is located at `MAC_M` (`02:42:0a:09:00:69`), directly targeting `IP_A` (`10.9.0.5`) as the recipient of this information. This fulfills the requirements for this attack.
    

### **Q1.3 Task 1.C: ARP Cache Poisoning (using ARP gratuitous request message)**

- **Task Objective (from Gradescope):** "On host M, construct an ARP gratuitous request packet, and use it to map M’s MAC address to B’s IP address. Please launch the attack under the same two scenarios as those described in Task 1.B."
    
- **Simplified Understood Requirements:**
    
    - Craft a Gratuitous ARP Request from M.
        
    - Ethernet Destination: Broadcast (`ff:ff:ff:ff:ff:ff`).
        
    - ARP layer: `opcode=1`, `arp.hw.src=MAC_M`, `arp.src.proto_ipv4=IP_B`, `arp.hw.dst=Broadcast`, `arp.dst.proto_ipv4=IP_B`.
        
- **Proof of Completion (Frame 127 or Frame 177):**
    
    - **Frame 127 Details:**
        
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: Broadcast (ff:ff:ff:ff:ff:ff)`
            
        - `Address Resolution Protocol (request)`
            
        - `Opcode: request (1)`
            
        - `Sender MAC address: 02:42:0a:09:00:69 (MAC_M)`
            
        - `Sender IP address: 10.9.0.6 (IP_B)`
            
        - `Target MAC address: Broadcast (ff:ff:ff:ff:ff:ff)`
            
        - `Target IP address: 10.9.0.6 (IP_B)`
            
- **Reasoning for Sufficiency:** Frame 127 demonstrates a correctly formed gratuitous ARP request as per the lab specifications. It's an ARP request sent from `MAC_M` to the Ethernet broadcast address. The ARP payload has `IP_B` as both the sender and target IP addresses, and `MAC_M` as the sender MAC, with the ARP target MAC also set to broadcast. This packet serves to announce that `IP_B` is located at `MAC_M`.
    

### **Q2 Task 2: MITM Attack on Telnet using ARP Cache Poisoning**

- **Task Objective (from Gradescope):** "Hosts A and B are communicating using Telnet, and Host M wants to intercept their communication, so it can make changes to the data sent between A and B... We would like to intercept the TCP packet, and replace a typed character with a fixed character. In this case we want to replace 'Q' with 'Z'."
    
- **Simplified Understood Requirements:**
    
    - Intercept Telnet traffic between A and B via M.
        
    - Replace 'Q' (from A to B) with 'Z'.
        
    - Forward B to A traffic (echoes) unchanged (though they will contain the 'Z').
        
    - Capture specific packet sequence showing the modification and relay.
        
- **Proof of Completion (Frames 662, 663, 665, 666):**
    
    - **Frame 662 (A->M with 'Q'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:05 (MAC_A), Dst: 02:42:0a:09:00:69 (MAC_M)`
            
        - `IP Src: 10.9.0.5 (IP_A), IP Dst: 10.9.0.6 (IP_B)`
            
        - `TCP Dst Port: 23, Telnet Data: Q`
            
    - **Frame 663 (M->B with 'Z'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:06 (MAC_B)`
            
        - `IP Src: 10.9.0.5 (IP_A), IP Dst: 10.9.0.6 (IP_B)`
            
        - `TCP Dst Port: 23, Data: Z`
            
    - **Frame 665 (B->M with echoed 'Z'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:06 (MAC_B), Dst: 02:42:0a:09:00:69 (MAC_M)`
            
        - `IP Src: 10.9.0.6 (IP_B), IP Dst: 10.9.0.5 (IP_A)`
            
        - `TCP Src Port: 23, Telnet Data: Z`
            
    - **Frame 666 (M->A with forwarded echoed 'Z'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:05 (MAC_A)`
            
        - `IP Src: 10.9.0.6 (IP_B), IP Dst: 10.9.0.5 (IP_A)`
            
        - `TCP Src Port: 23, Data: Z`
            
- **Reasoning for Sufficiency:** This sequence of four frames perfectly demonstrates the successful MITM attack on Telnet.
    
    - Frame 662 shows Host A sending 'Q', which is routed to Host M due to ARP poisoning (Eth Dst is `MAC_M`).
        
    - Frame 663 shows Host M changing the payload to 'Z' and forwarding it to Host B (Eth Src `MAC_M`, Eth Dst `MAC_B`).
        
    - Frame 665 shows Host B echoing the 'Z' it received, with this packet also being routed to Host M (Eth Dst `MAC_M`).
        
    - Frame 666 shows Host M forwarding Host B's echo of 'Z' back to Host A (Eth Src MAC_M, Eth Dst MAC_A).
        
        This fulfills all specified packet capture requirements for Task 2 ("Packet from A->M (with a 'Q')", "Packet from M->B (with a 'Z')", "Packet from B->M (with a 'Z')", "Packet from M->A (with a 'Z')").
        

### **Q3 Task 3: MITM Attack on Netcat using ARP Cache Poisoning**

- **Task Objective (from Gradescope):** "This task is similar to Task 2, except that Hosts A and B are communicating using Netcat, instead of Telnet. Host M wants to intercept their communication, so it can make changes to the data sent between A and B... Your task is to replace every occurrence of your student id in the message with a sequence of lowercase a’s."
    
- **Simplified Understood Requirements:**
    
    - Intercept Netcat (port 9090) traffic between A and B via M.
        
    - Replace student ID (from A to B) with a string of 'a's of the same length.
        
    - Capture specific packet sequence showing the modification.
        
- **Proof of Completion (Frames 1315, 1316):**
    
    - **Frame 1315 (A->M with student ID 'iae225'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:05 (MAC_A), Dst: 02:42:0a:09:00:69 (MAC_M)`
            
        - `IP Src: 10.9.0.5 (IP_A), IP Dst: 10.9.0.6 (IP_B)`
            
        - `TCP Dst Port: 9090, Data: iae225\n`
            
    - **Frame 1316 (M->B with 'aaaaaa'):**
        
        - `Ethernet II, Src: 02:42:0a:09:00:69 (MAC_M), Dst: 02:42:0a:09:00:06 (MAC_B)`
            
        - `IP Src: 10.9.0.5 (IP_A), IP Dst: 10.9.0.6 (IP_B)`
            
        - `TCP Dst Port: 9090, Data: aaaaaa\n`
            
- **Reasoning for Sufficiency:**
    
    - Frame 1315 shows Host A sending the student ID "iae225" (plus a newline) to port 9090. Due to ARP poisoning, this packet is routed to Host M (Eth Dst is `MAC_M`).
        
    - Frame 1316 immediately follows, showing Host M sending a packet to Host B (Eth Src MAC_M, Eth Dst MAC_B) on port 9090, with the original IP source and destination. The payload has been successfully modified from "iae225\n" to "aaaaaa\n", which is the same length.
        
        This sequence directly demonstrates the interception and modification as required by Task 3 ("Packet from A->M (with your netID)", "Packet from M->B (with "aaaaaa")").
        

This detailed breakdown, referencing specific frames and their contents, confirms that all tasks were executed correctly, and the required evidence is present in the submitted `.pcap` file.