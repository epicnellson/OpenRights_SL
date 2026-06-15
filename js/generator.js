let selectedLicense = null;
let selectedLicenseKey = 'MIT';

const LICENSE_TEMPLATES = {
  "MIT": `MIT License

Copyright (c) [YEAR] [FULLNAME]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,

  "Apache-2.0": `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright (c) [YEAR] [FULLNAME]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`,

  "GPL-v3": `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) [YEAR] [FULLNAME]

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see: https://www.gnu.org/licenses/`,

  "CC-BY-4.0": `Creative Commons Attribution 4.0 International (CC BY 4.0)

Copyright (c) [YEAR] [FULLNAME]

You are free to:
- Share: copy and redistribute the material in any medium or format
- Adapt: remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- Attribution: You must give appropriate credit, provide a link to the license, and indicate if changes were made.

Full license: https://creativecommons.org/licenses/by/4.0/`,

  "CC-BY-NC-4.0": `Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) [YEAR] [FULLNAME]

You are free to:
- Share: copy and redistribute the material in any medium or format
- Adapt: remix, transform, and build upon the material

Under the following terms:
- Attribution: You must give appropriate credit
- NonCommercial: You may not use the material for commercial purposes

Full license: https://creativecommons.org/licenses/by-nc/4.0/`
};

const checkDependencies = () => {
  const missing = [];

  if (typeof window.jspdf === 'undefined' && typeof jsPDF === 'undefined') {
    missing.push('jsPDF');
  }
  if (typeof QRCode === 'undefined') {
    missing.push('QRCode.js');
  }

  if (missing.length > 0) {
    showToast(
      `⚠️ Some features may not work offline. Missing: ${missing.join(', ')}. Please check your internet connection or refresh the page.`,
      'info'
    );

    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn && missing.includes('jsPDF')) {
      pdfBtn.disabled = true;
      pdfBtn.title = 'PDF generation requires internet connection to load jsPDF library';
      pdfBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> 📑 PDF (requires internet)';
    }
  }
};

window.addEventListener('load', checkDependencies);

/**
 * Initializes the document generator by loading the selected license from local storage.
 * Redirects to the recommender page if no valid license is found.
 */
