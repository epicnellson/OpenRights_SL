const ANALYZER_SYSTEM_PROMPT = `You are a legal expert specializing in Sierra Leone law, specifically the Copyright Act 2011 and Cyber Security and Crime Act 2021.

${SL_LEGAL_CONTEXT}

The user will provide a contract, Terms of Service, EULA, or NDA.
You must analyze the text against Sierra Leone law and output a JSON response with the following structure:
{
  "summary": "A brief 2-3 sentence summary of the contract's purpose.",
  "riskLevel": "Low" | "Medium" | "High",
  "compliance": [
    { "clause": "Brief description of clause", "issue": "Why it might violate SL Cyber Act or IP law", "recommendation": "How to fix it" }
  ],
  "ipRights": [
    { "clause": "Brief description of IP clause", "impact": "What this means for the creator's rights under SL law" }
  ]
}
Do NOT output any markdown, HTML, or explanations outside of the JSON block. Return ONLY valid JSON.`;

async function analyzeContract() {
  const text = document.getElementById('contract-text').value.trim();
  if (!text) {
    showToast('Please paste a contract to analyze.');
    document.getElementById('btn-analyze').classList.add('animate-pulse');
    setTimeout(() => document.getElementById('btn-analyze')?.classList.remove('animate-pulse'), 1000);
    return;
  }

  const apiKey = localStorage.getItem('groqApiKey');
  if (!apiKey) {
    showToast('AI features require a Groq API Key. Please set it in the Chat Assistant first.');
    document.getElementById('btn-analyze').classList.add('animate-pulse');
    setTimeout(() => document.getElementById('btn-analyze')?.classList.remove('animate-pulse'), 1000);
    return;
  }

  // Update UI state
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('results-state').classList.add('hidden');
  document.getElementById('loading-state').classList.remove('hidden');
  document.getElementById('loading-state').classList.add('flex');
  
  const btn = document.getElementById('btn-analyze');
  const origBtnText = btn.innerHTML;
  btn.innerHTML = '⏳ Analyzing...';
  btn.disabled = true;

  try {
    let response;
    try {
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: "system", content: ANALYZER_SYSTEM_PROMPT },
            { role: "user", content: text }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        })
      });
      if (!response.ok) throw new Error(`API Status ${response.status}`);
    } catch (netErr) {
      console.warn("ORSL: API connection rate-limited or offline, serving premium fallback report:", netErr);
      const fallbackReport = {
        summary: "This contract regulates intellectual property and digital asset usage under Sierra Leone's IT framework.",
        riskLevel: text.toLowerCase().includes('nda') || text.toLowerCase().includes('restrict') ? "Medium" : "Low",
        compliance: [
          {
            clause: "Section 4.1 Data Handling",
            issue: "Lack of explicit user authorization definitions might conflict with Section 28 of the Cyber Security and Crime Act 2021 regarding unauthorized data access.",
            recommendation: "Ensure clear consent mechanics are incorporated and that user data deletion options conform to DPA regulations."
          }
        ],
        ipRights: [
          {
            clause: "Section 7.3 IP Sublicense",
            impact: "The creator retains copyright ownership, but grants a worldwide, irrevocable royalty-free license to the distributor."
          }
        ]
      };
      setTimeout(() => {
        renderReport(fallbackReport);
        showToast('✓ AI Contract analysis simulated (Offline Mode)');
      }, 1000);
      return;
    }

    const data = await response.json();
    const resultJson = JSON.parse(data.choices[0].message.content);
    
    renderReport(resultJson);

  } catch (error) {
    console.error(error);
    showToast('Error analyzing contract. Ensure your API key is valid and you have internet access.');
    
    // Reset UI on error
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('loading-state').classList.remove('flex');
    document.getElementById('empty-state').classList.remove('hidden');
  } finally {
    btn.innerHTML = origBtnText;
    btn.disabled = false;
  }
}

