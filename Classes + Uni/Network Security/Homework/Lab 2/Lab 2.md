Since seedlabs said from vm or attacker, i ran from vm since i was using python environments that caused issues with permissions
## Q1 
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

## Q2 Task 1.2: Spoofing ICMP Packets

Spoof an ICMP echo request packet with source IP address 8.8.8.8 and send to Host A. Use Wireshark to show that it replies back with echo replies.