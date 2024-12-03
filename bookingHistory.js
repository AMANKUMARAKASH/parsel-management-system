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

    // Generate and display Customer ID if not already stored
    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
        customerId = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit numeric ID
        localStorage.setItem('customerId', customerId);
    }
    customerIdEl.textContent = `Customer ID: ${customerId}`;

    // Fetch booking history from localStorage
    let bookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];

    // If no booking history, create a placeholder booking and save it
    if (bookings.length === 0) {
        const initialBooking = {
            bookingId: Math.floor(100000 + Math.random() * 900000), // Random 6-digit Booking ID
            bookingDate: new Date().toLocaleDateString(),
            deliveryAddress: '123 Delivery Lane, City, State, ZIP',
            receiverAddress: '789 Receiver Road, City, State, ZIP',
            amount: 500.00,
            status: 'In Transit'
        };
        bookings.push(initialBooking);
        localStorage.setItem('bookingHistory', JSON.stringify(bookings));
    }

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

    // Display the first booking if available
    if (bookings.length > 0) {
        displayBooking(currentIndex);
    } else {
        alert('No booking history available.');
    }
});
