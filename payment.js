// Get vehicle details from URL parameters
const params = new URLSearchParams(window.location.search);
const vehicleName = params.get("vehicle");
const vehiclePrice = params.get("price");

// Display vehicle details
document.getElementById("vehicle-name").textContent = vehicleName;
document.getElementById("vehicle-price").textContent = vehiclePrice;

// Payment Button Click Events
document.getElementById("mpesa").addEventListener("click", () => pay("M-Pesa"));
document.getElementById("tigopesa").addEventListener("click", () => pay("Tigo Pesa"));
document.getElementById("airtelmoney").addEventListener("click", () => pay("Airtel Money"));
document.getElementById("halopesa").addEventListener("click", () => pay("HaloPesa"));
document.getElementById("paypal").addEventListener("click", () => pay("PayPal"));
document.getElementById("stripe").addEventListener("click", () => pay("Stripe"));

// Payment function
function pay(method) {
    alert(`Redirecting to ${method} payment for ${vehicleName} - ${vehiclePrice}`);
    // Here, you can add actual integration for payment
}

// Back Button
function goBack() {
    window.history.back();
}

