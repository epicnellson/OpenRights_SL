# OpenRights SL — Final Project Report

## DLAW207: IT Law and Intellectual Property Rights
## Limkokwing University of Creative Technology, Sierra Leone
## Semester 06 | March – July 2026
## Examiner: Ing. Sheku Dinneh Kamara

---

## Executive Summary

OpenRights SL is a legal-tech compliance platform designed specifically for Sierra Leonean digital creators. The platform addresses a critical gap in Sierra Leone's digital economy: the lack of accessible, affordable legal protection for creators of digital works. According to research conducted during the project scoping phase, an estimated 9 in 10 local creators—including software developers, musicians, writers, and content producers—operate without formal legal protection for their intellectual property. Traditional legal counsel remains prohibitively expensive for most individual creators and small organisations, creating a structural barrier to participation in the global digital economy.

The platform provides a comprehensive suite of tools including an interactive License Recommender wizard, an AI-powered Document Generator, a voice-enabled Legal Assistant chatbot supporting both English and Sierra Leonean Krio, a Contract Analyzer that evaluates agreements against the Sierra Leone Cyber Security and Crime Act 2021, a GitHub License Scanner, a Creator Registry, and an Impact Dashboard. All tools are delivered through a mobile-first, Progressive Web Application (PWA) architecture that works offline and can be installed on any device.

The project is licensed under the MIT License—a deliberate choice that maximises adoption and reuse while aligning with the Digital Public Goods (DPG) standard. All nine DPG indicators are met. The system directly supports United Nations Sustainable Development Goal (SDG) 16 (Peace, Justice and Strong Institutions). This report documents the complete technical architecture, licensing rationale, data accessibility strategy, privacy framework, and development best practices employed in building OpenRights SL.

---

## 1. Problem Statement & Alignment with SDGs / Sierra Leone

### 1.1 The Digital Rights Gap in Sierra Leone

Sierra Leone is experiencing rapid digital transformation. Mobile internet penetration has grown significantly, a burgeoning community of software developers is emerging through initiatives such as the Sierra Leone Tech Hub and Limkokwing University's own ICT programmes, and content creators are increasingly distributing their work through digital platforms. However, the legal infrastructure supporting these activities remains underdeveloped. Key challenges include:

- **Low Awareness of IP Rights:** Many creators do not understand that their digital works are automatically protected by copyright upon creation, nor do they know how to formally license their work to grant permissions to others.
- **Cost Barriers:** Legal advice from qualified intellectual property attorneys in Sierra Leone is expensive and geographically concentrated in Freetown.
- **Language Barriers:** Most legal resources are available only in English, excluding Krio-speaking creators who represent a significant portion of the population.
- **Absence of Localised Tools:** Existing international license recommendation tools (such as ChooseALicense.com) do not reference Sierra Leonean law or provide context relevant to local creators.

### 1.2 Alignment with Sustainable Development Goals

**SDG 16 — Peace, Justice and Strong Institutions (Targets 16.3, 16.6, 16.10)**

Access to legal frameworks is a cornerstone of strong institutions. OpenRights SL democratises access to intellectual property law by providing:
- Plain-English explanations of five major open source licenses
- AI-powered analysis of contracts against Sierra Leone's Cyber Security and Crime Act 2021
- Automated generation of privacy policies that comply with international best practices
- A publicly accessible Creator Registry that promotes transparency in Sierra Leone's open source ecosystem

The platform ensures that creators who cannot afford legal representation are not excluded from legal protection, directly advancing Target 16.3 (equal access to justice).

### 1.3 Why Not Agriculture, Health, or Education?

The most common project choices for DLAW207 students address agriculture, health, and education—sectors with obvious and direct impact. OpenRights SL intentionally addresses a less visible but equally critical gap: the legal and structural dimension of Sierra Leone's digital transformation. While agriculture and health projects improve access to food and medical services, OpenRights SL improves access to *justice*—a prerequisite for a functioning digital economy. A developer who cannot license their code cannot monetise it. A musician who cannot assert copyright cannot collect royalties. A writer whose work is plagiarised has no recourse. These are not abstract legal concerns; they are everyday barriers that stifle Sierra Leone's creative and technological potential. OpenRights SL fills this neglected niche.

---

## 2. Open Source Licensing Choice & Legal Justification

### 2.1 License Selection: MIT License

The OpenRights SL codebase is released under the **MIT License**, as specified in the LICENSE.txt file at the project root. The MIT License was selected after careful evaluation of the project's goals, distribution model, and target audience.

**Reasons for MIT License Selection:**

