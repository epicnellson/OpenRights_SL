# OpenRights SL — Agent Instructions

## Project Overview
This is a legal-tech compliance tool for Sierra Leonean 
creators called "OpenRights SL" built for DLAW207 
(IT Law and IPR) at Limkokwing University Sierra Leone.

## Tech Stack
- HTML5, Tailwind CSS via CDN, Vanilla JavaScript ES6+
- No backend, no React, no jQuery
- jsPDF via CDN for PDF generation
- Data stored in data/licenses.json
- localStorage for passing data between pages

## Design Style
- Glassmorphism UI
- Dark gradient background: #0f0c29 → #302b63 → #24243e
- Glass cards: backdrop-filter blur, semi-transparent 
  white border, subtle box shadow
- Mobile-first, responsive

## Coding Rules
- Always use const/let, arrow functions, template literals
- Add JSDoc comments to every function
- Wrap all fetch() calls in try/catch
- Minimum touch target size: 44px for mobile users
- Write files to their correct paths, never combine files

## File Structure
openrights-sl/
├── index.html
├── recommender.html
├── generator.html
├── about.html
├── css/style.css
├── js/recommender.js
├── js/generator.js
├── data/licenses.json
├── data/sl-legal-knowledge.json
├── prompt.md
├── prompt.txt
└── README.md

## prompt.md Protocol
When the user says "run the command in prompt.md", "read prompt.md",
or otherwise references prompt.md, it means they have added a NEW
command to prompt.md. I must:
1. Re-read prompt.md to find the new content
2. Execute whatever command/instruction was added
3. Not assume previous commands from prompt.md are still pending