function initGenerator() {
  const stored = localStorage.getItem('selectedLicense');
  if (!stored) {
    // Show beautiful glassmorphic overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-[#0f0c29]/95 backdrop-blur-md p-4';
    overlay.innerHTML = `
      <div class="glass-card max-w-md w-full p-8 rounded-3xl border border-white/10 text-center shadow-2xl animate-pulse">
        <span class="text-6xl mb-4 block">⚖️</span>
        <h2 class="text-2xl font-bold text-white mb-2">No License Selected</h2>
        <p class="text-gray-300 mb-6 text-sm">Please use di Recommender tool first to select di perfect license for your project.</p>
        <a href="recommender.html" class="inline-block bg-[#1EB53A] hover:bg-[#17a32d] text-white font-bold px-6 py-3 rounded-xl transition shadow-lg text-sm text-white">
          Get My License →
        </a>
      </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      window.location.href = 'recommender.html';
    }, 3000);
    return;
  }

  try {
    selectedLicense = JSON.parse(stored);
    if (!selectedLicense || typeof selectedLicense !== 'object') throw new Error('Invalid data');
    selectedLicenseKey = selectedLicense.key;
    if (!selectedLicenseKey) throw new Error('No license key found');
    
    const nameEl = document.getElementById('license-name');
    nameEl.textContent = selectedLicense.name || 'Unknown License';
    
    // Apply visual branding class to di selected license container badge
    const badgeContainer = document.getElementById('license-badge');
    if (badgeContainer) {
      // Remove any previously added colors
      badgeContainer.className = 'glass rounded-xl p-4 mb-6 text-center border-t-4';
      if (selectedLicenseKey === 'MIT') {
        badgeContainer.classList.add('border-t-blue-500');
        nameEl.className = 'text-2xl font-bold text-blue-400';
      } else if (selectedLicenseKey === 'Apache-2.0') {
        badgeContainer.classList.add('border-t-orange-500');
        nameEl.className = 'text-2xl font-bold text-orange-400';
      } else if (selectedLicenseKey === 'GPL-v3') {
        badgeContainer.classList.add('border-t-red-500');
        nameEl.className = 'text-2xl font-bold text-red-400';
      } else if (selectedLicenseKey.startsWith('CC')) {
        badgeContainer.classList.add('border-t-green-500');
        nameEl.className = 'text-2xl font-bold text-green-400';
      }
    }
    
    updateHealthDashboard(selectedLicenseKey);
    
    // Auto-fill from creator profile if available
    const profile = JSON.parse(localStorage.getItem('creatorProfile') || 'null');
    if (profile && profile.fullName) {
      const nameInput = document.getElementById('creatorName');
      if (nameInput) nameInput.value = profile.fullName;
      const noteEl = document.getElementById('profile-note');
      if (noteEl) noteEl.classList.remove('hidden');
    }
    
    // Wire up dynamic updates to forms to refresh di preview box immediately
    document.querySelectorAll('#creatorName, #projectName, #projectYear, #projectDescription').forEach(input => {
      input.addEventListener('input', updatePreview);
    });
    
    // Initialize preview immediately
    updatePreview();
  } catch (error) {
    console.error('Error initializing generator:', error);
    window.location.href = 'recommender.html';
  }
}

function updateHealthDashboard(licenseKey) {
  const healthData = {
    'MIT': { openness: 95, protection: 40, commercial: 100 },
    'Apache-2.0': { openness: 90, protection: 60, commercial: 100 },
    'GPL-v3': { openness: 100, protection: 90, commercial: 50 },
    'CC-BY-4.0': { openness: 100, protection: 30, commercial: 100 },
    'CC-BY-NC-4.0': { openness: 80, protection: 50, commercial: 0 }
  };

  const data = healthData[licenseKey] || { openness: 50, protection: 50, commercial: 50 };

  setTimeout(() => {
    document.getElementById('bar-openness').style.width = data.openness + '%';
    document.getElementById('health-openness').textContent = data.openness + '%';

    document.getElementById('bar-protection').style.width = data.protection + '%';
    document.getElementById('health-protection').textContent = data.protection + '%';

    document.getElementById('bar-commercial').style.width = data.commercial + '%';
    document.getElementById('health-commercial').textContent = data.commercial + '%';
  }, 300);
}

/**
 * Gathers form data from the input fields.
 * @returns {Object} The form data containing creator name, project name, year, description, and license key.
 */
function getFormData() {
  return {
    creatorName: document.getElementById('creatorName').value.trim(),
    projectName: document.getElementById('projectName').value.trim(),
    projectYear: document.getElementById('projectYear').value.trim(),
    projectDescription: document.getElementById('projectDescription').value.trim(),
    licenseKey: selectedLicenseKey
  };
}

/**
 * Validates the input form data and highlights missing fields.
 * @returns {Object|null} The form data if valid, or null if validation fails.
 */
function validateForm() {
  const data = getFormData();
  let isValid = true;
  const fields = ['creatorName', 'projectName', 'projectYear', 'projectDescription'];

  fields.forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + '-error');
    if (!data[id]) {
      input.classList.add('error');
      if (error) error.classList.add('show');
      isValid = false;
    } else {
      input.classList.remove('error');
      if (error) error.classList.remove('show');
    }
  });

  if (data.projectYear && (data.projectYear < 1900 || data.projectYear > 2100)) {
    document.getElementById('projectYear').classList.add('error');
    document.getElementById('projectYear-error').classList.add('show');
    isValid = false;
  }

  if (!isValid) {
    const firstError = document.querySelector('.form-input.error');
    if (firstError) firstError.focus();
  }

  return isValid ? data : null;
}

/**
 * Updates the live preview box with the generated license text based on current inputs.
 */
function updatePreview() {
  const previewBox = document.getElementById('preview-box');
  const data = getFormData();

  const previewText = generateLicenseText(data);
  previewBox.textContent = previewText;
}

/**
 * Generates the license text using the selected template and form data.
 * @param {Object} data - Form data with projectYear and creatorName
 * @returns {string} The formatted license text
 */
function generateLicenseText(data) {
  const template = LICENSE_TEMPLATES[data.licenseKey];
  if (!template) return 'Error: Unknown license template for ' + data.licenseKey;
  let text = template
    .replace(/\[YEAR\]/g, data.projectYear || '2026')
    .replace(/\[FULLNAME\]/g, data.creatorName || 'Your Name / Organisation');

  if (window.generatedCustomClause) {
    text += '\n\n--- CUSTOM ADDITIONAL CLAUSE ---\n\n' + window.generatedCustomClause;
  }

  return text;
}

/**
 * Generates a privacy policy template based on project details.
 * @param {Object} data - Form data
 * @returns {string} The formatted privacy policy
 */
function generatePrivacyPolicy(data) {
  return `Privacy Policy for ${data.projectName}

Last Updated: ${data.projectYear}

1. INTRODUCTION

This Privacy Policy describes how "${data.projectName}" ("we", "us", or "our") 
handles user data in accordance with the Sierra Leone Cyber Security and Crime Act 2021.

2. DATA COLLECTION

We collect minimal personal information necessary for the functionality of this project:
- No personal data is collected without your explicit consent
- Any data collected is stored locally on your device

3. LEGAL BASIS

This privacy policy is established in compliance with:
- Sierra Leone Cyber Security and Crime Act 2021
- Data minimisation principles under GDPR Article 5(1)(c)

4. PII TRANSMISSION STATEMENT

⚠️ IMPORTANT: No PII (Personally Identifiable Information) is transmitted 
to external servers. All project data, creator information, and generated 
documents remain exclusively on the user's local device. This application 
operates entirely client-side with no backend server communication.

5. USER RIGHTS

Under Sierra Leone Cyber Security and Crime Act 2021, you have the right to:
- Access your personal data
- Request correction of inaccurate personal data
- Request deletion of your personal data
- Withdraw consent at any time

6. DATA PROTECTION

We implement appropriate technical measures to protect your personal data against 
unauthorized access, alteration, disclosure, or destruction.

7. DATA RESIDENCY STATEMENT:
This tool operates entirely within your local browser environment. No personal data, project 
information, or generated documents are transmitted to any external server. All data is stored 
exclusively in your browser's localStorage and remains on your device at all times. This design 
ensures compliance with the Sierra Leone Cyber Security and Crime Act 2021, and is consistent 
with international data minimisation principles including those outlined in the EU General Data 
Protection Regulation (GDPR) Article 5(1)(c), applicable where this tool is accessed by users 
in the European Union or United Kingdom.

8. CHANGES TO THIS POLICY

We reserve the right to update this privacy policy. Any changes will be posted 
on this page with a revised "Last Updated" date.

9. CONTACT

For questions about this Privacy Policy, please contact:
- Name: ${data.creatorName}
- Project: ${data.projectName}

This project is licensed under: ${selectedLicense ? selectedLicense.name : 'Not specified'}

---
Generated by OpenRights SL — DLAW207 Limkokwing University Sierra Leone`;
}

/**
 * Triggers a file download with the given filename and content.
 * @param {string} filename - The name of the file
 * @param {string} content - The content to be written
 */
function downloadTxt(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Saves a generated document record to local storage history.
 * @param {Object} data - The form data used to generate the document.
 * @param {string} referenceNumber - The unique reference number for the document.
 */
function saveToHistory(data, referenceNumber) {
  const history = JSON.parse(localStorage.getItem('creationHistory') || '[]');
  const record = {
    creatorName: data.creatorName,
    projectName: data.projectName,
    projectYear: data.projectYear,
    projectDescription: data.projectDescription,
    license: selectedLicense ? selectedLicense.name : 'Unknown',
    licenseKey: data.licenseKey,
    referenceNumber: referenceNumber,
    timestamp: new Date().toISOString()
  };
  history.unshift(record);
  localStorage.setItem('creationHistory', JSON.stringify(history.slice(0, 50)));
}

/**
 * Handles generating and downloading the LICENSE.txt file.
 */
function downloadLicenseTxt() {
  const btn = document.querySelector('[onclick="downloadLicenseTxt()"]');
  const originalText = 'Download LICENSE.txt';

  const data = validateForm();
  if (!data) return;

  if (btn) {
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;
  }

  const content = generateLicenseText(data);
  downloadTxt(`LICENSE-${data.projectName.replace(/\s+/g, '-')}.txt`, content);

  setTimeout(() => {
    if (btn) {
      btn.textContent = '✓ Downloaded!';
      btn.disabled = false;
    }
    showToast('Downloaded LICENSE.txt!');
    setTimeout(() => {
      if (btn) btn.textContent = originalText;
    }, 2000);
  }, 300);
}

/**
 * Handles generating and downloading the Privacy Policy text file.
 */
function downloadPrivacyPolicy() {
  const data = validateForm();
  if (!data) return;
  const content = generatePrivacyPolicy(data);
  downloadTxt(`PRIVACY-${data.projectName.replace(/\s+/g, '-')}.txt`, content);
  showToast('Downloaded Privacy Policy!');
}

/**
 * Generates the Creation Record PDF.
 * @param {Object} data - The form data
 * @param {string} referenceNumber - A unique reference number for the certificate
 * @returns {Promise<jsPDF>} The generated jsPDF instance as a Promise
 */
/**
 * Gets a jsPDF instance with fallback for different loading methods
 * @returns {Object} jsPDF instance
 */
function getPDF() {
  if (window.jspdf?.jsPDF) {
    return new window.jspdf.jsPDF();
  } else if (window.jsPDF) {
    return new window.jsPDF();
  } else {
    throw new Error('jsPDF library not loaded');
  }
}

async function generatePDF(data, referenceNumber) {
  console.log("ORSL-LOG: Generating Creation Record PDF for project:", data.projectName, "Creator:", data.creatorName, "Ref:", referenceNumber);
  const pdf = getPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  pdf.setDrawColor(48, 43, 99);
  pdf.setLineWidth(2);
  pdf.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  pdf.setFillColor(48, 43, 99);
  pdf.rect(0, 0, pageWidth, 35, 'F');

  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.text('OpenRights SL', pageWidth / 2, 22, { align: 'center' });

  const slGreen = [30, 181, 58];
  const slBlue = [0, 114, 198];
  pdf.setFillColor(...slGreen);
  pdf.rect(margin, pageHeight - margin - 8, (pageWidth - margin * 2) / 3, 4, 'F');
  pdf.setFillColor(255, 255, 255);
  pdf.rect(margin + (pageWidth - margin * 2) / 3, pageHeight - margin - 8, (pageWidth - margin * 2) / 3, 4, 'F');
  pdf.setFillColor(...slBlue);
  pdf.rect(margin + (pageWidth - margin * 2) * 2 / 3, pageHeight - margin - 8, (pageWidth - margin * 2) / 3, 4, 'F');

  let y = 50;
  pdf.setFontSize(16);
  pdf.setTextColor(48, 43, 99);
  pdf.text('Certificate of Digital Creation', pageWidth / 2, y, { align: 'center' });

  y += 15;
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text('This certificate serves as official proof of creation', pageWidth / 2, y, { align: 'center' });

  y += 20;
  const details = [
    { label: 'Creator Name', value: data.creatorName },
    { label: 'Project Name', value: data.projectName },
    { label: 'Year', value: data.projectYear },
    { label: 'License', value: selectedLicense ? selectedLicense.name : 'N/A' },
    { label: 'Description', value: data.projectDescription }
  ];

  details.forEach(d => {
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(d.label + ':', 25, y);
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.text(d.value, 65, y);
    pdf.setFont('helvetica', 'normal');
    y += 10;
  });

  y += 10;
  pdf.setFontSize(10);
  pdf.setTextColor(48, 43, 99);
  pdf.text('License Summary:', 25, y);
  y += 6;
  pdf.setFontSize(9);
  pdf.setTextColor(60, 60, 60);
  const summaryLines = pdf.splitTextToSize(selectedLicense ? selectedLicense.summary : '', 160);
  summaryLines.forEach(line => {
    pdf.text(line, 25, y);
    y += 5;
  });

  y += 15;
  pdf.setFontSize(11);
  pdf.setTextColor(48, 43, 99);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Reference: ' + referenceNumber, 25, y);
  pdf.setFont('helvetica', 'normal');

  y += 10;
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  pdf.text('Generated: ' + timestamp, 25, y);

  // ========== QR Code Generation ==========
  // Create QR code with project metadata
  const qrData = JSON.stringify({
    ref: referenceNumber,
    project: data.projectName,
    creator: data.creatorName,
    license: selectedLicense ? selectedLicense.name : 'N/A',
    year: data.projectYear,
    url: selectedLicense ? selectedLicense.url : ''
  });

  // Generate QR code as data URL
  const qrContainer = document.createElement('div');
  qrContainer.style.display = 'none';
  document.body.appendChild(qrContainer);

  new QRCode(qrContainer, {
    text: qrData,
    width: 80,
    height: 80,
    correctLevel: QRCode.CorrectLevel.L
  });

  return new Promise((resolve) => {
    // Wait for QR code to render
    setTimeout(() => {
      const qrCanvas = qrContainer.querySelector('canvas');
      const qrDataUrl = qrCanvas ? qrCanvas.toDataURL('image/png') : null;

      if (qrDataUrl) {
        // Position QR code in bottom-right corner
        const qrX = pageWidth - margin - 25;
        const qrY = pageHeight - margin - 45;
        pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, 25, 25);

        pdf.setFontSize(7);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Scan to verify', qrX + 12, qrY + 28, { align: 'center' });
      }

      document.body.removeChild(qrContainer);

      // Academic Signature Section
      y += 20;
      pdf.setFontSize(10);
      pdf.setTextColor(48, 43, 99);

      // Left column
      pdf.text('Authorized By: ________________________', 25, y);
      y += 8;
      pdf.text('Name: ________________________________', 25, y);
      y += 8;
      pdf.text('Designation: __________________________', 25, y);

      // Right column
      const rightColX = pageWidth / 2 + 10;
      pdf.text('Date: ________________________________', rightColX, y - 16);
      pdf.text('Institution Stamp:', rightColX, y - 8);
      pdf.setDrawColor(150, 150, 150);
      pdf.setLineWidth(0.5);
      pdf.rect(rightColX, y - 4, 50, 20);

      y += 25;

      // Academic footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      const academicText = 'This certificate is generated for academic purposes under DLAW207 — I.T Law and IPR Legal Issues, Limkokwing University of Creative Technology, Sierra Leone. Semester 06 | March 2026 — July 2026 | Examiner: Ing. Sheku Dinneh Kamara';
      const academicLines = pdf.splitTextToSize(academicText, pageWidth - margin * 2);
      academicLines.forEach(line => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Bottom verification
      y = pageHeight - 25;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Verify at: openrights-sl.github.io', pageWidth / 2, y, { align: 'center' });

      pdf.setFontSize(7);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Generated by OpenRights SL — Limkokwing University DLAW207', pageWidth / 2, pageHeight - 18, { align: 'center' });

      resolve(pdf);
    }, 100);
  });
}

async function generatePDFSafe(data, referenceNumber) {
  const btn = document.getElementById('pdf-btn');
  const originalText = btn ? btn.innerHTML : 'Download Creation Record PDF';

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Generating PDF...';
  }

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('PDF generation timed out after 10 seconds')), 10000)
  );

  try {
    const pdf = await Promise.race([
      generatePDF(data, referenceNumber),
      timeoutPromise
    ]);

    saveToHistory(data, referenceNumber);
    pdf.save(`CREATION-RECORD-${data.projectName.replace(/\s+/g, '-')}.pdf`);
    showToast('✅ PDF downloaded successfully!');
  } catch (error) {
    console.error('PDF generation error:', error);

    if (error.message.includes('timed out')) {
      showToast('⚠️ PDF generation timed out. Please refresh and try again.');
    } else if (error.message.includes('jsPDF is not defined') || error.message.includes('is not defined')) {
      showToast('❌ PDF library failed to load. Check your internet connection.');
    } else {
      showToast('❌ PDF generation failed: ' + error.message);
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

/**
 * Handles generating and downloading the Creation Record PDF document.
 */
async function downloadCreationPDF() {
  const data = validateForm();
  if (!data) return;
  const referenceNumber = "ORSL-" + Date.now();
  await generatePDFSafe(data, referenceNumber);
}

/**
 * Shows the GitHub token modal.
 */
function showGithubModal() {
  document.getElementById('github-modal').classList.remove('hidden');
}

/**
 * Hides the GitHub token modal.
 */
function hideGithubModal() {
  document.getElementById('github-modal').classList.add('hidden');
}

/**
 * Saves the GitHub token and proceeds to publish.
 */
function saveGithubToken() {
  const token = document.getElementById('github-token').value.trim();
  if (token) {
    localStorage.setItem('githubToken', token);
    hideGithubModal();
    publishToGist();
  }
}

/**
 * Skips providing a GitHub token and hides the modal.
 */
function skipGithubToken() {
  hideGithubModal();
}

/**
 * Publishes the generated files to a private GitHub Gist using the user's token.
 */
async function publishToGist() {
  const data = validateForm();
  if (!data) return;

  const token = localStorage.getItem('githubToken');
  if (!token) {
    showGithubModal();
    return;
  }

  const referenceNumber = "ORSL-" + Date.now();

  showToast('Publishing to GitHub Gist...');

  try {
    const response = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: `OpenRights SL — License for ${data.projectName} by ${data.creatorName}`,
        public: false,
        files: {
          "LICENSE.txt": {
            content: generateLicenseText(data)
          },
          "PRIVACY_POLICY.txt": {
            content: generatePrivacyPolicy(data)
          },
          "CREATION_RECORD.txt": {
            content: `OpenRights SL Creation Record
Reference: ${referenceNumber}
Project: ${data.projectName}
Creator: ${data.creatorName}
License: ${data.licenseKey}
Generated: ${new Date().toISOString()}`
          }
        }
      })
    });

    if (response.status === 401) {
      localStorage.removeItem('githubToken');
      showGithubModal();
      showToast('Token invalid or expired — please reconnect GitHub');
      return;
    }

    if (!response.ok) {
      throw new Error('Gist creation failed');
    }

    const gistData = await response.json();
    showToast(`✅ Published! View Gist: ${gistData.html_url}`);
  } catch (error) {
    showToast('Failed to publish. Check your token permissions and try again.');
  }
}

/**
 * Copy HTML Badge - Generates license badge for README
 */
function copyHtmlBadge() {
  const data = getFormData();
  if (!data.creatorName || !data.projectName) {
    showToast('Please fill in the form first');
    return;
  }

  const licenseUrl = selectedLicense?.url || 'https://opensource.org/licenses/MIT';
  const licenseName = selectedLicense?.name || 'MIT License';

  const badgeHtml = `<a href="${licenseUrl}">Licensed under ${licenseName} by ${data.creatorName}</a>`;

  navigator.clipboard.writeText(badgeHtml).then(() => {
    showToast('HTML badge copied to clipboard!');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = badgeHtml;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('HTML badge copied!');
  });
}

/**
 * Download Metadata (JSON) - Exports project details as JSON
 */
function downloadMetadata() {
  const data = getFormData();
  if (!data.creatorName || !data.projectName) {
    showToast('Please fill in the form first');
    return;
  }

  const metadata = {
    project: {
      name: data.projectName,
      description: data.projectDescription,
      year: data.projectYear,
      created: new Date().toISOString()
    },
    creator: {
      name: data.creatorName
    },
    license: {
      key: data.licenseKey,
      name: selectedLicense?.name || 'N/A',
      url: selectedLicense?.url || '',
      summary: selectedLicense?.summary || ''
    },
    openrights: {
      reference: 'ORSL-' + Date.now(),
      version: '1.0.0',
      generated: new Date().toISOString()
    }
  };

  const jsonStr = JSON.stringify(metadata, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.projectName.replace(/\s+/g, '-')}-metadata.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Metadata downloaded!');
}

window.validateForm = validateForm;
window.updatePreview = updatePreview;
window.showGithubModal = showGithubModal;
window.saveGithubToken = saveGithubToken;
window.skipGithubToken = skipGithubToken;
window.downloadLicenseTxt = downloadLicenseTxt;
window.downloadPrivacyPolicy = downloadPrivacyPolicy;
window.downloadCreationPDF = downloadCreationPDF;
window.copyHtmlBadge = copyHtmlBadge;
window.downloadMetadata = downloadMetadata;

window.generatedCustomClause = '';

window.copyPreview = function () {
  const previewBox = document.getElementById('preview-box');
  if (!previewBox) return;
  navigator.clipboard.writeText(previewBox.textContent).then(() => {
    showToast('Preview copied to clipboard!');
  }).catch(() => {
    const textArea = document.createElement('textarea');
    textArea.value = previewBox.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Preview copied!');
  });
};

window.switchTab = function (tab) {
  const standardBtn = document.getElementById('tab-standard');
  const customBtn = document.getElementById('tab-custom');
  const standardForm = document.getElementById('standard-form-container');
  const customForm = document.getElementById('custom-form-container');

  if (tab === 'standard') {
    standardBtn.className = 'flex-1 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white transition';
    customBtn.className = 'flex-1 py-2 text-sm font-semibold rounded-lg text-gray-400 hover:text-white transition';
    standardForm.classList.remove('hidden');
    customForm.classList.add('hidden');
  } else {
    customBtn.className = 'flex-1 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white transition';
    standardBtn.className = 'flex-1 py-2 text-sm font-semibold rounded-lg text-gray-400 hover:text-white transition';
    customForm.classList.remove('hidden');
    standardForm.classList.add('hidden');
  }
};

window.generateCustomClause = async function () {
  const prompt = document.getElementById('customClausePrompt').value.trim();
  if (!prompt) {
    showToast('Please enter a description for your clause first.');
    return;
  }

  const apiKey = localStorage.getItem('groqApiKey');
  if (!apiKey) {
    showToast('AI features require a Groq API Key. Please set it in the Chat Assistant first.');
    return;
  }

  const btn = document.getElementById('btn-generate-clause');
  const origText = btn.innerHTML;
  btn.innerHTML = '⏳ Generating with AI...';
  btn.disabled = true;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: "system", content: "You are a legal expert specializing in open source licenses. The user wants to append a custom clause to their license. Draft ONLY the legal clause text, without any introductory or concluding remarks. Make it professional, enforceable, and concise." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    const draftText = data.choices[0].message.content.trim();

    // Set the value in the read-only draft textarea for verification
    const draftTextarea = document.getElementById('generatedClauseDraft');
    if (draftTextarea) {
      draftTextarea.value = draftText;
    }

    document.getElementById('custom-clause-result').classList.remove('hidden');
    showToast('Custom clause draft generated! Please review it below.');
  } catch (error) {
    showToast('Failed to generate clause. Check your internet or API key.');
  } finally {
    btn.innerHTML = origText;
    btn.disabled = false;
  }
};

window.approveAndAddCustomClause = function () {
  const draftTextarea = document.getElementById('generatedClauseDraft');
  if (!draftTextarea || !draftTextarea.value.trim()) {
    showToast('No draft clause available to add.');
    return;
  }
  
  window.generatedCustomClause = draftTextarea.value.trim();
  updatePreview();
  showToast('✓ Custom clause approved and added to your license!');
  
  const addBtn = document.getElementById('btn-add-clause');
  if (addBtn) {
    addBtn.innerHTML = '✓ Added!';
    addBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
    addBtn.classList.add('bg-green-800');
    setTimeout(() => {
      addBtn.innerHTML = '✓ Add to My License';
      addBtn.classList.remove('bg-green-800');
      addBtn.classList.add('bg-green-600', 'hover:bg-green-500');
    }, 2000);
  }
};

window.clearCustomClause = function () {
  window.generatedCustomClause = '';
  document.getElementById('customClausePrompt').value = '';
  const draftTextarea = document.getElementById('generatedClauseDraft');
  if (draftTextarea) draftTextarea.value = '';
  document.getElementById('custom-clause-result').classList.add('hidden');
  updatePreview();
  showToast('Custom clause cleared.');
};

document.addEventListener('DOMContentLoaded', initGenerator);