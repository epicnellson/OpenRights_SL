You are an expert software developer. I need you to read the `CODEBASE_AUDIT.md` file in the root directory and systematically implement the fixes outlined there. 

Please perform the following refactoring tasks directly on the source codebase:

1. Fix the P0 Critical Issues:
   - In `js/chat.js`, eliminate the inline `onclick` XSS security vector by refactoring the dynamic button creation to use a proper event listener (`addEventListener`).
   - Extract the ~250 lines of duplicated `SL_LEGAL_CONTEXT` string shared between `js/chat.js` and `js/analyzer.js` into a single, shared configuration file at `data/sl-legal-context.js`. Update both files to reference this single source of truth.
   - Fix the `showToast` boolean type bug on line 77 of `js/generator.js` by changing the true argument to a valid string type like 'info'.
   - Fix the `conversationHistory.pop()` issue in `js/chat.js` so it safely checks if the last message belongs to the assistant before popping, preventing user message history corruption.
   - Refactor the fallback logic in `js/scanner.js` to use `.includes()` instead of strict matching so repo names containing keywords (like 'my-react-app') parse successfully.

2. Fix the P1 Important Issues:
   - Strip out all dead code blocks identified in `js/recommender.js` (the empty `Conflict 3` block, the blank `hideLoading()`, and the dead `#toast` fallback element selector).
   - In `js/registry.js`, optimize the duplicate `localStorage.getItem('selectedLicense')` calls by fetching it once and storing it in a constant variable.
   - Correct the jsPDF error message string escaping check on line 647 of `js/generator.js` to look cleanly for 'is not defined'.
   - In `js/dashboard.js`, replace the unstable `Math.random()` statistics generators with consistent, professional, hardcoded static demo integers (e.g., set creatorCount to 347) so presentation metrics remain clean and stable.
   - Strip out the invalid `name=""` attributes from all `<style>` tags across all project HTML files.

Review your modifications file by file to ensure no syntax errors are introduced, and confirm when the codebase has been polished.