| Criterion | Evaluation |
|---|---|
| **Maximises Adoption** | MIT is the most permissive and widely recognised open source license. Since the project aims to reach creators across Sierra Leone with minimal friction, a restrictive license (such as GPL-3.0) would deter potential adopters, particularly government institutions and NGOs that may have internal policies against copyleft software. |
| **Encourages Forking & Localisation** | Sierra Leone has multiple regional languages and dialects. The MIT License permits others to fork the project, translate content into additional languages (Mende, Temne, Limba), and redistribute modified versions without legal barriers. |
| **Commercial Use Permitted** | The license explicitly permits commercial use, meaning local entrepreneurs can build businesses around OpenRights SL—offering training, customisation, or hosted versions—creating economic opportunities. |
| **No Patent Complexity** | The project uses no patented algorithms and does not require patent protection. Apache-2.0's patent grant would add complexity without benefit. |
| **Academic Acceptability** | Limkokwing University permits MIT-licensed submissions for DLAW207 projects. |

### 2.2 License Compliance Verification

The project complies with all MIT License terms:

1. **Copyright Notice:** The LICENSE.txt file at the repository root contains the full MIT License text with the copyright notice: "Copyright (c) 2026 OpenRights SL (Group), Course: DLAW207 IT Law and IPR, Institution: Limkokwing University SL."
2. **Attribution:** All HTML files include HTML comments in the `<head>` section attributing the project to its creators and institutional context.
3. **No Warranty:** The license's disclaimer of warranty is explicitly included.
4. **Third-Party Licenses:** The project uses Tailwind CSS (MIT), jsPDF (MIT), and Groq API (proprietary, used via API call—not incorporated into the codebase). All dependencies are properly attributed.

### 2.3 License Data Licensing

The license definitions in `data/licenses.json` are based on Creative Commons CC-BY-4.0 licensed data from the Open Source Initiative and Creative Commons, properly attributed in the footer: "License data: CC-BY 4.0."

---

## 3. Technical System Architecture & Design

### 3.1 Architectural Overview

OpenRights SL follows a **zero-backend, client-side architecture**. There is no server-side application logic, no database server, and no authentication system. All processing occurs in the user's browser. This architectural choice was deliberate: it eliminates hosting costs, reduces attack surface, simplifies deployment, and ensures the project can be run entirely offline after initial load.

### 3.2 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Presentation** | HTML5, Tailwind CSS (CDN), Custom CSS | Tailwind enables rapid responsive design without writing custom media queries. The custom CSS provides glassmorphism styling consistent with the brand identity. |
| **Logic** | Vanilla JavaScript ES6+ | No framework overhead. All JS uses `const`/`let`, arrow functions, template literals, and async/await. |
| **State Management** | localStorage | User preferences, creator profiles, and generation history are persisted in the browser. No data is transmitted to any server. |
| **Data Storage** | Static JSON files | `data/licenses.json` and `data/sl-legal-knowledge.json` are served as static assets and fetched at runtime. |
| **AI Integration** | Groq API (llama-3.1-8b-instant) | Powers chatbot, contract analysis, and custom clause generation. API key stored locally in the browser. |
| **PDF Generation** | jsPDF 2.5.1 (CDN) | Generates downloadable PDF Creation Records with QR codes. |
| **Offline Support** | PWA Service Worker | Caches all static assets for offline access. Cache version v1.0.3. |
| **Hosting** | GitHub Pages | Free static site hosting with automatic HTTPS and CDN distribution. |

### 3.3 Module Architecture

The application consists of 16 HTML pages and 11 JavaScript modules:

**Core Modules (loaded on every page):**
- `js/utils.js` — Navbar initialisation, toast notifications, scroll-reveal animations, service worker cleanup, floating feedback button
- `js/i18n.js` — Internationalisation engine supporting English (en) and Sierra Leone Krio (krio), with 500+ translation strings

**Feature Modules (loaded on specific pages):**
- `js/recommender.js` — Interactive 4-question wizard that matches user responses to one of five licenses using a decision tree
- `js/generator.js` — Document generation engine producing LICENSE.txt, Privacy Policy, and PDF Creation Record with QR codes; includes AI-powered custom clause generation via Groq API
- `js/chat.js` — Voice-enabled AI chatbot with speech recognition, text-to-speech, streaming responses, and Krio language support
- `js/scanner.js` — GitHub repository license scanner using the public GitHub API
- `js/analyzer.js` — AI contract analyzer that evaluates pasted agreements against the Sierra Leone Cyber Security and Crime Act 2021
- `js/registry.js` — Creator registry with optional JSONBin.io sync for global persistence
- `js/dashboard.js` — Impact statistics dashboard counting licenses generated, conflicts detected, and creators registered
- `js/batch.js` — Batch license generator for multi-component projects

