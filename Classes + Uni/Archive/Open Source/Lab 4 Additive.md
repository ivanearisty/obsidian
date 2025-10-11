## Task 6

![[z/z ScreenShots/Screenshot 2025-05-05 at 12.07.23 AM.png]]

## Task 7

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
iptables -I INPUT 1 -i lo -j ACCEPT
iptables -I OUTPUT 1 -o lo -j ACCEPT
echo "Allowing Established/Related INPUT/OUTPUT traffic..."
iptables -I INPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -I OUTPUT 2 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
echo "Allowing VS Code Dev Containers traffic..."
iptables -I INPUT 3 -s 172.17.0.1 -p tcp -m conntrack --ctstate NEW -j ACCEPT
echo "Allowing ICMP traffic with host..."
iptables -I INPUT 4 -s 172.17.0.1 -p icmp -j ACCEPT
iptables -I OUTPUT 3 -d 172.17.0.1 -p icmp -j ACCEPT
# End of necessary rules

# Start of default policy rules
echo "Setting default DROP policies..."
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
# End of default policy rules

# Start of Custom Rules
echo "Applying Task C rules..."

# Allows the return traffic for any connection that was permitted by a NEW rule in the FORWARD chain
iptables -I FORWARD 1 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

echo "# Rule 1: Allowing Internal -> External NEW connections..."
iptables -A FORWARD -i eth1 -o eth0 -s 192.168.60.0/24 -d 10.9.0.0/24 -m conntrack --ctstate NEW -j ACCEPT

echo "# Rule 2: Allowing Ping to Router..."
iptables -A INPUT -p icmp --icmp-type echo-request -m conntrack --ctstate NEW -j ACCEPT

echo "# Rule 3: Allowing specific Telnet connection..."
iptables -A FORWARD -i eth0 -o eth1 -s 10.9.0.5 -d 192.168.60.5 -p tcp --dport 23 -m conntrack --ctstate NEW -j ACCEPT
# End of Custom Rules

echo "Firewall rules applied."

# List rules to verify
echo "--- INPUT Chain ---"
iptables -L INPUT -v -n --line-numbers
echo "--- OUTPUT Chain ---"
iptables -L OUTPUT -v -n --line-numbers
echo "--- FORWARD Chain ---"
iptables -L FORWARD -v -n --line-numbers
```

```bash
--- INPUT Chain ---
Chain INPUT (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination         
1        6   440 ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0           
2        0     0 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
3        0     0 ACCEPT     tcp  --  *      *       172.17.0.1           0.0.0.0/0            ctstate NEW
4        0     0 ACCEPT     icmp --  *      *       172.17.0.1           0.0.0.0/0           
5        0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0            icmptype 8 ctstate NEW
--- OUTPUT Chain ---
Chain OUTPUT (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination         
1        6   440 ACCEPT     all  --  *      lo      0.0.0.0/0            0.0.0.0/0           
2        0     0 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
3        0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            172.17.0.1          
--- FORWARD Chain ---
Chain FORWARD (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination         
1        0     0 ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
2        0     0 ACCEPT     all  --  eth1   eth0    192.168.60.0/24      10.9.0.0/24          ctstate NEW
3        0     0 ACCEPT     tcp  --  eth0   eth1    10.9.0.5             192.168.60.5         tcp dpt:23 ctstate NEW
```

## Extra Credit

![[z/z ScreenShots/iptables 1.svg]]
```bash
(.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz# uv init
Initialized project `viz`
(.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz# uv venv
Using CPython 3.12.3 interpreter at: /usr/bin/python3.12
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate
(.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz# source .venv/bin/activate
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz# uv pip install blockdiag seqdiag actdiag nwdiag
Resolved 8 packages in 77ms
Prepared 8 packages in 307ms
Installed 8 packages in 13ms
 + actdiag==3.0.0
 + blockdiag==3.0.0
 + funcparserlib==1.0.1
 + nwdiag==3.0.0
 + pillow==11.2.1
 + seqdiag==3.0.0
 + setuptools==80.3.1
 + webcolors==24.11.1
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz/iptable_vis# awk -f iptables-vis.awk < iptables.txt > iptables.dia
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz/iptable_vis# blockdiag iptables.dia -T svg -o iptables.svg
ERROR: 'ImageDraw' object has no attribute 'textsize'
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz/iptable_vis# uv pip uninstall Pillow
Using Python 3.12.3 environment at: /home/seed/viz/.venv
Uninstalled 1 package in 2ms
 - pillow==11.2.1
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz/iptable_vis# uv pip install "Pillow<10.0"
Using Python 3.12.3 environment at: /home/seed/viz/.venv
Resolved 1 package in 5ms
      Built pillow==9.5.0
Prepared 1 package in 22.54s
Installed 1 package in 2ms
 + pillow==9.5.0
(viz) (.venv) root@rr-s-4vcpu-8gb-240gb-intel-nyc1-01:/home/seed/viz/iptable_vis# blockdiag iptables.dia -T svg -o iptables.svg
```