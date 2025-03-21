Since seedlabs said from vm or attacker, i ran from vm since i was using python environments that caused issues with permissions
## Q1 Packet Sniﬃng and Spoofing
### 1.1
```python
## List Network Interfaces
from scapy.all import get_if_list
print(get_if_list())
```
```python
def print_pkt(pkt):
	pkt.show()
pkt = sniff(iface="br-407b98f0a521", filter="icmp", prn=print_pkt)
```
### 1.2
ICMP
### 1.3
"ping" command uses the Internet Control Message Protocol (ICMP) to test network connectivity:
we ping seed@5f6ab58c1854 from seed@a5e78c282aa2
![[Screenshot 2025-03-21 at 5.52.13 AM.jpg | 1200]]
### 1.4
Capture any TCP packet that comes from a specific IP and with a destination port number 23.

Your code must include the following: (1) capture TCP; (2) capture from any specific IP address; and (3) capture to destination port 23.

Hint: Use the attacker machine and write your code for sniﬃng. Then generate telnet traﬃc from the attacker machine to test that your program works.

**tcp and host 10.9.0.1 and port 23**

### 1.5
```python
def print_pkt(pkt):
	pkt.show()
pkt = sniff(iface="br-407b98f0a521", filter="tcp and host 10.9.0.5 and port 23", prn=print_pkt)
```
Used one of the machines for simplicity:
![[Screenshot 2025-03-21 at 6.00.37 AM.jpg | 1200]]

### 1.6
net 10.9.0.0/24
### 1.7
```python
def print_pkt(pkt):
	pkt.show()
pkt = sniff(iface="br-407b98f0a521", filter="net 10.9.0.0/24", prn=print_pkt)
```
Used one of the machines for simplicity:
![[Screenshot 2025-03-21 at 6.03.03 AM.jpg | 1200]]

## Q2 Spoofing ICMP Packets

### 2.1

Spoof an ICMP echo request packet with source IP address 8.8.8.8 and send to Host A. Use Wireshark to show that it replies back with echo replies.
```python
from scapy.all import *
packet = IP(src="8.8.8.8", dst="10.9.0.5") / ICMP()
send(packet)
```

Based on the code above, what is the IP address for (1)?

**8.8.8.8**

Based on the code above, what is the IP address for (2)?

**10.9.0.5**

### 2.2

![[Screenshot 2025-03-21 at 6.21.33 AM.jpg | 1200]]

## Q3 Fully-automated Traceroute

Using the skeleton code below, implement ICMP traceroute using scapy. Do NOT use the built-in scapy traceroute function. Perform a traceroute to 8.8.8.8. Show proof using a Wireshark capture and take a screenshot of your program’s output.
### 3.1
- A: **1**
- B: **8.8.8.8**
- C: packet\[ICMP].type

## Q4 Sniﬃng and then spoofing program

Ubuntu traceroute gives:

![[Screenshot 2025-03-21 at 7.25.59 AM.jpg]] 

or 

![[Screenshot 2025-03-21 at 7.26.20 AM.jpg]]

depending on how it feels...

*So many attempts:*

v1 
```python
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1

ttl=1
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = sr1(ip / icmp, verbose=0)
    
    if packet[ICMP].type == 0:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
        
```
v2 
```python
# Hangs at 5
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1

ttl=6
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = sr1(ip / icmp, verbose=0)
    
    if packet[ICMP].type == 0:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
        

```
v3
```python
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1

ttl=1
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = sr1(ip / icmp, timeout=2,verbose=0)

    if packet is None:
        print(f"TTL {ttl}: No response")
        ttl += 1
        continue

    if packet[ICMP].type == 0:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
        

```
v4
```python
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1

ttl=1
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = sr1(ip / icmp, timeout=3, retry=3, verbose=0)

    if packet is None:
        print(f"TTL {ttl}: No response")
        ttl += 1
        continue

    if packet[ICMP].type == 0:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
        
```
v5
```python
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1, Raw

ttl=1
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = IP(dst="8.8.8.8", ttl=5) / ICMP() / Raw(load="HelloRouter")

    packet = sr1(packet, timeout=3, retry=3, verbose=0)

    if packet is None:
        print(f"TTL {ttl}: No response")
        ttl += 1
        continue

    if packet[ICMP].type == 0:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
        

```

V4 Out:
![[Screenshot 2025-03-21 at 7.06.51 AM.jpg]]

Final Version:
```python
#!/usr/bin/env python3
from scapy.all import IP, ICMP, sr1

ttl=1
destination="8.8.8.8"

while True:
    ip = IP(dst="8.8.8.8", ttl=ttl)

    icmp = ICMP()
    
    packet = sr1(ip / icmp, timeout=3, retry=2, verbose=0)

    if packet is None:
        print(f"TTL {ttl}: No response")
        ttl += 1
        continue
    elif ttl >= 11:
        break
    elif packet.type == 3:
        print("Complete ", packet[IP].src)
        break
    else:
        print("TTL: %d, Source: " %ttl, packet[IP].src)
        ttl+= 1
```

![[Screenshot 2025-03-21 at 7.10.10 AM.jpg | 1200]]
![[Screenshot 2025-03-21 at 7.22.20 AM.jpg]]
![[Screenshot 2025-03-21 at 7.25.03 AM.jpg | 1000]]

And I got a bunch of "Host administratively prohibited" messages along the way. 

I think they don't like me :D 

![[Screenshot 2025-03-21 at 7.29.17 AM.jpg]]
## Q4 Sniﬃng and-then Spoofing

Sniﬃng and-then Spoofing. You need two machines on the same LAN: the VM and the user container.

You will find that when you ping from the terminal, 10.9.0.99 will have a destination
unreachable response. That is the expected result. Your program does not need to work for
this IP. (You do not need to force it to work by performing ARP spoofing.) You will, however,
need to explain why your program does not work for IP 10.9.0.99 (while it’s supposed to work
for 1.2.3.4 and 8.8.8.8).

In this task, you will combine the sniffing and spoofing techniques to implement the following sniff-and-
then-spoof program. You need two machines on the same LAN. From machine A, you ping an IP X. This
will generate an ICMP echo request packet. If X is alive, the ping program will receive an echo reply, and
print out the response. Your sniff-and-then-spoof program runs on the attacker machine, which monitors
the LAN through packet sniffing. Whenever it sees an ICMP echo request, regardless of what the target IP
address is, your program should immediately send out an echo reply using the packet spoofing technique.
Therefore, regardless of whether machine X is alive or not, the ping program will always receive a reply,
indicating that X is alive. You need to write such a program in C, and include screenshots in your report to
show that your program works. Please also attach the code (with adequate amount of comments) in your
report.

### 4.1
