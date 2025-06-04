---
tags:
  - ns
---
# Proof of Lab Completion: ARP Cache Poisoning and MITM Attacks

This was compiled from some of the notes that I took while doing the lab, and relating them to submission 2.
## Q1.1 ARP Cache Poisoning (using ARP request)
We want to poison Host A's ARP cache so that it incorrectly maps Host B's IP address (`10.9.0.6`) to Host M's MAC address (`02:42:0a:09:00:69`).

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
## Q1.2 ARP Cache Poisoning (using ARP reply)

We want to construct an ARP reply packet and send to host A, this should poison A and make M’s MAC address point to B’s IP address. 

We could look at frame 224 or frame 24, I'll just focus on 224:

For this I set:

```python
IP_A = "10.9.0.5"
MAC_A = "02:42:0a:09:00:05"
IP_B = "10.9.0.6"
MAC_M = "02:42:0a:09:00:69"
```

and set an opcode of 2 (the reply):

Looking at the frame in question:
![[Screenshot 2025-06-04 at 12.34.09 PM.png]]

Everything is set correctly.

We had to test two scenarios:
	Scenario 1: B’s IP is already in A’s cache.
	Scenario 2: B’s IP is not in A’s cache.

From what I remember, scenario 1 worked, and scenario 2 did not.

The fact that there are multiple frames with the arp reply, I think, proves that I was testing out both scenarios at the time.

## Q1.3 ARP Cache Poisoning (using ARP gratuitous request message)

Here we wanted to construct an ARP gratuitous request packet, and use it to map M’s MAC address to B’s IP address, again using both scenarios.

Here we had to do the: 
```bash
sudo sysctl net.ipv4.conf.eth0.arp_accept=1
```
for host A should accept the gratuitous ARP packet.

Here we can also see a couple of frames where the gratuitous arp was sent out:

![[Screenshot 2025-06-04 at 12.47.09 PM.png]]
![[Screenshot 2025-06-04 at 12.47.26 PM.png]]

I did not take pictures of the output of arp -n on host A at the time, but I distinctly remember troubleshooting it to test out scenarios where net.ipv4.conf.eth0.arp_accept and net.ipv4.conf.all.arp_accept where set to true. 

And, again, the fact that there are two frames corroborates the testing of scenarios 1 and 2...
## Task 2: MITM Attack on Telnet using ARP Cache Poisoning

Into the meat and potatoes now...

We want to intercept the communication and change data sent between A and B... We intercept the TCP packet, and replace a typed character with a fixed character. In this case we wanted to replace 'Q' with 'Z'."

Here we have a very clear picture of the attack working when looking at the following frames:

**662**
![[Screenshot 2025-06-04 at 12.53.30 PM.png]]
**663**
![[Screenshot 2025-06-04 at 12.54.10 PM.png]]
**665**
![[Screenshot 2025-06-04 at 12.55.20 PM.png]]
**666**
![[Screenshot 2025-06-04 at 12.55.37 PM.png]]

This sequence of four frames perfectly demonstrates the successful MITM attack on Telnet.

Frame 662 shows Host A sending 'Q', which is routed to Host M due to ARP poisoning (**Eth Dst is `MAC_M`**).

Frame 663 shows Host M changing the payload to 'Z' and **forwarding** it to Host B (Eth Src `MAC_M`, Eth Dst `MAC_B`).

Frame 665 shows Host B **echoing the 'Z' it received**, with this packet also being routed to Host M (Eth Dst `MAC_M`).

***Frame 666 shows Host M forwarding Host B's echo of 'Z' back to Host A (Eth Src MAC_M, Eth Dst MAC_A).***

And, from the gradescope requirements, we had:

> To complete this task, you will need the following in your Wireshark capture:
> 
    Packet from A->M (with a 'Q')
    Packet from M->B (with a 'Z')
    Packet from B->M (with a 'Z')
    Packet from M->A (with a 'Z')

Finally, this was not highlighted on the submission, but the process for the MITM involved manipulating the `net.ipv4.ip_forward` flag to start the telnet connection (turning it on) and then running our script and immediately disabling the flag.
## Task 3: MITM Attack on Netcat using ARP Cache Poisoning

