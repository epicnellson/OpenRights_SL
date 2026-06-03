# OpenRights SL

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Sierra%20Leone-blue)
![Course](https://img.shields.io/badge/Course-DLAW207-orange)
![DPG Compliant](https://img.shields.io/badge/DPG-Compliant-brightgreen)
![Accessibility](https://img.shields.io/badge/WCAG%202.1-AA-green)

OpenRights SL is a comprehensive legal-tech compliance platform designed specifically for Sierra Leonean digital creators. It helps you understand Intellectual Property Rights (IPR), choose the right open source license, detect conflicts, analyze contracts, and track ecosystem impact.

## Features

- **License Recommender** — Answer 4 simple questions about your work to get personalized open-source license recommendations (MIT, Apache-2.0, GPL-v3, CC-BY-4.0, CC-BY-NC-4.0).
- **AI Document Generator** — Generate professional LICENSE files, Privacy Policies, and signed PDF Creation Record certificates with QR codes. Includes AI-powered Custom Clauses via Groq API.
- **Drag & Drop Compatibility Mixer** — Visually drag licenses onto your project's base license to instantly see compatibility status.
- **GitHub License Scanner** — Enter any GitHub repository URL to detect its license using the GitHub API with offline fallback.
- **AI Contract Analyzer** — Paste Terms of Service, EULA, or NDA for AI risk analysis against the Sierra Leone Cyber Security and Crime Act 2021.
- **Creator Registry** — Public directory of Sierra Leonean creators and open-source projects (optionally synced via JSONBin.io).
- **Impact Dashboard** — Real-time statistics on license adoption and platform activity.
- **Batch Generator** — Generate multiple licenses at once for multi-component projects.
- **Voice-Enabled AI Chatbot** — Krio-language legal assistant with voice input, text-to-speech, and Groq-powered AI responses.
- **License Comparison Table** — Side-by-side comparison of all 5 supported licenses with feature indicators.
- **Sierra Leone Legal Context** — Dedicated page explaining the Cyber Security and Crime Act 2021 and how open source licensing works under Sierra Leone law.
- **Legal Glossary** — Plain-English explanations of key open source terms (copyleft, attribution, derivative works, etc.).
- **Creation History** — View and re-download past PDF certificates and license documents.
- **Presentation Mode** — 8-slide demo walkthrough with interactive checklist for examiners.
- **PWA Ready** — Installable as a Progressive Web App with offline support via Service Worker.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Tailwind CSS (via CDN) with custom Glassmorphism UI
- **AI Integration:** Groq API (`llama-3.1-8b-instant`) for Chatbot, Clause Generator, and Contract Analyzer
- **Backend/Data:** LocalStorage for state management, JSONBin.io for Creator Registry, GitHub API for License Scanner
- **PDF Generation:** jsPDF
- **Offline Capabilities:** Service Workers (PWA)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/openrights-sl.git
   cd openrights-sl
   ```

2. **Run locally:**
   No build step is required. Simply serve the directory using any local web server.
   ```bash
   npx live-server
   ```
   Or use the "Live Server" extension in VS Code.

3. **API Keys:**
   - **Groq API Key:** Required for all AI features (Chat, Clauses, Analyzer). The app will prompt you to enter this in the Chat Assistant interface. It is saved locally in your browser.
   - **JSONBin.io (Optional):** Required to sync the Creator Registry globally. You can set your Bin ID and API Key in the Registry configuration modal.

## Project Structure

```text
openrights-sl/
├── index.html            # Landing page & Hero
├── recommender.html      # Interactive License Recommender wizard
├── generator.html        # Document Generator with AI Custom Clauses
├── comparison.html       # License Compatibility Mixer & comparison table
├── scanner.html          # GitHub Repository License Scanner
├── analyzer.html         # AI Contract Analyzer (SL Cyber Act)
├── registry.html         # Creator Registry (JSONBin.io)
├── dashboard.html        # Impact Dashboard & statistics
├── batch.html            # Batch License Generator for multi-component projects
├── chatbot.html          # Voice-enabled AI Legal Assistant (EN/Krio)
├── profile.html          # Local Creator Profile form
├── about.html            # About project, SDG alignment & academic context
├── presentation.html     # 8-slide academic demo presentation
├── salone-law.html       # Sierra Leone legal framework explainer
├── glossary.html         # Open source licensing glossary
├── history.html          # Creation record history & re-download
├── privacy.html          # Privacy policy page
├── 404.html              # Custom 404 error page
├── offline.html          # Offline fallback page (PWA)
├── manifest.json         # PWA Manifest
├── sw.js                 # PWA Service Worker (cache v1.0.2)
├── CONTRIBUTING.md       # Contribution guidelines (DPG Indicator 5)
├── CODE_OF_CONDUCT.md    # Code of conduct (DPG Indicator 9)
├── css/style.css         # Global styles, glassmorphism, animations
├── js/                   # JavaScript modules
│   ├── utils.js          # Shared utilities (sanitize, toast, navbar, scroll-reveal)
│   ├── i18n.js           # Internationalization (EN/Krio)
│   ├── lang.js           # Translation strings (EN/Krio)
│   ├── recommender.js    # License recommendation engine
│   ├── generator.js      # Document generation with PDF/QR
│   ├── chat.js           # Groq API chatbot
│   ├── scanner.js        # GitHub license scanner
│   ├── analyzer.js       # AI contract analysis
│   ├── registry.js       # Creator registry
│   ├── dashboard.js      # Impact dashboard
│   └── batch.js          # Batch generator
├── data/
│   ├── licenses.json          # License definitions & recommender questions
│   └── sl-legal-knowledge.json # SL legal framework knowledge base
├── docs/                 # Academic documentation
│   ├── dpg-compliance.md      # DPG Standard compliance (9 indicators)
│   ├── privacy-impact-assessment.md # Privacy impact assessment
│   ├── accessibility-audit.md # WCAG 2.1 AA audit
│   └── sdg-impact-evidence.md # SDG impact evidence
├── .gitignore            # Git ignore rules
├── .nojekyll             # GitHub Pages config (no Jekyll processing)
└── README.md
```

## Documentation

| Document | Description |
|---|---|
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute to OpenRights SL |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community behaviour guidelines |
| [docs/dpg-compliance.md](docs/dpg-compliance.md) | Digital Public Goods Standard — all 9 indicators |
| [docs/privacy-impact-assessment.md](docs/privacy-impact-assessment.md) | Full privacy impact assessment (PIA) |
| [docs/accessibility-audit.md](docs/accessibility-audit.md) | WCAG 2.1 AA accessibility audit report |
| [docs/sdg-impact-evidence.md](docs/sdg-impact-evidence.md) | SDG 9 & 16 impact evidence and real-world scenarios |

## Academic Context & SDG Alignment

- **Course:** DLAW207 — IT Law and IPR
- **Institution:** Limkokwing University of Creative Technology (LUCT), Sierra Leone
- **Semester:** Semester 06 | March – July 2026
- **Examiner:** Ing. Sheku Dinneh Kamara

**SDG 9 (Industry, Innovation & Infrastructure):** Accelerates local tech innovation by making open-source licensing accessible to every Sierra Leonean developer.
**SDG 16 (Peace, Justice & Strong Institutions):** Democratizes access to legal frameworks previously only available to those who could afford lawyers.

## License

This project is licensed under the [MIT License](LICENSE).

---
*Built as a Digital Public Good for Sierra Leone 🇸🇱*