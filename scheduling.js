document.addEventListener('DOMContentLoaded', function () {
    const searchBookingIdInput = document.getElementById('searchBookingId');
    const searchButton = document.getElementById('searchButton');
    const schedulingForm = document.getElementById('schedulingForm');
    const bookingIdElement = document.getElementById('bookingId');
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeInput = document.getElementById('pickupTime');
    const saveScheduleButton = document.getElementById('saveSchedule');
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

        if (enteredBookingId === savedBookingId) {
            // Populate booking ID
            bookingIdElement.textContent = enteredBookingId;

            // Show pre-saved pickup details if available
            const savedPickupDate = localStorage.getItem('pickupDate');
            const savedPickupTime = localStorage.getItem('pickupTime');
            if (savedPickupDate) pickupDateInput.value = savedPickupDate;
            if (savedPickupTime) pickupTimeInput.value = savedPickupTime;

            schedulingForm.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            schedulingForm.style.display = 'none';
            errorMessage.style.display = 'block';
        }
    });

    // Save pickup schedule
    saveScheduleButton.addEventListener('click', function () {
        const pickupDate = pickupDateInput.value;
        const pickupTime = pickupTimeInput.value;

        if (!pickupDate || !pickupTime) {
            alert('Please select both a pickup date and time.');
            return;
        }

        // Save to localStorage
        localStorage.setItem('pickupDate', pickupDate);
        localStorage.setItem('pickupTime', pickupTime);

        // Display confirmation message
        confirmationMessage.style.display = 'block';

        // Optionally hide the message after a few seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);
    });
});
