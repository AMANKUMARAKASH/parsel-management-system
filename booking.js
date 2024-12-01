document.addEventListener('DOMContentLoaded', function () {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    // Pre-fill sender details for the Customer
    if (role === 'Customer') {
        document.getElementById('roleSpecificTitle').textContent = 'Enter Your Booking Details';
        document.getElementById('senderName').value = username || 'John Doe'; // Example name
        document.getElementById('senderAddress').value = '123 Customer Street, City'; // Example address
        document.getElementById('senderMobile').value = '9876543210'; // Example mobile number

        // Make sender details readonly for Customers
        ['senderName', 'senderAddress', 'senderMobile'].forEach(field => {
            document.getElementById(field).readOnly = true;
        });
    } else if (role === 'Officer') {
        // Allow Officers to edit sender details
        document.getElementById('roleSpecificTitle').textContent = 'Enter Booking Details (Officer)';
        ['senderName', 'senderAddress', 'senderMobile'].forEach(field => {
            document.getElementById(field).readOnly = false;
        });
    }

    // Cost Calculation with Validation
    document.getElementById('calculateCost').addEventListener('click', function () {
        const weight = parseFloat(document.getElementById('weight').value || 0);
        const packingOption = document.getElementById('packingOption').value;
        const deliveryOption = document.getElementById('deliveryOption').value;

        // Validation
        let isValid = true;
        document.getElementById('costSummary').textContent = ""; // Clear cost summary
        document.querySelectorAll('.error').forEach(error => (error.textContent = "")); // Clear previous errors

        if (!weight || isNaN(weight) || weight <= 0) {
            document.getElementById('weightError').textContent = "Please enter a valid weight.";
            isValid = false;
        }
        if (!packingOption) {
            document.getElementById('packingOptionError').textContent = "Please select a packing option.";
            isValid = false;
        }
        if (!deliveryOption) {
            document.getElementById('deliveryOptionError').textContent = "Please select a delivery option.";
            isValid = false;
        }

        if (isValid) {
            // Calculate cost
            let cost = weight * 10; // Base cost per kg
            if (packingOption === 'eco') cost += 50;
            if (deliveryOption === 'express') cost += 100;
            if (document.getElementById('insurance').checked) cost += 200;

            document.getElementById('costSummary').textContent = `Cost: ₹${cost}`;
            localStorage.setItem('calculatedCost', cost); // Store cost in localStorage
        }
    });

    // Booking Submission with Validation
    document.getElementById('submitBooking').addEventListener('click', function () {
        const senderName = document.getElementById('senderName').value.trim();
        const senderAddress = document.getElementById('senderAddress').value.trim();
        const senderMobile = document.getElementById('senderMobile').value.trim();
        const receiverName = document.getElementById('receiverName').value.trim();
        const receiverAddress = document.getElementById('receiverAddress').value.trim();
        const receiverMobile = document.getElementById('receiverMobile').value.trim();
        const weight = document.getElementById('weight').value.trim();
        const packingOption = document.getElementById('packingOption').value;
        const deliveryOption = document.getElementById('deliveryOption').value;
        const pickupDate = document.getElementById('pickupDate').value.trim();
        const deliveryDate = document.getElementById('deliveryDate').value.trim();
        const description = document.getElementById('parcelDescription').value.trim();
        const pickupTime = document.getElementById('pickupTime').value.trim();
        const deliveryTime = document.getElementById('deliveryTime').value.trim();
        const insurance = document.getElementById('insurance').checked;

        let isValid = true;
        document.querySelectorAll('.error').forEach(error => (error.textContent = "")); // Clear previous errors

        // Field-specific validations
        function validateField(field, errorId, message) {
            if (!field) {
                document.getElementById(errorId).textContent = message;
                isValid = false;
            }
        }

        // Sender details
        validateField(senderName, 'senderNameError', 'Sender name is required.');
        validateField(senderAddress, 'senderAddressError', 'Sender address is required.');
        validateField(senderMobile, 'senderMobileError', 'Sender mobile number is required.');

        // Receiver details
        validateField(receiverName, 'receiverNameError', 'Receiver name is required.');
        validateField(receiverAddress, 'receiverAddressError', 'Receiver address is required.');
        validateField(receiverMobile, 'receiverMobileError', 'Receiver mobile number is required.');

        // Parcel details
        validateField(weight, 'weightError', 'Parcel weight is required.');
        validateField(packingOption, 'packingOptionError', 'Please select a packing option.');
        validateField(deliveryOption, 'deliveryOptionError', 'Please select a delivery option.');

        // Date validations
        const today = new Date().toISOString().split('T')[0];
        if (!pickupDate || pickupDate < today) {
            document.getElementById('pickupDateError').textContent = 'Pickup date must be today or a future date.';
            isValid = false;
        }
        if (!deliveryDate || deliveryDate < pickupDate) {
            document.getElementById('deliveryDateError').textContent =
                'Delivery date must be the same or later than the pickup date.';
            isValid = false;
        }
        if (!pickupTime) {
            document.getElementById('pickupTimeError').textContent = 'Pickup time is required.';
            isValid = false;
        }
        if (!deliveryTime) {
            document.getElementById('deliveryTimeError').textContent = 'Delivery time is required.';
            isValid = false;
        }

        if (isValid) {
            // Store each field in localStorage
            localStorage.setItem('receiverName', receiverName);
            localStorage.setItem('receiverAddress', receiverAddress);
            localStorage.setItem('receiverMobile', receiverMobile);
            localStorage.setItem('weight', weight);
            localStorage.setItem('parcelDescription', description);
            localStorage.setItem('pickupTime', pickupTime);
            localStorage.setItem('deliveryTime', deliveryTime);
            localStorage.setItem('packingOption', packingOption);
            localStorage.setItem('deliveryOption', deliveryOption);
            localStorage.setItem('insurance', insurance);
            localStorage.setItem('pickupDate', pickupDate);
            localStorage.setItem('deliveryDate', deliveryDate);

            alert('Booking submitted successfully!');
            window.location.href = 'payment.html'; // Redirect to payment page
        }
    });
});

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html';
}

