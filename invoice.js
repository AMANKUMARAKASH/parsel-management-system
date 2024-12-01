document.addEventListener('DOMContentLoaded', function () {
    // Retrieve data from localStorage
    const customerName = localStorage.getItem('username');
    const customerAddress = localStorage.getItem('senderAddress');
    const customerMobile = localStorage.getItem('senderMobile');
    
    const bookingId = localStorage.getItem('bookingId'); // You can set this while booking (generate a unique ID)
    const weight = localStorage.getItem('weight');
    const packingOption = localStorage.getItem('packingOption');
    const deliveryOption = localStorage.getItem('deliveryOption');
    const pickupDate = localStorage.getItem('pickupDate');
    const deliveryDate = localStorage.getItem('deliveryDate');
    const cost = localStorage.getItem('calculatedCost');
    const insurance = localStorage.getItem('insurance') === 'true' ? 200 : 0; // assuming insurance is checked

    // Display the customer details
    document.getElementById('customerName').textContent = customerName;
    document.getElementById('customerAddress').textContent = customerAddress;
    document.getElementById('customerMobile').textContent = customerMobile;

    // Display the booking details
    document.getElementById('bookingId').textContent = bookingId || 'Not Available';
    document.getElementById('bookingWeight').textContent = weight;
    document.getElementById('packingOption').textContent = packingOption;
    document.getElementById('deliveryOption').textContent = deliveryOption;
    document.getElementById('pickupDate').textContent = pickupDate;
    document.getElementById('deliveryDate').textContent = deliveryDate;

    // Display the cost summary
    document.getElementById('baseCost').textContent = cost;
    document.getElementById('insuranceCost').textContent = insurance;
    document.getElementById('totalCost').textContent = parseInt(cost) + insurance;

    setTimeout(function () {
        alert("Payment completed successfully!");
        window.location.href = 'homepage.html';  // Redirect to the homepage
    }, 10000);
});

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html'; // Redirect to login page after logout
}