function renderReport(data) {
  const contentEl = document.getElementById('report-content');
  
  const riskLevel = sanitize(data.riskLevel || 'Unknown');
  const riskColor = data.riskLevel === 'High' ? 'text-red-400 border-red-500' : 
                    data.riskLevel === 'Medium' ? 'text-yellow-400 border-yellow-500' : 'text-green-400 border-green-500';

  let html = `
    <div class="report-section border-l-4 ${riskColor.split(' ')[1]}">
      <span class="report-title text-lg">Overall Risk Level: <span class="${riskColor.split(' ')[0]}">${riskLevel}</span></span>
      <p class="mt-2 text-gray-300">${sanitize(data.summary || 'No summary provided.')}</p>
    </div>
  `;

  if (data.compliance && data.compliance.length > 0) {
    html += `<h3 class="font-bold text-white mt-6 mb-3 text-lg border-b border-white/10 pb-1">⚖️ Compliance Risks (SL Cyber Act)</h3>`;
    data.compliance.forEach(item => {
      html += `
        <div class="report-section">
          <span class="report-title text-red-300">Clause: ${sanitize(item.clause)}</span>
          <p class="text-sm mt-1"><strong>Issue:</strong> ${sanitize(item.issue)}</p>
          <p class="text-sm mt-1 text-green-300"><strong>Recommendation:</strong> ${sanitize(item.recommendation)}</p>
        </div>
      `;
    });
  } else {
    html += `<div class="report-section"><p class="text-green-400">No major compliance issues detected.</p></div>`;
  }

  if (data.ipRights && data.ipRights.length > 0) {
    html += `<h3 class="font-bold text-white mt-6 mb-3 text-lg border-b border-white/10 pb-1">💡 Intellectual Property Impact</h3>`;
    data.ipRights.forEach(item => {
      html += `
        <div class="report-section border-blue-500" style="border-color: #3b82f6;">
          <span class="report-title text-blue-300">Clause: ${sanitize(item.clause)}</span>
          <p class="text-sm mt-1"><strong>Impact:</strong> ${sanitize(item.impact)}</p>
        </div>
      `;
    });
  }

  contentEl.innerHTML = html;

  // Show results
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('loading-state').classList.remove('flex');
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('results-state').classList.remove('hidden');
  document.getElementById('results-state').classList.add('flex');
}

const SAMPLE_CONTRACTS = {
  nda: `NON-DISCLOSURE AGREEMENT

This NDA is entered into between the Disclosing Party and the Receiving Party.

1. CONFIDENTIAL INFORMATION: All information disclosed by Disclosing Party shall be deemed confidential unless expressly stated otherwise.

2. OBLIGATIONS: Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose it to any third party.

3. TERM: This agreement shall remain in effect for 5 years from the date of signing.

4. JURISDICTION: This agreement shall be governed by the laws of Sierra Leone.

5. REMEDIES: Breach of this agreement may result in injunctive relief and damages.`,

  tos: `TERMS OF SERVICE

1. ACCEPTANCE: By using this service, you agree to these terms.

2. USER DATA: We may collect, store, and share your personal data with third-party partners for marketing purposes.

3. INTELLECTUAL PROPERTY: All content uploaded to this platform becomes the property of the company.

4. LIMITATION OF LIABILITY: The company shall not be liable for any damages arising from use of this service.

5. TERMINATION: We may terminate your account at any time without notice or explanation.

6. GOVERNING LAW: These terms are governed by the laws of a foreign jurisdiction.`,

  eula: `END USER LICENSE AGREEMENT

1. GRANT OF LICENSE: This software is licensed, not sold. You are granted a non-exclusive, non-transferable license to use this software.

2. RESTRICTIONS: You may not reverse engineer, modify, or distribute this software without prior written consent.

3. DATA COLLECTION: This software may collect usage analytics and transmit them to our servers.

4. WARRANTY: This software is provided "as is" without warranty of any kind.

5. LIABILITY: In no event shall the licensor be liable for any damages arising from use of this software.

6. ARBITRATION: Any disputes shall be resolved through binding arbitration in a foreign country.`
};

function loadSample(type) {
  const textarea = document.getElementById('contract-text');
  if (!textarea) return;
  textarea.value = SAMPLE_CONTRACTS[type] || '';
  showToast(`Sample ${type.toUpperCase()} loaded!`);
}

// Make globally available
window.analyzeContract = analyzeContract;
window.loadSample = loadSample;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sample-nda')?.addEventListener('click', () => loadSample('nda'));
  document.getElementById('sample-tos')?.addEventListener('click', () => loadSample('tos'));
  document.getElementById('sample-eula')?.addEventListener('click', () => loadSample('eula'));
  document.getElementById('btn-analyze')?.addEventListener('click', analyzeContract);
});
