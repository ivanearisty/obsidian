Ping 10.9.0.99 and show screenshots of the output from your program and with the ping from the terminal. If this does not work, please explain why.

![[z/z ScreenShots/Screenshot 2025-03-21 at 2.28.46 PM.jpg]]

When our host pings an IP on the LAN, it wants to resolve the MAC from IP through ARP. Since no machine actually owns 10.9.0.99, ARP gets no reply. 

Since ARP is never delivered, we see no ICMP requests from our attacker or wireshark, which is consistent since there is no poisoned arp cache.

When ip is outside LAN, the default gateway is the one tasked with responding to ARP requests, so icmp is delivered and we can spoof them.