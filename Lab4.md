---
tags:
  - NS/hw/lab4
---
## Commands

![[Screenshot 2025-05-02 at 10.03.24 PM.png]]

```bash
iptables 
-t <table> (Table)
-<operation> <chain> (Chain)
<rule> (Rule)
-j <target> (Action)
```

```bash
// List all the rules in a table (without line number)
iptables -t nat -L -n
// List all the rules in a table (with line number)
iptables -t filter -L -n --line-numbers
// Delete rule No. 2 in the INPUT chain of the filter table
iptables -t filter -D INPUT 2
// Drop all the incoming packets that satisfy the <rule>
iptables -t filter -A INPUT <rule> -j DROP
```

Showing rules
iptables -L -v

Flushing rules
iptables -F

iptables -F INPUT
iptables -F OUTPUT

Setting default policy:
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

Writing rules

``` bash
my.rules > vim
chmod 755 my.rules # makes it executable
./my.rules
```

Allowing dev-containers traffic from host VM
```bash
# Necessary rules to run vscode:dev-containers 
echo "Allowing Loopback traffic..."
# 1. Allow ALL loopback traffic 
iptables -I INPUT 1 -i lo -j ACCEPT
iptables -I OUTPUT 1 -o lo -j ACCEPT

echo "Allowing Established/Related traffic..."
# 2. Allow ALL established/related traffic
iptables -I INPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -I OUTPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

# 3. Allow traffic from the host bridge (needed for VS Code stability)
echo "Allowing VS Code Dev Containers traffic..."
iptables -I INPUT 3 -s 172.17.0.1 -p tcp -m conntrack --ctstate NEW -j ACCEPT

# 4. Allow ICMP from host bridge (needed for VS Code stability)
echo "Allowing ICMP traffic..."
iptables -I INPUT 4 -s 172.17.0.1 -p icmp -j ACCEPT
iptables -I OUTPUT 3 -d 172.17.0.1 -p icmp -j ACCEPT
# End of necessary rules
```

## Tasks
### 2.a
1. **Allow incoming ICMP echo requests (ping requests):**
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
 2. **Allow outgoing ICMP echo replies (ping replies):**
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT


```bash
# Necessary rules to run vscode:dev-containers 
# Allowing incoming tcp traffic from the Docker bridge IP
iptables -I INPUT 1 -s 172.17.0.1 -p tcp -j ACCEPT
# Allowing outgoing tcp traffic to the Docker bridge IP 
iptables -I OUTPUT 1 -d 172.17.0.1 -p tcp -j ACCEPT
# End of necessary rules

# Task rules
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT
iptables -P OUTPUT DROP #Set default rule for OUTPUT
iptables -P INPUT DROP #Set default rule for INPUT
```

![[2a.png]]

**What is the purpose of each of the four rules?**
The first two rules relate to packets that are echo-reply (ping). The first accepts them, the second allows sending them.
Since there are no telnet rules, the default policy executes on telnet and therefore the packets get dropped.

**Answer the following questions** 
(1) Can you ping the router?
(2) Can you telnet into the router?
1-Yes
2-No
### 2.b
```bash
#!/bin/bash

# Flushing existing rules
echo "Flushing existing rules..."
iptables -F INPUT
iptables -F OUTPUT
iptables -F FORWARD
# End of flushing existing rules

# Necessary rules to run vscode:dev-containers 
echo "Allowing Loopback traffic..."
# 1. Allow ALL loopback traffic 
iptables -I INPUT 1 -i lo -j ACCEPT
iptables -I OUTPUT 1 -o lo -j ACCEPT

echo "Allowing Established/Related traffic..."
# 2. Allow ALL established/related traffic
iptables -I INPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -I OUTPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

# 3. Allow traffic from the host bridge (needed for VS Code stability)
echo "Allowing VS Code Dev Containers traffic..."
iptables -I INPUT 3 -s 172.17.0.1 -p tcp -m conntrack --ctstate NEW -j ACCEPT

# 4. Allow ICMP from host bridge (needed for VS Code stability)
echo "Allowing ICMP traffic..."
iptables -I INPUT 4 -s 172.17.0.1 -p icmp -j ACCEPT
iptables -I OUTPUT 3 -d 172.17.0.1 -p icmp -j ACCEPT
# End of necessary rules

# Start of default policy rules
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
# End of default policy rules

# Start of custom rules

# Allow Internal -> External Ping Requests
iptables -A FORWARD -i eth1 -o eth0 -p icmp --icmp-type echo-request -j ACCEPT

# Allow External -> Internal Ping Replies
iptables -A FORWARD -i eth0 -o eth1 -p icmp --icmp-type echo-reply -j ACCEPT

# Allow the router to receive ping requests
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Allow the router to send ping replies
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT

# End of custom rules
```
![[Task 2.2 Lab 4]]

