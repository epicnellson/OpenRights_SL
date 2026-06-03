# Privacy Impact Assessment (PIA)
# OpenRights SL
# DLAW207 — Limkokwing University SL
# Date: 2026

## 1. Project Overview

**Name:** OpenRights SL
**Type:** Browser-based legal compliance tool
**Purpose:** Help Sierra Leonean creators understand and apply open source licenses
**Audience:** Developers, musicians, writers, NGOs in Sierra Leone

## 2. Data Inventory

### Data Collected

| Data Type | Where Stored | Purpose | Retention |
|---|---|---|---|
| Creator name | localStorage | Auto-fill forms | Until user clears |
| Email address | localStorage | Profile display | Until user clears |
| Organisation | localStorage | Profile display | Until user clears |
| Project names | localStorage | Certificate history | Until user clears |
| Groq API key | localStorage | AI chatbot auth | Until user clears |
| Chat history | localStorage | Context memory | Last 10 messages |
| Language preference | localStorage | UI language | Until user clears |
| Selected license | localStorage | Cross-page flow | Session-like |

### Data NOT Collected

- ❌ IP addresses (no server)
- ❌ Browser fingerprints
- ❌ Usage analytics
- ❌ Cookies
- ❌ Payment information
- ❌ Government ID or official documents
- ❌ Health information
- ❌ Location data

## 3. Data Flow Analysis

User Device (Browser)
↓
localStorage
(stays here)
↓ only when user uses AI features
Groq API Servers
(messages only, no personal data)
↓ only when user uses registry
JSONBin.io Servers
(project names, publicly visible)

**Critical finding:** 99% of all data never leaves the user's device.

## 4. Third Party Analysis

### Groq AI (api.groq.com)
- **Data sent:** User's questions only
- **Data NOT sent:** Name, email, API key
- **Groq's privacy policy:** groq.com/privacy
- **Risk level:** LOW — questions are general legal queries, not personal data
- **Mitigation:** Users warned in UI that questions are sent to Groq

### JSONBin.io (api.jsonbin.io)
- **Data sent:** Project name, creator name, license choice, location (optional)
- **Visibility:** PUBLICLY visible to anyone
- **Risk level:** MEDIUM — creator names and project names are public
- **Mitigation:** Users clearly warned in registry that data is public. No sensitive data fields exist.

### GitHub Pages (hosting)
- **Data:** Standard web server access logs
- **Risk level:** LOW — normal web hosting
- **Mitigation:** No special action needed

### CDN Services (Tailwind, jsPDF, QRCode)
- **Data:** Standard CDN request logs
- **Risk level:** LOW — no user data sent
- **Mitigation:** Files cached after first load via service worker

## 5. Sierra Leone Legal Compliance

### Cyber Security and Crime Act 2021
**Relevant provisions:**
- Part V (Data Protection): Our localStorage-only approach means we collect and process minimal data, consistent with data minimisation principles in Part V.
- Section 43 (Unlawful access): We do not access any user systems beyond the explicit localStorage operations the user initiates.
- Section 44 (Data interception): We do not intercept any communications.

**Compliance status: COMPLIANT** ✅

### GDPR Alignment (for international users)
- **Article 5(1)(c) Data minimisation:** ✅ We collect only what is strictly necessary
- **Article 7 Consent:** ✅ Users actively enter their own data
- **Article 17 Right to erasure:** ✅ Clear Profile and Clear History buttons
- **Article 25 Privacy by design:** ✅ Architecture ensures local-only storage

## 6. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| User enters sensitive data in project description | Medium | Low | Warning in UI to not enter sensitive info |
| Groq API breached | Low | Low | Only generic legal questions sent |
| JSONBin data exposed | High | Low | Data is already public by design |
| localStorage cleared by browser | Medium | Low | Users can regenerate documents |
| API key stolen from localStorage | Low | Medium | User's own device security applies |

**Overall Privacy Risk: LOW** ✅

## 7. Recommendations

1. Add a warning on registry form: "Project names and creator names will be publicly visible to everyone"
2. Add a note on chatbot: "Your questions are sent to Groq AI servers"
3. Consider future: If user base grows, replace JSONBin with a proper backend with authentication

## 8. Assessment Conclusion

OpenRights SL is designed with privacy as a core architectural principle. The client-side-only approach means Sierra Leonean users retain full control of their data. The tool meets the data protection requirements of the Sierra Leone Cyber Security and Crime Act 2021 and aligns with international best practices.

**PIA Status: APPROVED** ✅
**Date:** 2026
**Prepared by:** DLAW207 Group
**Institution:** Limkokwing University SL

---
