---
tags:
  - ns/hw/lab/lab1
---
[Lab 1 Submission](https://www.gradescope.com/courses/968007/assignments/5673663/submissions/new)


# Main

- Download the `labsetup.zip` file for this lab: [TCP Attacks Lab](https://seedsecuritylabs.org/Labs_20.04/Networking/TCP_Attacks/) (Those on Apple Silicon, please use the `Labsetup-arm.zip` file instead)
- [Docker Manual](https://github.com/seed-labs/seed-labs/blob/master/manuals/docker/SEEDManual-Container.md) (if more help is needed)

Note 1: Make sure your environment is setup, especially docker, in section 2.1, before proceeding to the tasks

Note 2: For Q1, you do not need to do the python/scapy portion. Just simply use the provided C code.

Note 3: Only image files (ie. pdf, jpg, png) are accepted as uploads unless otherwise specified.

Note 4: You only need to submit screenshots as specified here on Gradescope. You do not need to submit a report.

# Learnings

## 1. Lab Environment Setup

### 1.1 Uploading Labsetup Files

To get the **`Labsetup.zip`** (or equivalent) onto your droplet/VM:

```bash
# From your local machine
scp Labsetup.zip seed@<your-droplet-ip>:/home/seed/
```

- If the `seed` account has no password, you can log in as `root` first or use SSH keys.
- Alternatively, upload to `/root/` and then copy to `/home/seed` with `chown seed:seed`.

1. Use an SFTP client like **FileZilla** or **WinSCP**.
2. Host = `<your-droplet-ip>`, Port = `22`, User = `root` (or `seed` if you have an SSH key).
3. Drag `Labsetup.zip` to the desired folder.

Once uploaded, unzip **inside** the VM (not in a shared folder):

```bash
mkdir ~/Labsetup
cp Labsetup.zip ~/Labsetup
cd ~/Labsetup
unzip Labsetup.zip
```

---

### 1.2 Docker & Docker-Compose

**Common Docker Compose commands**:

```bash
docker-compose build      # Build container images
docker-compose up         # Start containers (in foreground)
docker-compose up -d      # Start containers (in background)
docker-compose down       # Shut down containers
```

**Aliases** (add in `~/.bashrc` or `~/.zshrc`):

```bash
alias dcbuild='docker-compose build'
alias dcup='docker-compose up'
alias dcdown='docker-compose down'
```

**Start the containers**:

```bash
cd ~/Labsetup
docker-compose build
docker-compose up -d
```

(Or equivalently `dcbuild` & `dcup -d` if aliases are set.)

---

### 1.3 Managing Containers

- **List containers**:
    
    ```bash
    docker ps
    # or
    docker ps --format "{{.ID}} {{.Names}}"  # short list
    ```
    
- **Shell into a container**:
    
    ```bash
    docker exec -it <container_id_or_name> /bin/bash
    ```
    
- **Aliases** (add to `~/.bashrc` or `~/.zshrc`):
    
    ```bash
    alias dockps='docker ps --format "{{.ID}} {{.Names}}"'
    docksh() { docker exec -it "$1" /bin/bash; }
    ```
    
    - **dockps** = short container listing
    - **docksh** = shell into a container

---

## 2. tmux Usage

https://iterm2.com/documentation-tmux-integration.html

`tmux` is a terminal multiplexer that lets you manage multiple terminal “windows” (and panes) within one SSH session.

- **Start/attach to a session**:
    
    ```bash
    tmux new -s mysession
    tmux attach -t mysession
    ```
    
- **List sessions**:
    
    ```bash
    tmux ls
    ```
    
- **Kill a session**:
    
    ```bash
    tmux kill-session -t mysession
    ```
    
- **Detach** (`Ctrl+b`, then `d`) leaves session running in background.
- **Create new tmux window**: `Ctrl+b` then `c`.
- **Switch windows**:
    - Next: `Ctrl+b` then `n`
    - Previous: `Ctrl+b` then `p`
    - Select window by number: `Ctrl+b` then `<window_number>`
- **Split panes**:
    - Horizontal: `Ctrl+b` then `"`
    - Vertical: `Ctrl+b` then `%`

When using **iTerm2** with tmux **-CC** (Control Mode), you can create/switch windows via the GUI prompt or the standard `Ctrl+b` commands.
### tmux Usage (Control Mode in iTerm2)

If you're running tmux **with the `-CC` flag** in iTerm2 (tmux Control Mode), instead of using the usual `Ctrl+b` keystrokes, you can send tmux commands directly via iTerm2’s command prompt.

1. **Open the tmux Command Menu**  
   - Press <kbd>Ctrl</kbd>+<kbd>b</kbd>, then <kbd>C</kbd> (capital C).  
   - iTerm2 shows a dialog box titled **“Enter command to send tmux”**.

2. **Useful tmux Commands**  
   - **Create a new window**:  
     ```plaintext
     new-window
     ```
   - **List windows**:  
     ```plaintext
     list-windows
     ```
   - **Split the current window vertically**:  
     ```plaintext
     split-window
     ```
     *(Add `-v` or `-h` if needed, depending on your tmux version and preferences.)*  
   - **Kill a session** (replace “mysession” with the actual session name):  
     ```plaintext
     kill-session -t mysession
     ```
   - **Detach** (if you’d like to “leave” tmux running but return to your normal shell):  
     ```plaintext
     detach
     ```
   - **Help** (lists all tmux commands):  
     ```plaintext
     list-commands
     ```

3. **Press OK** in the dialog box to run the typed command.

> **Tip:**  
> - If you prefer the traditional keystrokes (e.g., `Ctrl+b, c` to create a new window), you can run tmux **without** the `-CC` option. However, in Control Mode, you’ll generally send commands via the iTerm2 popup menu.  
> - You can still use some **basic keystrokes** in Control Mode (`Ctrl+b, n` for next window, etc.), but more advanced actions (like creating windows or listing them) typically require the dialog prompt.

This approach allows each tmux command to be sent directly, one at a time, through iTerm2’s GUI interface.

---

## 3. Telnet Tool

### 3.1 What is Telnet?

- A legacy protocol/tool for remote text-based connections.
- **Unencrypted**—all traffic, including passwords, goes in plain text.
- Useful in closed lab environments (like SEED labs) to demonstrate attacks and inspect traffic easily.

### 3.2 Basic Usage

```bash
telnet <target-ip> <port>
```

- If port is omitted, defaults to `23`.
- For example:
    
    ```bash
    telnet 10.9.0.5 23
    ```
    
- **Exit**: press `Ctrl+]`, then type `quit`.

### 3.3 Why Use Telnet in SEED Labs?

- It’s easy to see and manipulate plaintext traffic for exercises such as TCP session hijacking or SYN flood attacks.
- **Not** recommended for real-world secure communication; use SSH instead.

---

## 4. Key Takeaways from Part 1

1. **TCP SYN Flood Attack**
    
    - Exploits the TCP 3-way handshake by sending many **SYN** packets and not completing the handshake (or spoofing IPs).
    - Fills the victim’s “half-open” connection queue (controlled by `net.ipv4.tcp_max_syn_backlog`).
    - Countermeasure: **SYN cookies** (`net.ipv4.tcp_syncookies`).
2. **SYN Cookie Mechanism**
    
    - When under heavy SYN flood, the server encodes critical info in the initial sequence number (ISN), helping avoid storing state in a backlog queue.
3. **Queue Sizes and Retransmissions**
    
    - The backlog queue can be adjusted using `sysctl -w net.ipv4.tcp_max_syn_backlog=<size>`.
    - TCP retransmission can remove items from the queue, reducing the impact of slow floods.
4. **C vs. Python Attack Programs**
    
    - **Python** (with `scapy`) might be too slow to sustain a full-blown SYN flood.
    - **C** version can send packets faster, making the DoS attack more effective.
5. **Ubuntu Mitigations**
    
    - TCP cache for “proven destinations” can bypass a portion of the flood if the client IP is known.
    - Use `ip tcp_metrics flush` to clear that cache for accurate SYN-flood testing.
6. **Environment**
    
    - The lab uses multiple containers: **attacker**, **victim**, **user** containers.
    - `vncserver` or SSH for remote desktop/terminal access on the droplet/VM.

Overall, **Part 1** focuses on understanding and demonstrating the **SYN flood attack**: how it works, how to launch it, and how to defend against it with **SYN cookies**. The lab also highlights the importance of performance, queue sizes, and kernel parameters when dealing with TCP-based denial-of-service attacks.

---

## 5. Frequently Used Commands Cheat Sheet

```bash
sudo netstat -tulpn | grep 5901  # Show processes listening on port 5901
sudo ss -tulpn | grep 5901       # Alternate for netstat
sudo ufw status                  # Check firewall rules (if UFW is used)
ip a                             # Show IP addresses
```

```bash
vncserver :1                     # Start VNC on display :1 (port 5901)
vncserver -kill :1               # Kill VNC session on display :1
vncserver -list                  # List VNC sessions
```

```bash
# Docker Compose
docker-compose build
docker-compose up -d
docker-compose down

# Docker containers
docker ps
docker exec -it <id> /bin/bash
```

```bash
tmux new -s mysession            # Create / attach to a new session
tmux attach -t mysession         # Attach to an existing session
tmux ls                          # List sessions
tmux kill-session -t mysession   # Kill a session
# Inside tmux:
Ctrl+b c    # New window
Ctrl+b n    # Next window
Ctrl+b p    # Previous window
Ctrl+b "    # Split horizontally
Ctrl+b %    # Split vertically
Ctrl+b d    # Detach
```

```bash
# Python-based SYN Flood (scapy)
python3 synflood.py

# C-based SYN Flood
gcc synflood.c -o synflood
./synflood <target-ip> <port>

# Telnet
telnet <target-ip> <port>
```

# Lab
## Q1 Task 1: SYN Flooding Attack

### Not Working:

![[Screenshot 2025-02-24 at 6.44.24 PM.jpg]]

### Working
![[Screenshot 2025-02-24 at 6.55.16 PM.jpg]]
## Q2 Task 2: TCP RST Attacks on telnet Connections

### Established Connection
![[Screenshot 2025-03-10 at 4.55.32 PM.jpg]]