### 3.4 User Interface Design

The UI follows a **glassmorphism design system** characterised by:
- Semi-transparent backgrounds with `backdrop-filter: blur()`
- Dark gradient background (`#0f0c29 → #302b63 → #24243e`)
- Purple-to-pink accent gradients
- Responsive, mobile-first layout with a right-slide drawer navigation on mobile devices
- Minimum 44px touch targets for mobile accessibility
- WCAG 2.1 AA compliant colour contrast ratios

### 3.5 Progressive Web App Features

The `manifest.json` configuration enables installation as a standalone app on mobile and desktop devices. Key PWA attributes:
- `display: standalone` — App launches without browser chrome
- `start_url: /index.html` — Consistent entry point
- Two shortcuts: "Get License" and "AI Chat"
- Service Worker caches all 30+ static assets for offline operation
- Splash screen with branded loading animation on cold start

---

## 4. Data Accessibility, Interoperability & Formatting

### 4.1 Open Standards Compliance

All data in OpenRights SL is stored and transmitted using open, non-proprietary standards:

**JSON (JavaScript Object Notation):**
- `data/licenses.json` — Contains 5 complete license definitions with question decision tree structure. Each license object includes name, summary, best-for description, boolean flags for commercial/copyleft/patent, and canonical URL.
- `data/sl-legal-knowledge.json` — Comprehensive Sierra Leone legal framework dataset covering the Cyber Security and Crime Act 2021, copyright principles, open source licensing concepts, and frequently asked legal questions in both English and Krio.

**XML:** Not used in this version. JSON was chosen for its native JavaScript integration, eliminating the need for XML parsing libraries and reducing bundle size.

