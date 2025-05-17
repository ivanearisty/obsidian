**Key for Quick Finding:**

*   **Bold Keywords:** For scanning.
*   **`Code/Command Font`:** For specific commands or technical terms.
*   ***Italicized Sample Q Notes:*** Link concepts directly to potential exam questions.
*   **Emoji Markers (Conceptual):**
    *   🛡️ Core Security Concepts
    *   🧰 Message Integrity Tools
    *   🔑 PKI & Certificates
    *   🤝 TLS Handshake & Ciphers
    *   🧱 Firewalls & IPTables
    *   💻 Layer 2 Security
    *   📶 Wireless Security
    *   ❓ Sample Question Types
    *   🔬 Wireshark Analysis
    *   🖼️ Lecture Slide/Image Reference

---

**MASTER EXAM CHEAT SHEET: Network Security**

---

🛡️ **I. CORE CONCEPTS (Quick Definitions)**

*   **Message Integrity:** Data unaltered?
*   **Authentication:** Who are you? (Origin verification)
*   **Non-repudiation:** Can't deny sending.
*   **Confidentiality:** Secret? (Encryption)
*   **Nonce:** Number-Used-Once (prevents replay). Ensures "liveness."
    *   *Example: Alice -> Bank: Hello; Bank -> Alice: Nonce R; Alice -> Bank: "transfer..." + R + Encrypt(Hash("transfer..."+R), AlicePrivKey).* *(Based on Sample Finals MI Q1c)*
*   **PFS (Perfect Forward Secrecy):** If server's long-term private key is compromised, *past* session keys (and thus traffic) are safe.
    *   **Achieved by:** **Ephemeral** key exchange (DHE, ECDHE). Cipher suites `TLS_DHE_...`, `TLS_ECDHE_...`
    *   **NOT by:** Static RSA key exchange (`TLS_RSA_...`) or static DH (`TLS_DH_...`).
    *   *Sample Q: Diff TLS\_DHE\_RSA vs TLS\_DH\_RSA? 'E' = Ephemeral = PFS. (Sample Finals SSL/TLS Q1c)*
    *   *Sample Q: Amazon uses TLS\_RSA, key stolen, prior safe? NO (no PFS). (Sample Finals PKI/TLS Q1a)*
    *   *Server hacked TOMORROW: DHE past sessions SAFE. RSA past sessions NOT SAFE.*
    *   *Server hacked YESTERDAY: Attacker can MITM/impersonate TODAY for both DHE & RSA if they also control DNS/network.*

---

🧰 **II. MESSAGE INTEGRITY MECHANISMS**

1.  **Hashing (e.g., SHA-256)**
    *   Message -> Fixed-size Digest. **One-way, Collision-resistant.**
    *   **MD5/SHA-1: BROKEN!** Use SHA-2 (SHA-256+).

2.  **HMAC (e.g., HMAC-SHA256)**
    *   **Requires:** SHARED secret key.
    *   **Provides:** Integrity + Authentication. **NO Confidentiality.**
    *   **Faster** than Digital Signatures.

3.  **Digital Signatures (e.g., RSA, ECDSA)**
    *   **Asymmetric** (Private Key to sign, Public Key to verify).
    *   **Provides:** Integrity, Authentication, **Non-repudiation**.
    *   **Process:** `Digest = Hash(Message)` -> `Signature = Encrypt(Digest, Sender's PRIVATE Key)`.
    *   **Verification:** `Digest1 = Decrypt(Signature, Sender's PUBLIC Key)`; `Digest2 = Hash(ReceivedMessage)`. If `Digest1 == Digest2` -> VALID.
    *   *Sample Q: How Alice generates sig? Hashes msg, encrypts hash with her private key. (Sample Finals MI Q1a)*

---

🔑 **III. PKI (Public Key Infrastructure)**

*   **Purpose:** Manage public keys & bind to identities.
*   **CA (Certificate Authority):** Issues & signs X.509 certificates.
    *   **Root CA:** Self-signed, implicitly trusted (in OS/browser).
    *   **Intermediate CA:** Forms chain of trust.
*   **CRL/OCSP:** Revocation checking.
    *   *Sample Q: What is a CRL? List of revoked certs before expiry. (HW3 Q6.6)*

