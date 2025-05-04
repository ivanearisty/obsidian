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
## Tasks
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

### 2.1
1. **Allow incoming ICMP echo requests (ping requests):**
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
 2. **Allow outgoing ICMP echo replies (ping replies):**
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT

