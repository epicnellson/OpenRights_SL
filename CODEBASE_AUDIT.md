# OpenRights SL — Codebase Audit Report

> **Auditor:** AI Agent  
> **Date:** 11 June 2026  
> **Scope:** All production source files (JS, HTML, CSS, JSON, docs)  
> **Grade:** **C+ (69/100)** — Functional prototype with working demo but has structural issues preventing production readiness.

---

## Grade Breakdown

| Category | Score | Notes |
|---|---|---|
| **Code Quality & Style** | 16/25 | Workable but inconsistent; mixed comment languages, no linter, dead code |
| **Error Handling & Edge Cases** | 12/20 | Basic try/catch present but several unhandled null refs and logic gaps |
| **Security** | 12/15 | No server-side risks (static site), but XSS vector in chat.js, plaintext API keys |
| **Interoperability & Data Flow** | 14/15 | JSON exports are clean; no standard namespace for localStorage keys |
| **Architecture & Maintainability** | 8/15 | ~250 lines of identical legal context duplicated in 2 files; no module system; no tests |
| **Performance** | 7/10 | Acceptable for static app; i18n.js could be lazy-loaded JSON |
| **Total** | **69/100** | |

---

## Fix List (Priority-Ordered)

### 🔴 P0 — Must Fix Before Presentation

#### 1. `js/chat.js` — XSS via `data-*` onclick injection (Security)

**File:** `js/chat.js:483`  
**Problem:** Message content is embedded into an `onclick` handler string with weak escaping (`replace(/'/g, "\\'")`). A message containing `\\'` breaks out of the attribute.

**Fix:** Use `addEventListener` instead of inline `onclick`.

```js
// Before (line ~483):
<button class="copy-btn text-xs px-2 py-1 rounded" 
  data-msg='${escapeHtml(msg)}'
  onclick='navigator.clipboard.writeText("${escapeHtml(msg).replace(/'/g, "\\'")}")'>
  Copy
</button>

// After:
const btn = document.createElement('button');
btn.className = 'copy-btn text-xs px-2 py-1 rounded';
btn.textContent = 'Copy';
btn.addEventListener('click', () => {
  navigator.clipboard.writeText(msg);
  showToast('Copied!', 'success');
});
```

#### 2. `js/chat.js` + `js/analyzer.js` — Duplicated ~250-line `SL_LEGAL_CONTEXT`

**Files:** `chat.js:5-251`, `analyzer.js:1-247`  
**Problem:** The same `SL_LEGAL_CONTEXT` template string is copy-pasted across two files (~250 lines each). Updating one but not the other creates divergence bugs.

**Fix:** Extract to a shared module loaded via a `<script>` tag, or store in `data/sl-legal-context.js`:

```js
// data/sl-legal-context.js
const SL_LEGAL_CONTEXT = `...`; // (single source of truth)
```

Then reference from both files. Both files already declare `const SL_LEGAL_CONTEXT` globally — just move it to a shared file and load it first.

#### 3. `js/generator.js` — `checkDependencies` toast bug (Logic Error)

**File:** `js/generator.js:77`  
**Problem:** `showToast(message, true)` passes a boolean as the second parameter, but `showToast` expects a string type.

```js
// Before:
showToast('Downloading jsPDF from CDN...', true);

// After:
showToast('Downloading jsPDF from CDN...', 'info');
```

#### 4. `js/chat.js` — `conversationHistory.pop()` causes history corruption

**File:** `js/chat.js:650`  
**Problem:** When an API error occurs, the user message is popped from history, but it was already pushed via `displayMessage()` on line 562. If the user retries, the message was already shown but removed from history, breaking the conversation array.

**Fix:** Don't pop the user message — only remove the *assistant* reply if one was added. Or track the user message separately.

```js
// Before:
conversationHistory.pop();

// After:
// Remove the last assistant reply if one exists
if (conversationHistory[conversationHistory.length - 1]?.role === 'assistant') {
  conversationHistory.pop();
}
```

#### 5. `js/scanner.js` — Fragile repo name matching

**File:** `js/scanner.js` (fallback data)  
**Problem:** The fallback license detection only matches exact repo names (`'react'`, `'vue'`, etc.). A repo like `my-react-app` returns "Unknown".

**Fix:** Use `includes()` instead of strict equality for fallback matching:

```js
// Before:
if (repo === 'react') return licensesData.licenses.MIT;

// After:
const matched = Object.entries(fallbackData).find(([key]) => 
  repoName.toLowerCase().includes(key)
);
if (matched) return licensesData.licenses[matched[1]];
```

---

### 🟡 P1 — Should Fix

#### 6. `js/recommender.js` — Dead code (3 instances)

**File:** `recommender.js:170-172` — Empty `if` block:
```js
if (conflict3) {
  // check di full terms later
}
```
**Fix:** Remove the empty block. If logic is needed later, add it then.

**File:** `recommender.js:286-288` — Empty `hideLoading()`:
```js
function hideLoading() { return; }
```
**Fix:** Remove the function entirely or implement loading state UI.

**File:** `recommender.js:412-416` — Dead fallback for non-existent `#toast`:
```js
const toastEl = document.getElementById('toast');
if (toastEl) toastEl.remove();
```
**Fix:** Remove — toasts are created dynamically with class `.toast`.