*   **X.509 CERTIFICATE (Key Fields)**
    *   **Subject:** Owner (e.g., `CN=www.site.com`).
    *   **Issuer:** Who signed *this* cert (CA's name).
        *   *Sample Q: Issuer CN of server cert matches Subject CN of its issuing Intermediate CA cert. (HW3 Q6.7)*
    *   **Validity Period:** Not Before / Not After.
    *   **Subject Public Key Info:** The actual public key.
    *   **SAN (Subject Alternative Name):** **PRIMARY for website ID!** Multiple hostnames. *(HW3 Q6.3)*
    *   **Basic Constraints:** `cA:TRUE` (is a CA) or `cA:FALSE` (end-entity). *(HW3 Q6.4)*
    *   **CRL Distribution Points:** URL for CRL. *(HW3 Q6.5)*
    *   **CA Digital Signature:** CA signs cert with *its own private key*.

*   **CERTIFICATE VALIDATION (Browser for HTTPS):**
    1.  **Chain of Trust:** To trusted Root CA.
    2.  **Signatures:** Verify each cert with issuer's public key.
    3.  **Validity Dates**.
    4.  **Revocation Status** (CRL/OCSP).
    5.  **Name Match:** Hostname vs. SAN.
    6.  **Basic Constraints:** Intermediates `cA:TRUE`.

*   **CERTIFICATE TYPES (Web Server):** DV (weakest), OV, EV (strictest vetting, no stronger crypto).
*   *Sample Q: Can CA issue multiple certs for amazon.com? YES. (Sample Finals PKI/TLS Q1c)*
*   *Sample Q: Root CA compromised (Heartbleed). User action? Remove Root from trust. (Sample Finals PKI/TLS Q1d)*

---

🤝 **IV. SSL/TLS (Transport Layer Security)**

*   **Versions:** TLS 1.2 (common), **TLS 1.3 (best)**. SSLv2/3 BROKEN.
*   **Purpose:** Secure TCP. Confidentiality (AES), Integrity (HMAC/AEAD), Authentication (Certs).

*   **HANDSHAKE (TLS 1.2 Focus for Exercises 1A/1B)**
    *   🖼️ **Reference:** Lecture Slides Exercise #1A, #1B images.
    *   **Common Steps:**
        1.  `ClientHello`: Client offers TLS versions, ciphers, ClientRandom.
        2.  `ServerHello`: Server chooses TLS version, cipher, ServerRandom.
        3.  `Certificate`: Server sends its X.509 cert (contains **Server's RSA Public Key (n,e)**).
        4.  `ServerKeyExchange`:
            *   **DHE/ECDHE (`TLS_DHE_RSA...`):** **USED.** Server sends DHE public params (A,g,n), *signed by Server's RSA Private Key*.
            *   **RSA Key Exch. (`TLS_RSA_...`):** **NOT USED / Empty.**
        5.  `ServerHelloDone`.
        6.  `ClientKeyExchange`:
            *   **DHE/ECDHE:** Client sends its DHE public param (B). **PMS (Key K) is DERIVED by both, NOT SENT.**
            *   **RSA Key Exch.:** Client generates PMS (Key K), **encrypts Key K with Server's RSA Public Key**, sends it.
        7.  `ChangeCipherSpec` (Client).
        8.  `Finished` (Client): **ENCRYPTED.** Hash of all *prior handshake messages (1-6)*. First msg with new keys.
        9.  `ChangeCipherSpec` (Server).
        10. `Finished` (Server): **ENCRYPTED.** Hash of all *prior handshake messages (1-6, and 8)*.
    *   *Master Secret Derivation: `PMS + ClientRandom + ServerRandom => Master Secret => AES keys + HMAC keys`.*
    *   *Sample Q: What if Finished doesn't checksum? MITM can alter handshake (version/cipher rollback). (Sample Finals SSL/TLS Q1a)*
    *   *Sample Q: Messages hashed in Finished? All PREVIOUS handshake msgs. (Sample Finals SSL/TLS Q2a, HW3 Q6.8)*
    *   *Sample Q: First encrypted message? Finished message. (Sample Finals SSL/TLS Q2b)*

*   **CIPHER SUITES (e.g., `TLS_DHE_RSA_WITH_AES_128_CBC_SHA256`)**
    *   `DHE`: **Key Exchange** (provides PFS).
    *   `RSA`: **Authentication** (server cert type; for DHE, server signs DHE params with its RSA private key).
    *   `AES_128_CBC`: **Bulk Encryption** (symmetric).
    *   `SHA256`: **MAC/Hash/PRF**.
    *   *Sample Q: Describe components. (Sample Finals SSL/TLS Q1b)*
    *   *Sample Q: Why not use `TLS_ECDH_ECDSA...SHA` (non-ephemeral)? No PFS. SHA1 broken. (Sample Finals SSL/TLS Q2d)*
    *   *Sample Q: Why not use `TLS_RSA_WITH_RC4_128_SHA`? No PFS, RC4 broken. (Sample Finals SSL/TLS Q3 2b.1)*

*   **TLS 1.3 Highlights (from Lecture Transcript):**
    *   **Faster (1-RTT):** Client sends key shares in first ClientHello.
    *   **PFS Mandatory.**
    *   **Implemented as Extension:** Main header might say TLS 1.2; check "supported_versions" extension.
    *   **Client sends key shares for ALL supported ciphers upfront.**
    *   Secure defaults.

*   **RECORD LAYER (TLS < 1.3):** Fragment -> (NO Compress) -> Add MAC -> Encrypt (Data+MAC) -> Add Header.
    *   *Sample Q: Describe SSL Record Layer Ops (1-6). (Sample Finals SSL/TLS Q3 2a)*
    *   *Sample Q: How TLS ensures diff ciphertext for same plaintext (CBC)? Unique IV per record. (Sample Finals PKI/TLS Q3 1b)*

*   **VULNERABILITIES:**
    *   Weak Crypto (MD5, SHA1, RC4, DES).
    *   No PFS (see above).
    *   Heartbleed (leaked server private keys).
    *   SSLStrip (downgrade to HTTP - largely mitigated by HSTS).
    *   TCP RST before `close_notify` -> unclean shutdown, possible attack. *(Sample Q: TLS know if TCP RST attack? Yes, expects close\_notify. (Sample Finals SSL/TLS Q2e))*

---

🧱 **V. FIREWALLS (IPTABLES - Based on Lecture & Sample Finals)**

*   **Definition:** Enforces security between networks of different policies.
*   **Types:** Stateless (fast, packet-by-packet), Stateful (tracks connections), Proxy (app-level).
*   **DMZ:** Perimeter net for public services.
*   **Proxy & HTTPS Inspection (Corporate MITM):** Company installs its Root CA on work laptops. Proxy generates fake certs for sites, signed by this trusted Root CA, allowing decryption/inspection. *(From lecture transcript)*.

*   **IPTABLES (`filter` table)**
    *   **Chains:**
        *   `INPUT`: To firewall host.
        *   `OUTPUT`: From firewall host.
        *   `FORWARD`: Through firewall (routing).
    *   **Default Policy:** `iptables -P <CHAIN> DROP` **MUST SET!** *(Sample Finals IPTables Qs)*
    *   **Rule Order:** Top-to-bottom. First match wins (unless `-j LOG`).
    *   **Key Options:** `-A` (append), `-s` (src), `-d` (dst), `-i` (in-iface), `-o` (out-iface), `-p tcp/udp/icmp`, `--dport`, `--sport`, `-j ACCEPT/DROP/REJECT`.
    *   **Stateful:** `-m conntrack --ctstate NEW,ESTABLISHED,RELATED`.
        *   `NEW`: For connection initiator.
        *   `ESTABLISHED,RELATED`: For return traffic. *Often a general ESTABLISHED,RELATED ACCEPT rule is placed near the top of chains for efficiency.*

*   **IPTABLES RULE EXAMPLES (Refer to Section VI in previous detailed response for table)**
    *   *Key scenarios from Sample Finals IPTables Q1-Q5:*
        *   Allowing/blocking specific IPs/networks to specific ports.
        *   Allowing internal to external, but not reverse (using `NEW` and `ESTABLISHED`).
        *   Routing through HTTP Proxy (multi-step FORWARD rules on firewall, INPUT/OUTPUT on proxy).
        *   DHCP rules (UDP, specific ports, often stateless for simplicity in examples).
        *   Logging rules (`-j LOG --log-prefix "..."` followed by `DROP/ACCEPT`).
        *   Rate limiting (`-m limit --limit <rate> --limit-burst <num>`).

---

💻 **VI. LAYER 2 SECURITY (Based on Lecture 13 Transcript & Sample Finals)**

*   **CAM Table Overflow:** Flood switch with fake src MACs -> switch acts like hub.
    *   **Counter:** Port Security (limits MACs/port). *Drawback: Admin overhead.*

*   **VLAN Hopping:**
    *   **Switch Spoofing:** Attacker emulates switch, negotiates trunk. *Counter: Disable DTP.*
    *   **Double Tagging:** Attacker on Native VLAN, 2 tags (Outer=Native, Inner=Victim). *Counter: Don't use native VLAN for users.*

*   **DHCP Attacks (NO security in protocol)**
    *   **Rogue DHCP Server:** Attacker offers malicious IP config (Gateway, DNS, Proxy -> MITM). *Client takes FIRST offer.*
        *   🖼️ **Exercise #3 (DHCP Config):** Incorrect DNS -> Phishing/Censorship. Incorrect Gateway -> MITM. Incorrect Proxy -> MITM.
    *   **DHCP Starvation:** Attacker requests all IPs using *spoofed CHADDRs* (MAC in DHCP payload).
    *   **Counters:**
        *   **DHCP Snooping:**
            1.  Trusted (to DHCP server) / Untrusted (to clients) ports.
            2.  Binding Table: `MAC|IP|Lease|VLAN|Iface`.
            3.  (Adv) Checks Ethernet MAC vs. CHADDR.
        *   Port Security (partial for starvation).

*   **ARP Attacks (NO security)**
    *   **ARP Spoofing:** Attacker sends fake ARP Replies -> MITM.
    *   **Counter: Dynamic ARP Inspection (DAI)** (Uses DHCP Snooping Binding Table).

*   **IP/MAC Spoofing Counter: IP Source Guard (IPSG)** (Uses DHCP Snooping Binding Table).

*   **STP Attacks:** Attacker becomes Root Bridge (sends superior BPDUs) -> MITM.
    *   **Counters:** BPDU Guard (access ports), Root Guard.

*   **802.1X (Port NAC):** Authenticate device *before* L2 access (Supplicant, Authenticator, RADIUS Server).

---

📶 **VII. WIRELESS SECURITY (WPA2/3 - Based on Lecture 13 Transcript & Sample Finals)**

*   **802.11 Frame:** 3 MACs (Dst, Src, Router/BSSID).
*   **WEP: BROKEN.**
*   **WPA2-PSK (Personal):** Single password. *Vulnerable to offline brute-force of captured 4-way handshake.*
*   **WPA3-PSK:** Protects against offline brute-force (uses SAE). Stronger.
*   **Protected Management Frames (802.11w):** In WPA3. Prevents deauth/disassoc spoofing.
*   **MAC Address Randomization:** Privacy feature. *Enterprises might disable.*
*   *Sample Q: Sniffing WPA2 traffic, what can Trudy see? MAC addresses (src, dst, router). (Sample Finals Wireless Q6a)*

---

🔬 **VIII. WIRESHARK TLS ANALYSIS (Based on Midterm Guide Figure 1 & 2)**

*   **Frame 12 (ClientHello):**
    *   Client offers: TLS Version (main field `TLS 1.0 (0x0301)`), Cipher Suites (list).
*   **Frame 16 (ServerHello, Certificate, ServerKeyExchange):**
    *   Server chooses: TLS Version (`TLS 1.0 (0x0301)`), Cipher Suite (`TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA (0xc014)`).
    *   Certificate: Server's cert (`CN=roaming.officeapps.live.com`), Intermediate CA (`CN=Microsoft IT SSL SHA2`).
    *   ServerKeyExchange: **PRESENT** because ECDHE was chosen (ephemeral key exchange).
*   *Answering Midterm Q3 Style Questions:*
    *   **TLS Version Offered/Chosen:** Check `Version` field in ClientHello/ServerHello. (Also `supported_versions` extension for TLS 1.3).
    *   **PFS Property:** Look at chosen cipher suite. `ECDHE` or `DHE` => YES. `RSA` key exch => NO.
    *   **Encryption Method:** Look at bulk cipher in chosen suite (e.g., `AES_256_CBC`).
    *   **Full Handshake vs. Resumption:** Full handshake includes `Certificate` and `KeyExchange` messages.
    *   **Server Cert Subject CN:** Find in `Certificate` message details.
    *   **Why Disable a Cipher Suite:** No PFS, uses broken crypto (RC4, MD5, SHA1).
    *   **Finished Message Not Shown:** Capture ends before those frames, or they are encrypted.

---