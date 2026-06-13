let registryData = [];

async function fetchRegistry() {
  const binId = localStorage.getItem('jsonBinId');
  const binKey = localStorage.getItem('jsonBinKey');

  document.getElementById('registry-grid').innerHTML = '';
  document.getElementById('registry-empty').classList.add('hidden');
  document.getElementById('registry-loading').classList.remove('hidden');
  document.getElementById('registry-loading').classList.add('flex');

  if (!binId) {
    // Load from mock data or local profile if no bin
    setTimeout(() => {
      loadFallbackData();
    }, 500);
    return;
  }

  try {
    const headers = {};
    if (binKey) {
      headers['X-Master-Key'] = binKey;
    }

    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) throw new Error('Failed to fetch from JSONBin');

    const data = await response.json();
    registryData = data.record.creators || [];
    renderRegistry(registryData);
  } catch (error) {
    console.error(error);
    showToast('Failed to load registry from JSONBin. Falling back to local data.');
    loadFallbackData();
  }
}

function loadFallbackData() {
  registryData = [];
  const localProfile = JSON.parse(localStorage.getItem('creatorProfile'));
  if (localProfile) {
    registryData.push({
      id: 'local-user',
      name: localProfile.fullName,
      email: localProfile.email,
      project: localProfile.projectName || 'My Open Source Project',
      role: 'Local Creator',
      license: (() => { const s = localStorage.getItem('selectedLicense'); return s ? JSON.parse(s).name : 'Not Specified'; })()
    });
  }
  
  // Add some mock SL creators
  registryData.push({ id: '1', name: 'Alusine Kamara', role: 'Developer', project: 'Freetown Transit API', license: 'MIT License' });
  registryData.push({ id: '2', name: 'Binta Jalloh', role: 'Designer', project: 'Salone UI Kit', license: 'CC-BY 4.0' });
  
  renderRegistry(registryData);
}

function renderRegistry(creators) {
  document.getElementById('registry-loading').classList.add('hidden');
  document.getElementById('registry-loading').classList.remove('flex');

  const grid = document.getElementById('registry-grid');
  grid.innerHTML = '';

  if (creators.length === 0) {
    document.getElementById('registry-empty').classList.remove('hidden');
    document.getElementById('registry-empty').classList.add('flex');
    return;
  }

  creators.forEach(creator => {
    const card = document.createElement('div');
    card.className = 'glass-card p-6 rounded-2xl hover:translate-y-[-2px] transition border border-white/10 relative group';
    
    // Avatar generic
    const initial = creator.name ? creator.name.charAt(0).toUpperCase() : '?';
    
    card.innerHTML = `
      <div class="absolute top-4 right-4 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-gray-400 group-hover:border-yellow-500/50 group-hover:text-yellow-300 transition">
        ${sanitize(creator.license || 'Unknown License')}
      </div>
      <div class="flex items-center gap-4 mb-4">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
          ${sanitize(initial)}
        </div>
        <div>
          <h3 class="font-bold text-white text-lg">${sanitize(creator.name || 'Anonymous Creator')}</h3>
          <p class="text-xs text-yellow-400">${sanitize(creator.role || 'Contributor')}</p>
        </div>
      </div>
      <div class="bg-black/20 rounded-lg p-3 border border-white/5">
        <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Project</p>
        <p class="text-sm text-gray-200 font-medium">${sanitize(creator.project || 'No project listed')}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterRegistry() {
  const query = document.getElementById('search-registry').value.toLowerCase();
  const filtered = registryData.filter(c => 
    (c.name && c.name.toLowerCase().includes(query)) || 
    (c.project && c.project.toLowerCase().includes(query))
  );
  renderRegistry(filtered);
}

function showConfigModal() {
  document.getElementById('bin-id').value = localStorage.getItem('jsonBinId') || '';
  document.getElementById('bin-key').value = localStorage.getItem('jsonBinKey') || '';
  document.getElementById('config-modal').classList.remove('hidden');
}

function closeConfigModal() {
  document.getElementById('config-modal').classList.add('hidden');
}

function saveConfig() {
  const binId = document.getElementById('bin-id').value.trim();
  const binKey = document.getElementById('bin-key').value.trim();
  
  if (binId) localStorage.setItem('jsonBinId', binId);
  else localStorage.removeItem('jsonBinId');
  
  if (binKey) localStorage.setItem('jsonBinKey', binKey);
  else localStorage.removeItem('jsonBinKey');
  
  closeConfigModal();
  fetchRegistry();
  showToast('Configuration saved!');
}

document.addEventListener('DOMContentLoaded', fetchRegistry);

// Make globals
window.fetchRegistry = fetchRegistry;
window.filterRegistry = filterRegistry;
window.showConfigModal = showConfigModal;
window.closeConfigModal = closeConfigModal;
window.saveConfig = saveConfig;
