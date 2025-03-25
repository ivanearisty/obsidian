# L1
## Lab 1

## Phishing Emails

# L2
## DNS

1. **Recursive name server**
    
    - _Definition:_ Makes a request to locate the website’s IP address on behalf of a host.
    - _Notes:_ Often called a “DNS resolver,” it’s the server your computer contacts first when you type a domain into your browser.
2. **Root name server**
    
    - _Definition:_ Directs queries from the recursive server to the name servers responsible for each top-level domain (TLD).
    - _Notes:_ There are only 13 logical root servers in the world (with many geographic mirrors). They’re at the top of the DNS hierarchy.
3. **TLD name server**
    
    - _Definition:_ Directs queries to the authoritative name server for specific domains under a TLD.
    - _Notes:_ For instance, the .com TLD name server knows where to find the authoritative servers for example.com.
4. **Authoritative name server**
    
    - _Definition:_ Contains all the DNS records (A, CNAME, TXT, etc.) for a given domain.
    - _Notes:_ This is where the “official” DNS information for a domain is stored.
5. **DNS**
    
    - _Definition:_ The overall service (Domain Name System) that maps human-readable domain names to IP addresses.
    - _Notes:_ Think of it as the internet’s “phonebook.”
6. **A records**
    
    - _Definition:_ Contain the IP address information for a domain.
    - _Notes:_ These are the most common DNS records, pointing a hostname (e.g., [www.example.com](http://www.example.com/)) to an IPv4 address.
7. **CNAME records**
    
    - _Definition:_ Used to forward one domain or subdomain to another domain (an alias).
    - _Notes:_ For example, you might use a CNAME to point blog.example.com to example.tumblr.com.
8. **TXT records**
    
    - _Definition:_ Store arbitrary (plaintext) data about servers, networks, and more.
    - _Notes:_ Commonly used for SPF, DKIM, or other text-based verification and policy data.

### How They Fit Together

1. Your **Recursive name server** (resolver) receives a DNS query from your computer.
2. If it doesn’t have the answer cached, it asks a **Root name server**, which points it to the appropriate **TLD name server** (e.g., .com, .org).
3. The TLD name server then points the resolver to the **Authoritative name server** for the domain (e.g., example.com).
4. The Authoritative name server returns the domain’s records (such as **A records** for IPs, **CNAME records** for aliases, or **TXT records** for text data).
5. This chain of lookups is part of the **DNS** service as a whole.

## Wireshark

### General Tips

- **Display vs. Capture Filters:**  
    For analysis of an existing PCAP file, use Wireshark display filters. They hide nonmatching packets rather than discarding them.
- **Finding Fields:**  
    Right-click on a field (e.g., DNS Query Name, HTTP Host) and choose “Apply as Filter” to speed up your work.

---

### Question-by-Question Filters & Steps

1. **What is the server name sought in the first DNS request?**
    
    - **Filter:**
        
        ```
        dns.flags.response == 0
        ```
        
    - **How to Use:**  
        This filter shows only DNS queries (i.e., packets where the response flag is 0). Look at the “Queries” section in the packet details for the Query Name field of the very first DNS request.
2. **What is the first IP address returned in the DNS response for the domain in Q1?**
    
    - **Filter:**
        
        ```
        dns.flags.response == 1 && dns.a
        ```
        
    - **How to Use:**  
        This filter displays DNS responses that include an A record. Open the first DNS response packet and check the Answer section for the first returned IP address.
3. **What is the browser user agent string that issued the search request?**
    
    - **Filter:**
        
        ```
        http.user_agent
        ```
        
    - **How to Use:**  
        This filter narrows the view to HTTP requests that include a User-Agent header. Select the relevant HTTP GET packet and expand its “Hypertext Transfer Protocol” section to view the User-Agent string.
4. **What web server engine is running the website?**
    
    - **Filter:**
        
        ```
        http.response
        ```
        
    - **How to Use:**  
        Filter on HTTP responses and then inspect the “Server” header in one of the responses. The value in this header usually indicates the web server engine (e.g., Apache, Nginx, IIS).
5. **When exporting HTTP content for 'imgingest-5015644562731850884.png', what text appears on that image?**
    
    - **Filter:**
        
        ```
        http contains "imgingest-5015644562731850884.png"
        ```
        
    - **How to Use:**  
        This filter shows packets that mention the image filename. After locating the appropriate HTTP object transfer (or using File > Export Objects > HTTP), open the file and view the text embedded in the image.
6. **How many different IPv4 conversations are there in this capture file?**
    
    - **Method (No direct display filter):**
        - Go to **Statistics > Conversations > IPv4**.
    - **How to Use:**  
        This built-in tool shows each distinct pair of IPv4 addresses that have communicated during the capture.
7. **What was the user searching for on the download.cnet.com website?**
    
    - **Filter:**
        
        ```
        http.host == "download.cnet.com" && http.request
        ```
        
    - **How to Use:**  
        Apply this filter to display only HTTP requests sent to download.cnet.com. Look at the request URL and its parameters to extract the search query. Often, the query will appear as part of the URL (e.g., in the query string after a “?”).

---

### How to Use These Filters in Wireshark

1. **Open the PCAP File:**  
    Open Wireshark, then load the provided PCAP file from the labfiles directory.
    
2. **Apply the Filter:**  
    Enter the appropriate filter string in the “Display Filter” bar at the top and press Enter.
    
3. **Examine the Packets:**  
    Click on individual packets in the filtered list to inspect their detailed fields in the packet details pane.
    
4. **Use Built-in Tools:**  
    For conversation counts or to follow streams (for HTTP), use Wireshark’s Statistics or Follow TCP Stream options.
    
## TCP dump

## General tcpdump Tips

- **Display vs. Write:**  
    Use `-r <filename>` to read a PCAP file and `-w <filename>` to write captured packets into a file.
- **Interface Listing:**  
    The `-D` option lists all available interfaces. Look for “nflog” in the list to see its assigned number.
- **No DNS/Service Resolution:**  
    The `-nn` option tells tcpdump not to convert addresses and port numbers, speeding up output and avoiding ambiguity.
- **BPF Filters:**  
    Like Wireshark, tcpdump accepts BPF (Berkeley Packet Filter) syntax to limit output to specific traffic (e.g., by host, port, or protocol).

---

## Step-by-Step Command Guide for the Lab

### 1. Write Packets to a File

**Question:** Which option can you pass to tcpdump to write captured packets out to a file?  
**Command:**

```bash
tcpdump -i <interface> -w capturefile.pcap
```

**Explanation:**  
The `-w` option specifies the file to which tcpdump writes the captured packets. (Replace `<interface>` with your active interface if capturing live traffic.)

---

### 2. List All Available Interfaces

**Question:** Using tcpdump, list all the available interfaces. What number is `nflog` listed as?  
**Command:**

```bash
tcpdump -D
```

**Explanation:**  
This command outputs all available interfaces with assigned numbers. Look through the output for the line containing “nflog” to note its number.

---

### 3. Display ASCII and Hex Representation of Packets

**Question:** Which option can be passed to tcpdump to display the ASCII and hex representation of the packet contents?  
**Command:**

```bash
tcpdump -nn -X -r tcpdump.pcap
```

**Explanation:**  
The `-X` option prints each packet’s data in both hexadecimal and ASCII, helping you see the full packet content. The `-nn` option prevents conversion of IPs/ports.

---

### 4. Filter for a Specific IP and Find the Final Packet's Time

**Question:** Using tcpdump, read the packets from `tcpdump.pcap` and filter packets to include IP address `88.221.88.59` only. What is the time shown on the final packet (HH:MM:SS)?  
**Command:**

```bash
tcpdump -nn -r tcpdump.pcap 'host 88.221.88.59'
```

**Explanation:**  
This command reads the PCAP file and only displays packets where `88.221.88.59` is either the source or destination. Scroll to the final displayed packet and note the timestamp (formatted as HH:MM:SS) shown at the beginning of the line.

---

### 5. Filter by IP and Port, Write to File, and Compute MD5sum

**Question:** Using tcpdump, read the packets from `tcpdump.pcap` and filter packets to include IP address `184.107.41.72` and port `80` only. Write these packets to a new file and compute its MD5sum. What is the MD5sum shown?  
**Commands:**

```bash
tcpdump -nn -r tcpdump.pcap 'host 184.107.41.72 and port 80' -w filtered.pcap
md5sum filtered.pcap
```

**Explanation:**

- The first command applies a BPF filter that captures only packets with IP `184.107.41.72` and port `80`, then writes the filtered packets to `filtered.pcap`.
- The second command calculates and displays the MD5 checksum of that file. Note down the MD5sum as your answer.

---

This guide should help you efficiently use tcpdump to answer each lab question and perform Incident Response analysis on your PCAP files. Happy analyzing!