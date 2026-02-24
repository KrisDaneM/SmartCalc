const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
const mainContent = document.getElementById('mainContent');

// ==========================
// Sidebar open/close
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    mainContent.classList.add('expanded');
    sidebarOpenBtn.style.display = 'block';
});

sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    mainContent.classList.remove('expanded');
    sidebarOpenBtn.style.display = 'none';
});

// ==========================
// Dropdown toggles for ALL categories
document.querySelectorAll('.has-dropdown').forEach(item => {
    const link = item.querySelector('.menu-link');
    const dropdown = item.querySelector('.dropdown');
    const arrow = item.querySelector('.arrow');

    link.addEventListener('click', () => {
        dropdown.classList.toggle('show');
        arrow.classList.toggle('rotated');
    });
});