txt:
PLEASE UNDERSTAND THAT THERE ARE A LOT OF RULES THAT MUST BE ADDED TO EVEN ACCESS THE CONTAINER FROM MY VSCODE SERVER. 

Chain INPUT (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
 5228 2359K ACCEPT     all  --  lo     any     anywhere             anywhere            
   60  5178 ACCEPT     all  --  any    any     anywhere             anywhere             ctstate RELATED,ESTABLISHED
    0     0 ACCEPT     tcp  --  any    any     rr-s-4vcpu-8gb-240gb-intel-nyc1-01  anywhere             ctstate NEW
    0     0 ACCEPT     icmp --  any    any     rr-s-4vcpu-8gb-240gb-intel-nyc1-01  anywhere            
    1    84 ACCEPT     icmp --  any    any     anywhere             anywhere             icmp echo-request

Chain FORWARD (policy DROP 573 packets, 34476 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    4   336 ACCEPT     icmp --  eth1   eth0    anywhere             anywhere             icmp echo-request
    4   336 ACCEPT     icmp --  eth0   eth1    anywhere             anywhere             icmp echo-reply

Chain OUTPUT (policy DROP 434 packets, 26040 bytes)
 pkts bytes target     prot opt in     out     source               destination         
 5228 2359K ACCEPT     all  --  any    lo      anywhere             anywhere            
   54 31614 ACCEPT     all  --  any    any     anywhere             anywhere             ctstate RELATED,ESTABLISHED
    0     0 ACCEPT     icmp --  any    any     anywhere             rr-s-4vcpu-8gb-240gb-intel-nyc1-01 
    0     0 ACCEPT     icmp --  any    any     anywhere             anywhere             icmp echo-reply


### 2.c
![[Task 2.3 Lab 4]]
Chain INPUT (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
 1160 70041 ACCEPT     all  --  lo     any     anywhere             anywhere            
    0     0 ACCEPT     all  --  any    any     anywhere             anywhere             ctstate RELATED,ESTABLISHED
    0     0 ACCEPT     tcp  --  any    any     rr-s-4vcpu-8gb-240gb-intel-nyc1-01  anywhere             ctstate NEW
    0     0 ACCEPT     icmp --  any    any     rr-s-4vcpu-8gb-240gb-intel-nyc1-01  anywhere            

Chain FORWARD (policy DROP 83 packets, 4980 bytes)
 pkts bytes target     prot opt in     out     source               destination         
   24  1334 ACCEPT     tcp  --  eth0   eth1    anywhere             host1-192.168.60.5.net-192.168.60.0  tcp dpt:telnet
   20  1183 ACCEPT     tcp  --  eth1   eth0    host1-192.168.60.5.net-192.168.60.0  anywhere             tcp spt:telnet

Chain OUTPUT (policy DROP 1 packets, 60 bytes)
 pkts bytes target     prot opt in     out     source               destination         
 1160 70041 ACCEPT     all  --  any    lo      anywhere             anywhere            
    0     0 ACCEPT     all  --  any    any     anywhere             anywhere             ctstate RELATED,ESTABLISHED
    0     0 ACCEPT     icmp --  any    any     anywhere             rr-s-4vcpu-8gb-240gb-intel-nyc1-01 

### 3.a

**ICMP**
![[Screenshot 2025-05-04 at 10.45.09 PM.png]]

**Describe your observation for ICMP connection tracking**. Be sure to specify how long the tracking information is kept once a connection has been established.

icmp     1 29 src=10.9.0.5 dst=192.168.60.5 type=8 code=0 id=6 src=192.168.60.5 dst=10.9.0.5 type=0 code=0 id=6 mark=0 use=1
The number 29 represents the remaining lifetime of this connection tracking entry in seconds
We have type=8 code=0 with type=0 code=0 (request/reply)

**UDP**
![[Screenshot 2025-05-04 at 11.07.46 PM.png]]

