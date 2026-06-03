let projectCount = 0;
const licenseOptions = [
  { value: 'MIT', label: 'MIT License' },
  { value: 'Apache-2.0', label: 'Apache 2.0' },
  { value: 'GPL-v3', label: 'GPL v3' },
  { value: 'CC-BY-4.0', label: 'CC-BY 4.0' },
  { value: 'CC-BY-NC-4.0', label: 'CC-BY-NC 4.0' }
];

function initBatch() {
  addProjectRow();
  addProjectRow();
  addProjectRow();
}

function addProjectRow() {
  projectCount++;
  const list = document.getElementById('project-list');
  const row = document.createElement('div');
  row.id = `project-${projectCount}`;
  row.className = 'grid grid-cols-1 md:grid-cols-12 gap-3 items-end glass p-4 rounded-xl';
  row.innerHTML = `
    <div class="md:col-span-4">
      <label class="block text-sm text-gray-400 mb-1">Project Name</label>
      <input type="text" id="name-${projectCount}" class="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white" placeholder="my-project">
    </div>
    <div class="md:col-span-3">
      <label class="block text-sm text-gray-400 mb-1">License</label>
      <select id="license-${projectCount}" class="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white">
        ${licenseOptions.map(l => `<option value="${l.value}">${l.label}</option>`).join('')}
      </select>
    </div>
    <div class="md:col-span-4">
      <label class="block text-sm text-gray-400 mb-1">Version</label>
      <input type="text" id="version-${projectCount}" class="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white" placeholder="1.0.0">
    </div>
    <div class="md:col-span-1">
      <button onclick="removeRow(${projectCount})" class="row-remove w-full rounded-lg py-2 text-red-400 hover:text-red-300 text-center" aria-label="Remove project">
        ✕
      </button>
    </div>
  `;
  list.appendChild(row);
}

function removeRow(id) {
  const row = document.getElementById(`project-${id}`);
  if (row) row.remove();
}

function clearAll() {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  projectCount = 0;
  initBatch();
}

function generateBatchCSV() {
  const rows = document.querySelectorAll('[id^="project-"]');
  if (rows.length === 0) {
    showToast('Add at least one project');
    return;
  }

  let csv = 'Project Name,License,Version,Date Generated\n';
  let hasData = false;

  rows.forEach(row => {
    const id = row.id.replace('project-', '');
    const name = document.getElementById(`name-${id}`)?.value || `project-${id}`;
    const license = document.getElementById(`license-${id}`)?.value || 'MIT';
    const version = document.getElementById(`version-${id}`)?.value || '1.0.0';
    const date = new Date().toISOString().split('T')[0];
    
    if (name.trim()) {
      csv += `"${name}","${license}","${version}","${date}"\n`;
      hasData = true;
    }
  });

  if (!hasData) {
    showToast('Enter at least one project name');
    return;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `licenses-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV downloaded!');
}

window.addProjectRow = addProjectRow;
window.removeRow = removeRow;
window.clearAll = clearAll;
window.generateBatchCSV = generateBatchCSV;