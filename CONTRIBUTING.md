# Contributing to OpenRights SL

Thank you for your interest in contributing to OpenRights SL! This project was built to serve Sierra Leonean creators and we welcome contributions that improve that mission.

## 🇸🇱 Our Mission

OpenRights SL exists to democratise access to intellectual property knowledge for creators in Sierra Leone. Every contribution should serve that mission.

## 📋 DPG Standard Compliance

This project is designed to meet the Digital Public Goods Standard. Contributions must maintain compliance with all 9 DPG indicators. See our [DPG Compliance Document](docs/dpg-compliance.md) for details.

## 🤝 How to Contribute

### Reporting Bugs
1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if relevant

### Suggesting Features
1. Open an issue with label "enhancement"
2. Describe the problem it solves
3. Explain how it helps SL creators
4. Explain SDG alignment if applicable

### Submitting Code
1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear message: `git commit -m "feat: description"`
6. Push and open a Pull Request

### Improving Krio Translations
The Krio translations in js/i18n.js are a community effort. Native Krio speakers are especially welcome to:
- Correct existing translations
- Add missing translations
- Improve naturalness of phrasing

Open a PR with changes to js/i18n.js with label "krio-translation"

### Adding Legal Content
If you are a legal professional familiar with Sierra Leone law:
- Review and improve license explanations
- Add case law references
- Update Cyber Security Act summaries
- Flag any legal inaccuracies

Open a PR with label "legal-content"

## 📐 Code Standards

### JavaScript
- Use ES6+ (const, let, arrow functions)
- Add JSDoc comments to all functions
- Wrap async operations in try/catch
- No jQuery, no React — vanilla JS only
- Test on Chrome, Firefox, and mobile

### HTML
- Semantic HTML5 elements
- WCAG AA accessibility minimum
- data-i18n attributes on all text
- aria-labels on all interactive elements

### CSS
- Use existing CSS variables in :root
- Mobile-first responsive design
- Minimum 44px touch targets
- Add to css/style.css only

### Commit Messages
Format: `type: description`

Types:
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `style:` — CSS/UI changes
- `refactor:` — Code restructure
- `i18n:` — Translation changes
- `legal:` — Legal content changes
- `a11y:` — Accessibility improvements

## 🌍 Translation Guide

To add a new language:
1. Open js/i18n.js
2. Add a new language object to TRANSLATIONS following the same key structure as 'en' and 'krio'
3. Add the language button to the navbar language toggle in all pages
4. Test every page in the new language
5. Submit PR with label "new-language"

Priority languages for Sierra Leone:
- Temne (te)
- Mende (men)
- Limba (lia)
- French (fr) — regional relevance

## ♿ Accessibility Standards

All contributions must meet WCAG 2.1 AA:
- Color contrast ratio minimum 4.5:1
- All images have alt text
- All forms have labels
- Keyboard navigation works
- Screen reader compatible

Run accessibility check before PR:
- Use Chrome DevTools Lighthouse
- Score must be 85+ for Accessibility

## 🔒 Security Guidelines

- Never commit API keys or secrets
- Never use innerHTML with user input
- Always validate and sanitize input
- Report security vulnerabilities privately to the maintainers (do not open public issues)

## 📊 Data and Privacy

Contributions must maintain our privacy-by-design approach:
- No new data collection without explicit user consent
- No new external API calls without documenting them in privacy.html
- No tracking scripts
- localStorage only for persistence

## 🏫 Academic Context

This project began as a DLAW207 group project at Limkokwing University of Creative Technology, Sierra Leone (March-July 2026). It is now open for community contributions while remaining true to its academic and social mission.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

*OpenRights SL — Empowering Sierra Leonean creators with legal clarity 🇸🇱*
