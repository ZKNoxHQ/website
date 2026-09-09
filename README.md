# ZKNOX Website

Official website for ZKNOX — Hardware Security & Cryptography.

## Quick Start

Clone the main website repository, then clone the tool repositories:

```bash
# Clone the main website
git clone https://github.com/ZKNoxHQ/website.git
cd website

# Clone ZKNOX Blue (Official App Installer)
git clone https://github.com/ZKNoxHQ/ZKNOXblue.git zknox-blue

# Clone ZKNOX Orange (Sideloader)
git clone https://github.com/ZKNoxHQ/ZKNOXorange.git zknox-orange


# Clone ZKNOX 7702 Unchained (7702 Delegation)
git clone https://github.com/ZKNoxHQ/7702_Unchained
cd 7702_Unchained; rm -rf ledger/
```

After cloning, the complete site structure will be ready to serve.

Every tool's **page** lives here at the site root (`official-apps.html`,
`sideloader.html`, `unchained.html`) so it shares `styles.css` and `nav.js`; the
cloned repos supply only what each page loads — JS bundles, app binaries, images.
Serve over HTTP (`npx serve .`), not `file://`, or the root-relative `/nav.js`
and the ES-module imports will fail.

## Directory Structure

```
website/
│
├── index.html              # Homepage
├── styles.css              # Global stylesheet
├── nav.js                  # Shared navigation (all pages)
├── official-apps.html      # ZKNOX Blue - Official App Installer UI
├── sideloader.html         # ZKNOX Orange - Sideloader UI
├── unchained.html          # 7702 Unchained - EIP-7702 delegation UI
├── README.md               # This file
│
├── zknox-blue/             # ZKNOX Blue - engine
│   ├── dist/               # Bundled JavaScript
│   ├── src/                # Source modules
│   └── README.md
│
├── zknox-orange/           # ZKNOX Orange - engine & app catalog
│   ├── apps/               # Prebuilt Ledger apps (.hex, .map, Makefile)
│   ├── dist/               # Bundled JavaScript
│   ├── src/                # Source modules
│   └── README.md
│
├── Technologies/
│   ├── technologies.html   # Technologies overview
│   ├── tech-pqc.html       # Post-Quantum Cryptography
│   ├── tech-zk.html        # Zero Knowledge
│   ├── tech-ecc.html       # Elliptic Curves
│   ├── tech-mpc.html       # Multi-Party Computation
│   └── tech-hw.html        # Hardware Wallets
│
├── Products/
│   └── products.html       # Products & services
│
├── Research/
│   ├── research.html       # Research overview
│   ├── blog.html           # Blog (links to zknox.eth.limo)
│   ├── papers.html         # Academic papers & patents
│   ├── eips.html           # Ethereum Improvement Proposals
│   ├── talks.html          # Talks & presentations
│   └── hackathons.html     # Hackathon projects
│
├── Demo/
│   ├── demo-pqbip39.html   # Post-Quantum BIP39 Demo
│   └── demo-zk-hardware.html # ZK Hardware Demo
│
├── Team/
│   ├── team.html           # Team overview
│   ├── team-nicolas.html   # Nicolas Bacca profile
│   ├── team-renaud.html    # Renaud Dubois profile
│   └── team-simon.html     # Simon Masson profile
│
└── Assets/
    ├── zknox-logo.png      # Navigation logo
    ├── hero-image.png      # Homepage hero image
    ├── photo-nicolas.png   # Team photo
    ├── photo-renaud.png    # Team photo
    └── photo-simon.png     # Team photo
```

## Tools

### ZKNOX Blue
Official Ledger application installer using ZKNOX's HSM infrastructure. The page is
`official-apps.html` at the site root; the `zknox-blue/` clone supplies the JS bundle.
- Install official Ledger apps
- Firmware verification
- WebHID-based (Chrome/Edge)

### ZKNOX Orange
Development sideloader for custom Ledger applications. The page is `sideloader.html`
at the site root; the `zknox-orange/` clone supplies the JS bundle and the app catalog.
- Push Custom CA
- Load custom .hex applications
- SCP v3 protocol implementation
- For developers only

## Pages Overview

| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero, services overview, and CTAs |
| `official-apps.html` | ZKNOX Blue installer (reads `zknox-blue/`) |
| `sideloader.html` | ZKNOX Orange sideloader (reads `zknox-orange/`) |
| `unchained.html` | 7702 Unchained EIP-7702 delegation tool |
| `technologies.html` | Overview of core technology areas |
| `tech-pqc.html` | Post-Quantum Cryptography (ML-DSA, Falcon, PQbeat) |
| `tech-zk.html` | Zero Knowledge proofs and circuits |
| `tech-ecc.html` | Elliptic Curve implementations |
| `tech-mpc.html` | Multi-Party Computation |
| `tech-hw.html` | Hardware wallet development |
| `products.html` | Cryptographic libraries, smart contracts, ZK circuits |
| `research.html` | Research hub with links to all research sections |
| `blog.html` | Technical blog (external: zknox.eth.limo) |
| `papers.html` | Academic publications and patents |
| `eips.html` | EIP-8051 (ML-DSA) and EIP-8052 (Falcon) |
| `talks.html` | Conference presentations |
| `hackathons.html` | ETHGlobal projects (PQKINGS, ZKIPPER, FROSTGUN) |
| `team.html` | Team overview with 3 experts |
| `team-*.html` | Individual team member profiles |

## Tech Stack

- Pure HTML5 & CSS3
- JavaScript (ES Modules) for tools
- Fonts: Source Sans 3, IBM Plex Mono (Google Fonts)
- Responsive design (mobile-first)
- WebHID API for Ledger communication

## Design

- Light theme with violet accents (#a78bfa)
- Black navigation bar
- Consistent card-based layouts
- Grayscale → color hover effects on team photos

## External Links

- GitHub: https://github.com/ZKNoxHQ
- X/Twitter: https://x.com/zknoxHQ
- Blog: https://zknox.eth.limo
- PQbeat: https://pqbeat.xyz
- Kohaku: https://github.com/ethereum/kohaku

## License

© 2025 ZKNOX. All rights reserved.
