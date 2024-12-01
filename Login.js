document.getElementById('userLogin').addEventListener('click', function () {
    handleLogin('Customer');
});

document.getElementById('officerLogin').addEventListener('click', function () {
    handleLogin('Officer');
});

function handleLogin(role) {
    // Clear previous error messages
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Validate username
    if (!username) {
        document.getElementById('usernameError').textContent = 'Username is required.';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Validate password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{1,30}$/;
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').textContent = 'Password must be 1-30 characters long, with at least one uppercase, one lowercase, and one special character.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Save user details (role and username) to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Generate Customer ID if the user is a customer
        if (role === 'Customer' && !localStorage.getItem('customerId')) {
            const customerId = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
            localStorage.setItem('customerId', customerId);
        }

        // Redirect to the homepage
        window.location.href = "homepage.html"; // Corrected "Window" to "window"
    }
}