#### 7. `js/registry.js` — Double `localStorage.getItem` call

**File:** `registry.js:52-53`  
**Problem:** Calls `localStorage.getItem('selectedLicense')` twice instead of caching.

```js
// Before:
if (localStorage.getItem('selectedLicense')) {
  const saved = JSON.parse(localStorage.getItem('selectedLicense'));

// After:
const stored = localStorage.getItem('selectedLicense');
if (stored) {
  const saved = JSON.parse(stored);
```

#### 8. `js/generator.js` — Error message escaping mismatch

**File:** `generator.js:647`  
**Problem:** Comparing error.message against `"is not defined\\'" ` but the template literal uses single quotes, so the escaping may not match actual jsPDF error text.

**Fix:** Use a more robust check:

```js
// Before:
error.message.includes("is not defined\\'")

// After:
error.message && error.message.includes('is not defined')
```

#### 9. `js/dashboard.js` — Fake random stats

**File:** `dashboard.js`  
**Problem:** All dashboard numbers are `Math.floor(Math.random() * 500) + 100`. For a prototype this is acceptable, but the randomness changes on every page load.

**Fix:** Hardcode plausible static demo values for presentation consistency:

```js
// Before:
creatorCount = Math.floor(Math.random() * 500) + 100;

// After:
creatorCount = 347;
```

#### 10. Copy-paste `name` attributes ignored in `<style>` tags

All HTML files use `<style>` tags that should be `<style>` (no `name` attribute). The `name` attribute is not a valid or recognized attribute for `<style>` in HTML5. It does nothing.

**Fix:** Remove `name=""` from all `<style>` tags across all HTML files.

---

### 🔵 P2 — Nice to Fix

#### 11. Mixed language in comments (`recommender.js`)

Some comments mix Krio English ("di" instead of "the"). Inconsistent with the rest of the codebase.

**Fix:** Standardize all comments to plain English for consistency.

#### 12. `js/generator.js` line 598 — Extremely long line

The academic footer text spans 150+ characters on a single line. Break into a template literal with multiple lines or concatenate.

#### 13. `js/i18n.js` — 500+ lines as hardcoded JS

The translation object should be a standalone `data/i18n.json` file fetched at runtime. This reduces bundle size and allows easier translation contributions.

#### 14. No linter/prettier config

No `.eslintrc` or `.prettierrc` in the repository. Add a basic ESLint config targeting ES6+ for browser environments.

#### 15. localStorage key namespace

Keys like `groqApiKey`, `githubToken`, `jsonBinId` have no namespace prefix. Consider prefixing with `openrights_` to avoid collisions with other apps.

---

## Honest System Review

### Greatest Strengths

1. **Ambitious scope for a university project** — Covers licensing recommendations, PDF generation, GitHub scanning, batch processing, chat assistant, and dashboard analytics. This is genuinely impressive breadth for a single-developer academic project.

2. **Clean UI/UX** — The glassmorphism design, consistent dark gradient, mobile-responsive layout, and interactive wizard flow are well-executed. The UX is intuitive for non-technical creators.

3. **Offline-first via service worker** — Including `sw.js` with caching strategy shows understanding of PWA patterns, which is uncommon for undergraduate work.

4. **No backend dependency** — Entirely client-side means zero hosting cost and zero server maintenance. Good constraint-based design.

5. **Documentation** — The `docs/` folder with accessibility audit, privacy impact assessment, SDG evidence, and team contributions shows strong academic rigor.

### Weakest Points (The "Hacks")

1. **~500 lines of identical legal text duplicated across 2 files** — This is the single biggest code smell. If the legal context needs updating, someone has to remember to update both files. A university examiner will notice this immediately.

2. **Dashboard generates random numbers** — Presenting randomized statistics as if they are real data is academically risky. Either hardcode plausible demo values or clearly label as "simulated data."

3. **XSS vector in chat.js** — The `onclick` escaping is brittle. An examiner testing edge cases could break out of the string and execute arbitrary JS. This is the most security-critical issue.

4. **Empty functions and dead code** — `hideLoading()`, the empty `conflict3` block, and the dead toast fallback all look unfinished. An examiner will notice these as rushed or incomplete.

5. **No testing whatsoever** — Zero unit tests, zero integration tests. For a tool handling legal compliance, this is a significant gap. Even one or two Jest tests for the recommender logic would dramatically improve credibility.

6. **jsPDF error escape mismatch** — The `\\'` escaping in the error message check is a typo-level bug. It looks like the developer was fighting quote escaping and left it broken.

### Verdict

For a university assignment (DLAW207), this project earns a **solid B to A-** range depending on presentation quality. The ambition, documentation, and UX are standout. The technical issues (duplicated code, empty functions, fragile escaping) are the difference between an A and a B+.

The system satisfies **robust software engineering practices** at about 60-70% — it uses modern ES6+ syntax, has error handling in most places, is responsive, and has clean data structures. It falls short in **testing**, **modularization**, and **edge case hardening**.

**Recommendation for final submission:** Fix the P0 items (especially the XSS vector and duplicated legal context), hardcode dashboard stats, and remove dead code. That alone brings the grade to ~78/100 — a solid B+/A- submission.

---

*End of audit — fixes recommended: 15 items (5 critical, 5 important, 5 nice-to-have)*
