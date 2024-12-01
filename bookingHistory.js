document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const customerIdEl = document.getElementById('customerId');
    const bookingIdEl = document.getElementById('bookingId');
    const bookingDateEl = document.getElementById('bookingDate');
    const deliveryAddressEl = document.getElementById('deliveryAddress');
    const receiverAddressEl = document.getElementById('receiverAddress');
    const amountEl = document.getElementById('amount');
    const statusEl = document.getElementById('status');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Fetch username and display welcome message
    const username = localStorage.getItem('username') || 'User';
    welcomeMessage.textContent = `Welcome, ${username}`;

    const customerId = localStorage.getItem('customerId');
    customerIdEl.textContent = `Customer ID: ${customerId}`;

    // Booking history data (retrieved from localStorage as an example)
    const bookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];

    let currentIndex = 0;

    // Function to display a booking
    function displayBooking(index) {
        if (bookings.length > 0) {
            const booking = bookings[index];
            bookingIdEl.textContent = `Booking ID: ${booking.bookingId}`;
            bookingDateEl.textContent = `Booking Date: ${booking.bookingDate}`;
            deliveryAddressEl.textContent = `Delivery Address: ${booking.deliveryAddress}`;
            receiverAddressEl.textContent = `Receiver Address: ${booking.receiverAddress}`;
            amountEl.textContent = `Amount: ₹${booking.amount}`;
            statusEl.textContent = `Status: ${booking.status}`;
        }
        updateNavigationButtons();
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === bookings.length - 1;
    }

    // Add event listeners for navigation
    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            displayBooking(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < bookings.length - 1) {
            currentIndex++;
            displayBooking(currentIndex);
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'login.html';
    });

    // Display first booking if available
    if (bookings.length > 0) {
        displayBooking(currentIndex);
    } else {
        alert('No booking history available.');
    }
});