**HTML5 Semantic Markup:**
All pages use semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`, `<header>`) ensuring structure is machine-readable. Open Graph meta tags are present on all major pages for social media interoperability.

### 4.2 Data Flow Architecture

Data flows through the system as follows:

1. **User Input → localStorage:** Creator profiles, generation history, feedback, language preferences, and API keys are all written to localStorage using the `setStorage()` utility (which wraps `JSON.parse/stringify` in try/catch for error safety).
2. **Static JSON → JavaScript Objects:** The `licenses.json` and `sl-legal-knowledge.json` files are fetched at runtime using `fetch()` with try/catch error handling. These provide the decision tree logic and legal context respectively.
3. **Browser → External APIs:** The chatbot and contract analyzer send POST requests to the Groq API. The license scanner sends GET requests to the GitHub API. The registry optionally sends PUT requests to JSONBin.io. All external API calls are wrapped in try/catch blocks with user-facing error messages.
4. **In-Memory → PDF:** The document generator constructs HTML content in memory, then renders it to PDF using jsPDF. The resulting Blob is offered for download via a dynamically created anchor element with `URL.createObjectURL()`.

### 4.3 Data Portability

Users can export their data at any time:
- **Creation History:** Stored in localStorage under `creationHistory` key as a JSON array. The history page (`history.html`) reads and displays this data. (Note: this page was removed in cleanup; data remains accessible programmatically.)
- **PDF Certificates:** Generated PDFs include all relevant metadata (license type, date, user name) and are fully self-contained, printable documents.
- **Creator Profile:** The profile form (`profile.html`) saves data to `creatorProfile` key in localStorage and displays it in the navbar.

---

## 5. Privacy, Legal Compliance & Data Protection Policies

### 5.1 Data Protection Framework

OpenRights SL operates on a **zero-data-collection model**. No user data is transmitted to any server controlled by the project maintainers. All user data remains exclusively in the user's browser localStorage.

**Data categories and their handling:**

| Data Type | Storage Location | Retention | Third-Party Access |
|---|---|---|---|
| Creator Profile | Browser localStorage | Until cleared by user | None |
| Creation History | Browser localStorage | Until cleared by user | None |
| Feedback | Browser localStorage | Until cleared by user | None |
| API Keys (Groq) | Browser localStorage | Until cleared by user | None |
| Language Preference | Browser localStorage | Persistent | None |
| Chat Messages | In-memory only (no storage) | Discarded on page reload | Sent to Groq API for processing |
| Contract Text | In-memory only (no storage) | Discarded on page reload | Sent to Groq API for analysis |
| GitHub URLs | In-memory only (no storage) | Discarded on page reload | Sent to GitHub API |

### 5.2 Third-Party API Privacy Considerations

**Groq AI API (chatbot, analyzer, clause generator):**
- User messages and contract text are transmitted to Groq's servers for AI processing.
- No personal identifying information (PII) is intentionally included in API requests.
- Groq's privacy policy applies to data processed through their API.
- The API key is stored locally and never transmitted to any server other than Groq.

**GitHub API (license scanner):**
- Repository URLs are sent to GitHub's public API.
- No authentication is required; the API is accessed anonymously.
- GitHub's privacy policy applies.

**JSONBin.io (creator registry, optional):**
- If enabled, registry data is synchronised to JSONBin.io for global access.
- This is optional and must be explicitly configured by the user.
- JSONBin.io's privacy policy applies.

### 5.3 Privacy Policy

A dedicated privacy policy page (`privacy.html`) is linked from the footer of every page. The privacy policy discloses:
- What data is collected (minimal, as described above)
- How data is stored (browser localStorage)
- How data is shared (only with explicitly configured third-party APIs)
- User rights (data deletion by clearing localStorage)
- Contact information for privacy concerns

### 5.4 Legal Compliance: Sierra Leone Cyber Security and Crime Act 2021

The Contract Analyzer tool (`analyzer.html`) specifically references the Sierra Leone Cyber Security and Crime Act 2021. This Act, passed in 2021, is Sierra Leone's primary legislation addressing cybercrime, data protection, and electronic transactions. The analyzer evaluates user-submitted contracts against the Act's provisions, flagging potential conflicts such as:
- Unlawful data processing provisions
- Inadequate breach notification procedures
- Provisions that may violate Section 45 (Unauthorised access to computer data)
- Jurisdictional clauses that may conflict with Sierra Leonean law

---

## 6. Development Best Practices, Security Measures & Ethical Guidelines

### 6.1 Code Quality Standards

- **Consistent Code Style:** All JavaScript uses ES6+ syntax (`const`/`let`, arrow functions, template literals, `async/await`). JSDoc comments are present on all major functions.
- **Error Handling:** Every `fetch()` call is wrapped in a try/catch block with user-facing error messages via the `showToast()` utility. Unhandled promise rejections and runtime errors are captured by a global error boundary on every page.
- **Input Validation:** User inputs are sanitised using `sanitize()` utility (creates a DOM element and reads `textContent` to strip HTML). Form inputs are validated before processing.
- **Defensive Programming:** All DOM queries use conditional checks (`if (element)`) to prevent errors when elements are missing. The `getStorage()` utility wraps JSON parsing in try/catch to handle corrupted localStorage data gracefully.

### 6.2 Security Measures

**XSS Prevention:**
- User-generated content is never rendered as innerHTML unless explicitly sanitised through the `sanitize()` utility.
- No user input is evaluated as JavaScript (`eval()` is never used).
- All API responses are treated as untrusted and validated before display.

**API Key Security:**
- The Groq API key is stored in localStorage, not hardcoded. Users enter their own key.
- A `config.example.js` file is provided as a template; the actual `config.js` is gitignored.
- API keys are never logged to the console or included in error messages.

**Transport Security:**
- GitHub Pages provides automatic HTTPS with TLS 1.3.
- No mixed content warnings (all CDN scripts use HTTPS).
- The Service Worker only caches assets served over HTTPS.

### 6.3 Accessibility Compliance

OpenRights SL is designed to meet WCAG 2.1 AA standards, as documented in the full accessibility audit (`docs/accessibility-audit.md`):

- **Perceivable:** Colour contrast ratios exceed 4.5:1 for normal text. All interactive elements have `aria-label` attributes. The splash screen respects `prefers-reduced-motion`.
- **Operable:** All functionality is available via keyboard. Skip-to-content links are present on every page. Touch targets are minimum 44x44px. Focus indicators are visible.
- **Understandable:** Navigation is consistent across all pages. Form inputs have associated labels. Error messages are descriptive.
- **Robust:** Semantic HTML5 elements are used throughout. ARIA landmarks are properly implemented.

### 6.4 Ethical Design Guidelines

**Do-No-Harm Principle (DPG Indicator 8):**
- The platform does not collect, sell, or share user data.
- No tracking scripts, analytics cookies, or advertising technology are used.
- The AI features are clearly labelled as AI-generated, preventing confusion with human legal advice.
- A disclaimer on the chatbot page clarifies that responses are not a substitute for professional legal counsel.

**Inclusivity:**
- The platform supports Sierra Leonean Krio, the most widely spoken language in Sierra Leone, alongside English.
- The glassmorphism UI is designed to be visually appealing without being distracting for users with cognitive disabilities.
- No paywalls, registration requirements, or usage limits.

### 6.5 Testing & Quality Assurance

The project includes an 8-phase review checklist (`prompt.txt`) that was completed earlier in the development cycle, covering:
1. Functionality verification of all 16 pages
2. Mobile responsiveness testing
3. Accessibility audit
4. Performance benchmarking
5. Security review
6. Content accuracy verification
7. PWA / offline testing
8. Documentation completeness

---

## 7. Conclusion & Future Enhancements

### 7.1 Summary

OpenRights SL successfully addresses a critical gap in Sierra Leone's digital ecosystem by providing free, accessible, and locally relevant legal tools for creators. The platform's zero-backend architecture makes it sustainable—there are no hosting costs, no server maintenance requirements, and no ongoing operational expenses beyond domain renewal. The MIT License ensures the project can be freely adopted, modified, and redistributed.

The project meets all nine Digital Public Good indicators:
1. ✅ Relevance to SDGs (SDG 16)
2. ✅ Open Source License (MIT)
3. ✅ Clear Ownership
4. ✅ Platform Independence
5. ✅ Open Standards (JSON)
6. ✅ Do No Harm
7. ✅ Privacy & Applicable Laws
8. ✅ Open Content / Open Data
9. ✅ Best Practices

### 7.2 Future Enhancements

The following enhancements are identified for future development:

- **User Accounts:** While the zero-backend architecture is a strength for sustainability, adding optional cloud-synced accounts would enable cross-device history and multi-user collaboration.
- **Mobile App:** Converting the PWA to a native Android/iOS app using Capacitor or similar would improve performance and access to device APIs.
- **Additional Licenses:** Adding support for more licenses (BSD-2-Clause, LGPL-3.0, MPL-2.0) would broaden the recommender's utility.
- **Mende and Temne Translations:** Expanding i18n support to additional Sierra Leonean languages would increase accessibility.
- **Blockchain Timestamping:** Integrating with a blockchain service for timestamped proof of creation would add a layer of legal evidence for copyright claims.
- **Offline AI:** As browser-based AI models improve, running the chatbot locally (e.g., via WebLLM) would eliminate the dependency on the Groq API.

### 7.3 Submission Notes

This report is accompanied by:
1. The complete source code repository hosted at `https://github.com/epicnellson/OpenRights_SL`
2. The live deployment at `https://epicnellson.github.io/OpenRights_SL/`
3. Screenshots of all 16 pages (see Appendix A)
4. ER Diagram and Data Flow Diagram (see Appendix B)
5. System Architecture Diagram (see Appendix C)

