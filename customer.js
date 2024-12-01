document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');

    // Fetch username from localStorage
    const username = localStorage.getItem('username') || 'User';
    welcomeMessage.textContent = `Welcome, ${username}`;

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});
