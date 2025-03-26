
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

![[Screenshot 2025-03-21 at 7.10.10 AM.jpg | 600]]
![[Screenshot 2025-03-21 at 7.22.20 AM.jpg]]
![[Screenshot 2025-03-21 at 7.25.03 AM.jpg | 1000]]

And I got a bunch of "Host administratively prohibited" messages along the way. 

I think they don't like me :D 

![[Screenshot 2025-03-21 at 7.29.17 AM.jpg]]