
// Get elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const main = document.querySelector('main');
const bell = document.getElementById('bell');
const announcementPopup = document.getElementById('announcement-popup');
const closeAnnouncement = document.getElementById('close-announcement');
const welcome = document.getElementById('welcome');

// Load logged-in user data from localStorage
const user = JSON.parse(localStorage.getItem('loggedUser')) || { firstName: 'User' };
welcome.textContent = `Welcome, user.firstName.`;

// Toggle sidebar on hamburger click
hamburger.addEventListener('click', () => {
   sidebar.classList.toggle('show'); 
   main.classList.toggle('sidebar-visible'); 
});
// Show announcements popup on bell click
bell.addEventListener('click', () => {
    announcementPopup.style.display = 'block';
});
// Close announcements popup
closeAnnouncement.addEventListener('click', () => {
    announcementPopup.style.display = 'none';  
});
// Sidebar navigation clicks (optional: to load content)
sidebar.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
    const section = e.target.textContent.trim();

    // Hide welcome message and show selected section
    welcome.textContent = section;

    // You can later add logic to display different content
    console.log(`User selected: ${section}`);
  }
});
