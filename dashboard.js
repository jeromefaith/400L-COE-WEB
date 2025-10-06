const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const main = document.querySelector('main');
const bell = document.getElementById('bell');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutTab = document.getElementById('logout-tab');
const profileName = document.getElementById('profile-name');
const contentArea = document.getElementById('content-area');

const user = JSON.parse(localStorage.getItem('loggedUser'));

if (profileName && user) {
  profileName.textContent = user.firstName + ' ' + (user.lastName || '');
}

if (user) {
  welcomeMessage.textContent = `👋 Welcome, ${user.firstName}.`;
  //Allow editing only if user is the admin (matric number ENG/COE/22003791)
  if (user.matricNo === 'ENG/COE/22003791'){
    welcomeMessage.setAttribute('contendeditable', 'true');
  }
} else {
  window.location.href = "index.html";
}

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
  main.classList.toggle('expanded');
});

logoutTab.addEventListener('click', () => {
  localStorage.removeItem('loggedUser');
  window.location.href = "index.html";
});

bell.addEventListener('click', () => {
  alert("Announcement: NO ANNOUNCEMENT HERE. 🙃");
});

sidebar.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const text = item.textContent.trim();

    if (text === 'Logout') {
      localStorage.removeItem('loggedUser');
      window.location.href = 'index.html';
      return;
    }

    welcomeMessage.style.display = 'none';
    contentArea.innerHTML ='<h2>' + text + '</h2><p>Content for ' + text + ' goes here.</p>';
  });
});