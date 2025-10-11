## 1. Classical Ciphers & Attacks

### 1.1 Attack Scenarios

1. **Ciphertext-Only Attack (COA)**
    
    - The attacker only has **ciphertext**.
    - Goal: deduce the plaintext and/or the key.
    - Example: If Eve intercepts “GGRVIORRG” but has _no_ known plaintext, that’s ciphertext-only.
2. **Known-Plaintext Attack (KPA)**
    
    - The attacker has **some pairs of plaintext and corresponding ciphertext**.
    - Goal: use these known pairs to figure out the key and decrypt additional messages.
    - Example: If Eve knows “HELLO” → “KHOOR” in Caesar +3, she can deduce the shift is 3 for future messages.
3. **Chosen-Plaintext Attack (CPA)**
    
    - The attacker can **choose plaintext(s)** and obtain the corresponding ciphertext(s).
    - Goal: derive the key from how the algorithm encrypts known or custom-chosen data.
    - Example: Submitting a special plaintext block to an encryption oracle and analyzing the resulting ciphertext.

![[z/z ScreenShots/Screenshot 2025-03-21 at 4.42.17 PM.jpg| 400]]
---

## 2. Block Ciphers & Modes of Operation

### 2.1 Why We Need Modes of Operation

- **Block ciphers** (e.g., AES) encrypt data in fixed-size blocks (e.g., 128 bits). If you encrypt each identical block with the same key in a naïve fashion (Electronic Codebook / ECB mode), repeated plaintext blocks yield identical ciphertext blocks.
- **Modes (CBC, CTR, etc.)** introduce randomness or feedback to ensure the same plaintext block does **not** always produce the same ciphertext block.
- **Initialization Vector (IV)**: Often a **non-secret** random value combined with the first block to provide uniqueness for each message.

### 2.2 Example: CBC Mode (Cipher Block Chaining)

- **Encryption:** $C_i = E_K\bigl(P_i \oplus C_{i-1}\bigr), \quad C_0 = \text{IV}$
- **Decryption:** $P_i = D_K(C_i) \oplus C_{i-1}$
- **Benefit:** If two plaintext blocks are the same, their resulting ciphertext blocks will differ because each block depends on the _previous_ ciphertext block.

---

## 3. Classical Encryption Examples

### 3.1 Caesar Cipher (Shift Cipher)

- **Encryption (key = +3)**: Shift each letter by 3 to the right.  
- **Decryption (key = +3)**: Shift each letter by 3 to the left.

If your ciphertext is `"GGRVIORRG"`, applying a -3 shift yields `"DDOSFLOOD"`.

### 3.2 Monoalphabetic Substitution

- Each letter of the alphabet is mapped to a different letter (e.g., a custom permutation).
- Example mapping:
    
    ```
    Plain:   abcdefghijklmnopqrstuvwxyz
    Cipher:  mnbvcxzasfdghjklpoiuytrewq
    ```
    
- If ciphertext is `"MUUMBDCO"`, decrypt each letter by reversing that mapping (e.g., `M -> a, U -> t, etc.`).

### 3.3 Vigenère Cipher

- **Key-based repeated shift**: Each letter of the key indicates a shift for the corresponding letter of the plaintext.
- **Encryption formula (A=0, B=1, ...):** $C_i = (P_i + K_{i \bmod \lvert K \rvert}) \mod 26$
- **Decryption formula:** $P_i = (C_i - K_{i \bmod \lvert K \rvert}) \mod 26$
- **Example:**
    - Key: `NETSEC`
    - Encrypt `"PHISH"` → `"CLBKL"`
    - Decrypt `"GLKWEV"` → `"THREAT"`

---

## 4. Modular Arithmetic (for Cryptography)

### 4.1 Modular Exponentiation

- **Compute** xymod  mx^y \mod m efficiently:
    1. Break down the exponent `y` into powers of 2.
    2. Repeatedly square and reduce modulo `m`.
- **Example**: 4711mod  1347^{11} \mod 13.
    - You can do step-by-step exponent squaring or use a tool like Python/WolframAlpha.
    - The result is 55, for instance.

---

## 5. Block Cipher Table Lookup Example (No CBC)

