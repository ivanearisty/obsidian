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
