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

Allowing dev-containers traffic from host VM
```bash
# Necessary rules to run vscode:dev-containers 
# Allowing incoming tcp traffic from the Docker bridge IP
sudo iptables -I INPUT 1 -s 172.17.0.1 -p tcp -j ACCEPT
# Allowing outgoing tcp traffic to the Docker bridge IP 
sudo iptables -I OUTPUT 1 -d 172.17.0.1 -p tcp -j ACCEPT
# End of necessary rules

# Start of default policy rules
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
# End of default policy rules

# Start of custom rules

# End of custom rules
```

### 2.1
1. **Allow incoming ICMP echo requests (ping requests):**
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
 2. **Allow outgoing ICMP echo replies (ping replies):**
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT


```
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
