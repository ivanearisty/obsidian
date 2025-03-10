## Commands Explanation

- **`sudo netstat -tulpn | grep 5901`**  
  List all listening TCP/UDP ports with process IDs and filter for port 5901 to check if the VNC server is active.

- **`vncserver -list`**  
  Display a list of all currently running VNC sessions.

- **`vncserver -kill :1`**  
  Terminate the VNC session running on display `:1` (typically port 5901).

- **`tigervncserver -localhost no -xstartup /usr/bin/startxfce4 :1`**  
  Start a TigerVNC session on display `:1`, allowing external connections and using Xfce as the startup desktop environment.

- **`vncserver -localhost no :1`**  
  Start a VNC server on display `:1` with external connections enabled, using the default `~/.vnc/xstartup` script.

- **`vim ~/.vnc/xstartup`**  
  Open the VNC startup configuration file in Vim for editing.

- **`chmod +x ~/.vnc/xstartup`**  
  Make the `xstartup` file executable so that the VNC server can run it on startup.

- **`ls -l ~/.vnc/xstartup`**  
  List the details (including permissions) of the `xstartup` file to confirm it's executable.

- **`sudo apt update`**  
  Update the local package index with the latest available package versions.

- **`sudo apt install xfce4 xfce4-goodies dbus-x11`**  
  Install the Xfce desktop environment, additional Xfce utilities, and DBus support for proper session management.

- **`dbus-launch startxfce4 &`**  
  Start the Xfce desktop environment with DBus support in the background, ensuring necessary services are available.

sysctl net.ipv4.tcp_synack_retries

```zsh
# sysctl -a | grep syncookies (Display the SYN cookie flag)
# sysctl -w net.ipv4.tcp_syncookies=0 (turn off SYN cookie)
# sysctl -w net.ipv4.tcp_syncookies=1 (turn on SYN cookie)
```

### Pw
Xz7zdy5qjnbc7QG

## 2

Starting a telnet server

```
sudo apt-get install telnetd
sudo service inetd restart
```

Checking connections
root@88a18bf75325:/# **netstat -nat**
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:23              0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.11:40553        0.0.0.0:*               LISTEN