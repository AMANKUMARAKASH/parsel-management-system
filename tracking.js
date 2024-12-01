document.addEventListener('DOMContentLoaded', function () {
    const role = localStorage.getItem('role'); // Fetch user role from localStorage
    const customerSection = document.getElementById('customerSection');
    const officerSection = document.getElementById('officerSection');

    // Dynamically display sections based on role
    if (role === 'Customer') {
        customerSection.style.display = 'block';
    } else if (role === 'Officer') {
        officerSection.style.display = 'block';
    }

    // Customer Elements
    const searchBtn = document.getElementById('searchBtn');
    const searchBookingId = document.getElementById('searchBookingId');
    const statusDisplay = document.getElementById('statusDisplay');
    const errorMessage = document.getElementById('errorMessage');
    const bookingDetails = document.getElementById('bookingDetails');
    const parcelStatus = document.getElementById('parcelStatus');

    // Officer Elements
    const searchOfficerBtn = document.getElementById('searchOfficerBtn');
    const searchOfficerId = document.getElementById('searchOfficerId');
    const allParcelDetails = document.getElementById('allParcelDetails');

    // Fetch saved data from localStorage
    const savedBookingId = localStorage.getItem('bookingId'); // Booking ID stored during booking
    const savedCustomerId = localStorage.getItem('username'); // Customer ID (assume username)
    const savedDeliveryDate = localStorage.getItem('deliveryDate'); // Delivery date from booking
    const savedDeliveryTime = localStorage.getItem('deliveryTime'); // Delivery time from booking

    // Customer: Track Parcel by Booking ID
    searchBtn.addEventListener('click', function () {
        const enteredBookingId = searchBookingId.value.trim();

        if (enteredBookingId === savedBookingId) {
            // Get current date and time
            const currentDate = new Date();
            const deliveryDateTime = new Date(`${savedDeliveryDate}T${savedDeliveryTime}`);

            // Determine status
            const status = currentDate >= deliveryDateTime ? 'Delivered' : 'In Transit';

            // Display booking details and status
            bookingDetails.textContent = `Booking ID: ${enteredBookingId}`;
            parcelStatus.textContent = `Status: ${status}`;
            statusDisplay.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            // Show error if Booking ID is invalid
            errorMessage.style.display = 'block';
            statusDisplay.style.display = 'none';
        }
    });

    // Officer: Search Parcel by Customer ID or Booking ID
    searchOfficerBtn.addEventListener('click', function () {
        const searchText = searchOfficerId.value.trim();

        if (searchText === savedBookingId || searchText === savedCustomerId) {
            // Example: Display parcel details (extend as needed)
            allParcelDetails.innerHTML = `
                <p>Booking ID: ${savedBookingId}</p>
                <p>Customer ID: ${savedCustomerId}</p>
                <p>Delivery Date: ${savedDeliveryDate}</p>
                <p>Delivery Time: ${savedDeliveryTime}</p>
                <p>Status: ${new Date() >= new Date(`${savedDeliveryDate}T${savedDeliveryTime}`) ? 'Delivered' : 'In Transit'}</p>
            `;
        } else {
            // Show error message for unmatched entries
            allParcelDetails.innerHTML = '<p>No matching parcels found.</p>';
        }
    });
});