A small example mapping each **3-bit** input block to a **3-bit** output block. Suppose the table says:

```
Input | Output
 000  | 110
 001  | 111
 010  | 101
 011  | 100
 100  | 011
 101  | 000
 110  | 001
 111  | 010
```

- If your plaintext is `111100011100` (groups of 3 bits: `111`, `100`, `011`, `100`), you transform each group via the table, leading to your final ciphertext.

---

## 6. CBC PCBC CFB

- **Given** the same table from above and **IV = 110** for the first block:
    1. XOR the first plaintext block with `110`, then look up the result in the table.
    2. Use the **previous ciphertext block** as the XOR input for the next block, etc.
- This ensures identical plaintext blocks yield different ciphertext because each block depends on the last.
![[z/z ScreenShots/Screenshot 2025-03-21 at 4.48.40 PM.jpg| 700]]

**CT1 = encrypt(IV XOR PT1)**
**CT2 = encrypt(PT2 XOR CT1)**
**CT3 = encrypt(PT3 XOR CT2)**

ERROR CHECKING:
decrypt it.
![[z/z ScreenShots/Screenshot 2025-03-21 at 8.31.27 PM.jpg]]

### PCBC

![[z/z ScreenShots/Screenshot 2025-03-21 at 8.33.03 PM.jpg| 900]]

### CFB
![[z/z ScreenShots/Screenshot 2025-03-21 at 8.33.46 PM.jpg| 90]]

### OFB


![[z/z ScreenShots/Screenshot 2025-03-21 at 8.34.42 PM.jpg| 900]]

---

## 7. RSA Key Generation & Encryption

![[z/z ScreenShots/Screenshot 2025-03-21 at 4.54.44 PM.jpg| 500]]

![[z/z ScreenShots/Screenshot 2025-03-21 at 4.57.02 PM.jpg| 600]]
![[z/z ScreenShots/Screenshot 2025-03-21 at 5.00.17 PM.jpg| 500]]


![[z/z ScreenShots/Screenshot 2025-03-21 at 5.05.17 PM.jpg| 500]]
![[z/z ScreenShots/Screenshot 2025-03-21 at 5.06.47 PM.jpg| 500]]

![[z/z ScreenShots/Screenshot 2025-03-21 at 5.07.24 PM.jpg| 500]]
![[z/z ScreenShots/Screenshot 2025-03-21 at 5.10.06 PM.jpg| 500]]
![[z/z ScreenShots/Screenshot 2025-03-21 at 5.13.34 PM.jpg| 500]]

DECRYPTION:
![[z/z ScreenShots/Screenshot 2025-03-21 at 8.23.11 PM.jpg]]
## 8. Diffie-Hellman Key Exchange

![[z/z ScreenShots/Screenshot 2025-03-21 at 8.08.23 PM.jpg]]

![[z/z ScreenShots/Screenshot 2025-03-21 at 8.13.06 PM.jpg]]

![[z/z ScreenShots/Screenshot 2025-03-21 at 6.03.27 PM.jpg]]

---

# Practice Questions Summaries

1. **Attack Types**
    
    - Identify if an example scenario is ciphertext-only, known-plaintext, or chosen-plaintext.
2. **Modes of Operation**
    
    - Why do we need them? (avoid identical blocks for repeated plaintext blocks, ensure randomness).
    - IV usage.
3. **Classical Ciphers**
    
    - Given a Caesar cipher text and key, decrypt.
    - Monoalphabetic or polyalphabetic (Vigenère) encryption/decryption.
4. **Modular Arithmetic**
    
    - Compute xymod  nx^y \mod n.
5. **Simple Block Cipher Table**
    
    - Manually encrypt or decrypt a small bitstring using a mapping table.
    - Understand how CBC changes the process.
6. **RSA Computations**
    
    - Find n,φ,e,dn, \varphi, e, d.
    - Encrypt/decrypt small integers.
7. **Diffie-Hellman**
    
    - Compute a shared secret from provided parameters (g,n,a,b)(g, n, a, b).

![[z/z ScreenShots/Screenshot 2025-03-21 at 4.33.59 PM.jpg]]