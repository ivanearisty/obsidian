---
tags:
  - ns
---
# Lecture

## Lockheed Martin Cyber Kill Chain

1. **Reconnaissance**  
   - Harvesting email addresses, conference information, etc.

2. **Weaponization**  
   - Coupling exploit with backdoor into a deliverable payload.

3. **Delivery**  
   - Delivering the weaponized bundle to the victim via email, web, USB, etc.

4. **Exploitation**  
   - Exploiting a vulnerability to execute code on the victim’s system.

5. **Installation**  
   - Installing malware on the target asset.

6. **Command & Control (C2)**  
   - Establishing a command channel for remote manipulation of the victim.

7. **Actions on Objectives**  
   - With “hands on keyboard” access, intruders accomplish their original goals.

## Six Steps of Network Reconnaissance
1. **Public Information Gathering**  
   - Collect data from open sources (websites, public databases, social media, etc.).
2. **Network Range Determination**  
   - Identify IP ranges and network topology using techniques like whois and DNS queries.
3. **Host Discovery**  
   - Locate live hosts via ping sweeps or other active probing methods.
4. **Service Discovery**  
   - Scan for open ports and running services to build a map of accessible network services.
5. **Fingerprinting & Version Detection**  
   - Determine operating systems and software versions (e.g., via banner grabbing, OS detection).
6. **Vulnerability Mapping**  
   - Correlate service and version data with known vulnerabilities to identify potential weaknesses.

## Collecting Info From Public Sources
- **Use search engine operators for targeted queries:**  
  - **`site:`**  
    - Restricts search results to a specified domain (e.g., `site:poly.edu`).
  - **`intitle:`**  
    - Finds pages that include specific keywords in their title (e.g., `intitle:"network security"`).
  - **`inurl:`**  
    - Returns pages with particular keywords in their URL (e.g., `inurl:admin`).
  - **`related:`**  
    - Discovers websites similar to a given URL.
- **Leverage public databases:**  
  - **SEC’s Edgar:**  
    - Provides access to corporate filings and financial data for publicly traded companies.
  - **Registrars’ Whois Services:**  
    - Offer detailed domain registration information and contact details.
  - **Google Hacking DB:**  
    - Performing reconnaissance using google can be easily automated with known searches.  https://www.exploit-db.com/google-hacking-database
- **Explore social media and networking tools:**  
  - **Maltego:**  
    - Visualizes relationships between network entities and gathers diverse OSINT data.
    - If you have someones email address, you can scrape the web to see wherever this email exists.
  - **Cree.py:**  
    - Automates the gathering of open-source intelligence from social platforms.
- **Dumpster diving or physical observations:**  
  - Physical searches or onsite observations can reveal discarded documents or expose weak security practices.

## Whois and DNS Reconnaissance
- **Whois:**  
  - Query domain registration records to obtain owner, contact, and server details.
- **DNS Recon:**  
  - **Zone Transfers:** Use tools (e.g., `dig`) to attempt AXFR transfers and list DNS records.
  - **Record Types:** Identify A, MX, NS, CNAME, SOA, SRV, PTR, TXT, and HINFO records.
  - **Brute Forcing:** Employ DNS mapping tools to enumerate subdomains.
  - **Split DNS:** Understand that external and internal DNS servers may provide different views of network resources.

## Fields in a IP, TCP, UDP, and ICMP Header
- **IP Header Fields:**  
  - Version, Header Length, Type of Service, Total Length, Identification, Flags, Fragment Offset, Time to Live (TTL), Protocol, Header Checksum, Source IP, Destination IP, Options.
- **TCP Header Fields:**  
  - Source Port, Destination Port, Sequence Number, Acknowledgment Number, Data Offset, Reserved bits, Control Flags (URG, ACK, PSH, RST, SYN, FIN), Window Size, Checksum, Urgent Pointer, Options.
- **UDP Header Fields:**  
  - Source Port, Destination Port, Length, Checksum.
- **ICMP Header Fields:**  
  - Type, Code, Checksum, Identifier, Sequence Number (plus any additional data).

## Method and Possible Responses for Port Scanning with TCP and UDP Packets
- **TCP Scanning Methods:**  
  - **TCP Connect Scan:** Establishes a full TCP connection.
  - **TCP SYN (Half-Open) Scan:** Sends SYN packets without completing the handshake.
  - **TCP FIN/NULL/XMAS Scans:** Send packets with specific or no flags to elicit responses.
- **Possible TCP Responses:**  
  - **SYN/ACK:** Indicates an open port.
  - **RST/ACK:** Indicates a closed port.
  - **No Response/ICMP Unreachable:** May indicate filtered ports.
- **UDP Scanning Methods:**  
  - Send UDP packets to target ports.
- **Possible UDP Responses:**  
  - **No Response:** Could mean open or filtered.
  - **ICMP Unreachable (or Port Unreachable):** Indicates a closed port.
  - **Application-Specific Replies:** May provide further clues on service status.

## nmap Scan Types, Purposes, and Advantages/Disadvantages
- **TCP Connect Scan:**  
  - **Purpose:** Establish a full connection using the OS’s connect() call.
  - **Advantages:** Reliable and easy to implement.
  - **Disadvantages:** Easily logged and detected; slower.
- **TCP SYN Scan:**  
  - **Purpose:** Perform a “half-open” scan by not completing the TCP handshake.
  - **Advantages:** Stealthier and faster than a full connect.
  - **Disadvantages:** Still detectable by modern IDS/IPS systems.
- **TCP FIN, NULL, and XMAS Scans:**  
  - **Purpose:** Exploit TCP RFC 793 behavior to distinguish open vs. closed ports.
  - **Advantages:** Can bypass some firewall rules on UNIX systems.
  - **Disadvantages:** May not work on Windows systems or non-RFC-compliant stacks.
- **TCP ACK Scan:**  
  - **Purpose:** Map out firewall rules and determine if stateful inspection is in use.
  - **Advantages:** Useful for firewall rule mapping.
  - **Disadvantages:** Does not reliabl

## Nessus
## Metasploit

## Misc 
### Attacks
**Denial of Service (DoS)**  
Overloading a target system or network to block legitimate access.

**Destruction of Information**  
Intentionally deleting or corrupting data to render it unusable.

**Dumpster Diving**  
Searching discarded materials for confidential information.

**Emanation**  
Exploiting electromagnetic signals leaking from devices.

**Eavesdropping**  
Secretly intercepting or monitoring communications.

**Embezzlement**  
Illegally diverting assets or funds for personal gain.

**Espionage**  
Spying to obtain confidential or proprietary data.

**Fraud**  
Deceiving others to gain unauthorized benefits or assets.

**Information Warfare**  
Using or manipulating information to gain a strategic advantage.

**Illegal Content or Material**  
Creating, possessing, or distributing prohibited digital content.

**Malicious Code**  
Software (e.g., viruses, worms) designed to harm or exploit systems.

**Masquerading**  
Impersonating another user or system to gain unauthorized access.

**Social Engineering**  
Manipulating people into revealing sensitive information.

**Software Piracy**  
Unauthorized copying, use, or distribution of software.

**IP Address Spoofing**  
Faking an IP address to conceal identity or impersonate a system.

**Terrorism**  
Using digital attacks to intimidate, disrupt, or coerce societies.

**Theft of Passwords**  
Stealing login credentials to gain unauthorized access.

**Use of Exploit Scripts**  
Running automated code to take advantage of known vulnerabilities.

**Network Intrusions**  
Gaining unauthorized entry into computer networks or systems.