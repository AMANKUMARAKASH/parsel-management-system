document.addEventListener('DOMContentLoaded', function () {
    const searchBookingIdInput = document.getElementById('searchBookingId');
    const searchButton = document.getElementById('searchButton');
    const deliveryForm = document.getElementById('deliveryForm');
    const bookingIdElement = document.getElementById('bookingId');
    const currentStatusElement = document.getElementById('currentStatus');
    const deliveryStatusSelect = document.getElementById('deliveryStatus');
    const updateButton = document.getElementById('updateButton');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Check user role from localStorage
    const userRole = localStorage.getItem('role'); // 'Customer' or 'Officer'

    if (userRole !== 'Officer') {
        // Redirect to home page if the user is not an officer
        alert('Access Denied: This page is only accessible to officers.');
        window.location.href = 'homepage.html';
        return;
    }

    // Search functionality
    searchButton.addEventListener('click', function () {
        const enteredBookingId = searchBookingIdInput.value.trim();
        const savedBookingId = localStorage.getItem('bookingId'); // Simulating stored booking ID
        const savedStatus = localStorage.getItem('parcelStatus') || 'In Transit'; // Default to 'In Transit'

        if (enteredBookingId === savedBookingId) {
            // Populate booking ID and current status
            bookingIdElement.textContent = enteredBookingId;
            currentStatusElement.textContent = savedStatus;

            // Set the current status in the dropdown
            deliveryStatusSelect.value = savedStatus;

            deliveryForm.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            deliveryForm.style.display = 'none';
            errorMessage.style.display = 'block';
        }
    });

    // Update delivery status
    updateButton.addEventListener('click', function () {
        const updatedStatus = deliveryStatusSelect.value;

        // Save the updated status to localStorage
        localStorage.setItem('parcelStatus', updatedStatus);

        // Display confirmation message
        confirmationMessage.style.display = 'block';

        // Optionally hide the message after a few seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);
    });
});
