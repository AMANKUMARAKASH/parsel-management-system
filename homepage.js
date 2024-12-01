// Retrieve user details from localStorage
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');

// Role-specific menu items
const menus = {
    Customer: [
        { name: "Home", link: "#home" },
        { name: "Booking Service", link: "booking.html" },
        { name: "Tracking", link: "tracking.html" },
        { name: "Previous Booking", link: "bookingHistory.html" },
        { name: "Contact Support", link: "customer.html" },
        { name: "Logout", link: "#logout", action: logout },
    ],
    Officer: [
        { name: "Home", link: "#home" },
        { name: "Booking Service", link: "booking.html" },
        { name: "Tracking", link: "tracking.html" },
        { name: "Delivery Status", link: "delivery.html" },
        { name: "Pickup Scheduling", link: "scheduling.html" },
        { name: "Previous Booking", link: "#previoubookingHistory.html" },
        { name: "Logout", link: "#logout", action: logout },
    ],
};

// Dynamically load menu items based on role
function loadMenu() {
    const menuItems = document.getElementById("menuItems");
    const welcomeUser = document.getElementById("welcomeUser");
    const roleTitle = document.getElementById("roleTitle");

    // Update welcome message and role
    if (username && role) {
        welcomeUser.textContent = `Welcome, ${username}`;
        roleTitle.textContent = `${role} Homepage`;

        // Load the role-specific menu
        const menu = menus[role];
        menuItems.innerHTML = ""; // Clear existing menu items
        menu.forEach((menuItem) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = menuItem.name;
            a.href = menuItem.link;

            // Add logout action if specified
            if (menuItem.action) {
                a.addEventListener("click", menuItem.action);
            }

            li.appendChild(a);
            menuItems.appendChild(li);
        });
    } else {
        // If user data is not found, redirect to login
        window.location.href = "Login.html";
    }
}

// Logout function
function logout(event) {
    event.preventDefault();
    // Clear localStorage and redirect to login
    localStorage.clear();
    window.location.href = "Login.html";
}

// Initialize the homepage
loadMenu();
