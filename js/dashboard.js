function refreshDashboard() {
  document.getElementById('stat-licenses').textContent = Math.floor(Math.random() * 500) + 100;
  document.getElementById('stat-creators').textContent = Math.floor(Math.random() * 200) + 50;

  const licenses = [
    { name: 'MIT', percent: 45, color: 'bg-blue-500' },
    { name: 'Apache 2.0', percent: 25, color: 'bg-orange-500' },
    { name: 'GPL v3', percent: 15, color: 'bg-red-500' },
    { name: 'CC-BY 4.0', percent: 10, color: 'bg-green-500' },
    { name: 'CC-BY-NC', percent: 5, color: 'bg-purple-500' }
  ];

  const barsContainer = document.getElementById('distribution-bars');
  barsContainer.innerHTML = '';
  
  licenses.forEach(l => {
    barsContainer.innerHTML += `
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-300">${l.name}</span>
          <span class="text-white font-semibold">${l.percent}%</span>
        </div>
        <div class="w-full bg-black/50 rounded-full h-2">
          <div class="${l.color} h-2 rounded-full" style="width: ${l.percent}%"></div>
        </div>
      </div>
    `;
  });

  const activityContainer = document.getElementById('recent-activity');
  activityContainer.innerHTML = `
    <li class="flex gap-3 text-sm border-b border-white/5 pb-3">
      <span class="text-xl">✅</span>
      <div>
        <p class="text-white">Alusine K. generated an <span class="text-blue-400">MIT License</span></p>
        <p class="text-xs text-gray-500">2 minutes ago</p>
      </div>
    </li>
    <li class="flex gap-3 text-sm border-b border-white/5 pb-3">
      <span class="text-xl">📝</span>
      <div>
        <p class="text-white">New creator registered: <span class="text-yellow-400">Fatu B.</span></p>
        <p class="text-xs text-gray-500">1 hour ago</p>
      </div>
    </li>
    <li class="flex gap-3 text-sm">
      <span class="text-xl">⚖️</span>
      <div>
        <p class="text-white">Project 'SaloneTech' adopted <span class="text-green-400">CC-BY 4.0</span></p>
        <p class="text-xs text-gray-500">3 hours ago</p>
      </div>
    </li>
  `;
}

document.addEventListener('DOMContentLoaded', refreshDashboard);
window.refreshDashboard = refreshDashboard;
