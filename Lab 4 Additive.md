## Task 6

![[Screenshot 2025-05-05 at 12.07.23 AM.png]]

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
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT
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
sudo iptables -L INPUT -v -n --line-numbers
echo "--- OUTPUT Chain ---"
sudo iptables -L OUTPUT -v -n --line-numbers
echo "--- FORWARD Chain ---"
sudo iptables -L FORWARD -v -n --line-numbers
```