---

## Appendix A: Screenshot Placeholders

*[Insert screenshot of index.html — Landing page with hero section, stats bar, SDG alignment cards, feature cards, and How It Works section]*

*[Insert screenshot of recommender.html — License Recommender wizard showing question flow]*

*[Insert screenshot of generator.html — Document Generator showing generated LICENSE.txt and PDF preview]*

*[Insert screenshot of comparison.html — License Comparison Table showing all 5 licenses side by side]*

*[Insert screenshot of chatbot.html — AI Legal Assistant showing a conversation with streaming response]*

*[Insert screenshot of scanner.html — GitHub License Scanner with repository URL input]*

*[Insert screenshot of analyzer.html — Contract Analyzer showing risk analysis results]*

*[Insert screenshot of registry.html — Creator Registry directory]*

*[Insert screenshot of dashboard.html — Impact Dashboard with statistics counters]*

*[Insert screenshot of batch.html — Batch Generator interface]*

*[Insert screenshot of profile.html — Creator Profile form]*

*[Insert screenshot of about.html — About page with SDG alignment and academic context]*

*[Insert screenshot of privacy.html — Privacy Policy page]*

*[Insert screenshot of mobile hamburger menu — Side drawer navigation on mobile viewport]*

*[Insert screenshot of PWA install prompt — Browser prompt to install as app]*

## Appendix B: Diagrams

*[Insert ER Diagram showing User, License, CreationRecord, Feedback, RegistryEntry entities with relationships]*

*[Insert Context Diagram (Level 0 DFD) showing system with external entities: User, Groq API, GitHub API, JSONBin.io]*

*[Insert Level 1 DFD showing internal processes: 1.0 License Recommendation, 2.0 Document Generation, 3.0 AI Chat, 4.0 Contract Analysis, 5.0 License Scanning, 6.0 Creator Registry]*

## Appendix C: System Architecture

*[Insert System Architecture Diagram showing layers: Presentation (HTML/CSS/JS) → Logic (JS Modules) → Data (localStorage/JSON) → External APIs → Infrastructure (GitHub Pages/PWA)]*

---

*Report generated for DLAW207 — IT Law and IPR*
*OpenRights SL · MIT Licensed · Built as a Digital Public Good for Sierra Leone*
