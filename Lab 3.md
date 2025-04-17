Get IP and Mac:
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{.MacAddress}}{{end}}' *DOCKERCONTAINERVALUE*

### 1.1
root@7a593a72b7d6:~# python3 task1a.py

check:
```
ON A
arp -n
```

### 1.2
ON A:
ping -c 1 10.9.0.6

VERIFY ON A:
arp -n

ON M:
```
python3 task1b.py
```

arp -n to verify on a

FAIL:

CLEAR CACHE ON A:
```
arp -d 10.9.0.6
```

CHECK ON A:
`arp -n`

ON M:
```
python3 task1b.py
```

### 1.3

#### Scenario 1: B's IP is already in A's cache
**Establish Cache Entry (on Host A):** 

```
ping -c 1 10.9.0.6
arp -n # Verify 10.9.0.6 maps to 02:42:0a:09:00:06
```

ON M:
```
python3 task1c.py
```

WORKS

#### Scenario 2: B's IP is not in A's cache
**Clear Cache Entry (on Host A):** Delete the specific ARP entry for Host B:
```
    arp -d 10.9.0.6
    arp -n # Verify 10.9.0.6 entry is gone
```

Run the Attack Script (on Host M) Execute the gratuitous ARP script again:
python3 task1c.py
    ```
    
- **Check Cache Again (on Host A):** Run `arp -n` one more time. See if an entry for `10.9.0.6` has been created and if it maps to M's MAC (`02:42:0a:09:00:69`).

## 2
