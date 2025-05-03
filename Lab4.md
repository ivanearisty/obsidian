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

