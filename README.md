# ZKNOX Website

Official website for ZKNOX — Hardware Security & Cryptography.

## Quick Start

The tool engines (ZKNOX Blue, ZKNOX Orange) are git submodules, pinned to an exact commit:

```bash
git clone --recurse-submodules https://github.com/ZKNoxHQ/website.git
cd website
npx serve .
```

Already cloned without submodules: `git submodule update --init`.

To pick up a new engine release:

```bash
git submodule update --remote zknox-blue    # or zknox-orange
git commit -am 'bump zknox-blue'
```

Every tool's **page** lives here at the site root (`official-apps.html`,
`sideloader.html`, `unchained.html`) so it shares `styles.css` and `nav.js`; the
submodules supply only what each page loads — JS bundles, app binaries, images.
All behaviour lives in the engine bundles (for ZKNOX Orange: `FirmwareUpdater`,
`FirmwareUi`); a page only wires buttons to them, so the script of
`official-apps.html` is identical to the one in the ZKNOXblue repo apart from the
bundle path. Serve over HTTP (`npx serve .`), not `file://`, or the root-relative
`/nav.js` and the ES-module imports will fail.

The catalog apps offered by the sideloader (privacy, EC/ML-DSA, 7702 Unchained)
are fetched at runtime from `ZKNoxHQ/ZKNOX-HW-PRIVACY`, `ZKNoxHQ/ecml-signer`
and `ZKNoxHQ/7702_Unchained`, each at a commit pinned in `sideloader.html`.

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
├── zknox-blue/             # ZKNOX Blue - engine (submodule ZKNoxHQ/ZKNOXblue)
│   ├── dist/               # Bundled JavaScript
│   ├── src/                # Source modules
│   └── README.md
│
├── zknox-orange/           # ZKNOX Orange - engine & app catalog (submodule ZKNoxHQ/ZKNOXorange)
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
`official-apps.html` at the site root; the `zknox-blue/` submodule supplies the JS bundle.
- Install official Ledger apps
- USB or Bluetooth (Nano X / Stax / Flex)
- WebHID / Web Bluetooth (Chrome/Edge)

### ZKNOX Orange
Development sideloader for custom Ledger applications. The page is `sideloader.html`
at the site root; the `zknox-orange/` submodule supplies the JS bundle and the app catalog.
- Push Custom CA
- Load custom .hex applications
- SCP v3 protocol implementation
- Firmware check and update through Ledger's HSM, without Ledger Live; bootloader recovery
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
