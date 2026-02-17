// Search Functionality
document.querySelector(".search-bar button").addEventListener("click", function() {
    let searchTerm = document.querySelector(".search-bar input").value.toLowerCase();
    let listings = document.querySelectorAll(".listing-card");

    listings.forEach(listing => {
        let title = listing.querySelector("h3").textContent.toLowerCase();
        listing.style.display = title.includes(searchTerm) ? "block" : "none";
    });
});

// Dark/Light Mode Toggle
const toggleMode = document.createElement("button");
toggleMode.textContent = "🌙 Dark Mode";
toggleMode.style.position = "fixed";
toggleMode.style.top = "10px";
toggleMode.style.right = "10px";
toggleMode.style.padding = "10px";
toggleMode.style.cursor = "pointer";
document.body.appendChild(toggleMode);

toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleMode.textContent = document.body.classList.contains("light-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Apply Light Mode Styles
const style = document.createElement("style");
style.innerHTML = `
    .light-mode {
        background-color: #fff;
        color: #000;
    }
    .light-mode .hero {
        background: url('hero-bg-light.jpg') no-repeat center center/cover;
    }
    .light-mode .vehicle-card, 
    .light-mode .listing-card, 
    .light-mode .testimonial {
        background: #f4f4f4;
        color: #000;
    }
`;
document.head.appendChild(style);

// Scroll Animations
const elementsToAnimate = document.querySelectorAll(".vehicle-card, .listing-card, .testimonial");

const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
        }
    });
}, { threshold: 0.2 });

elementsToAnimate.forEach(el => {
    el.style.transform = "translateY(50px)";
    el.style.opacity = "0";
    el.style.transition = "all 0.5s ease-in-out";
    scrollObserver.observe(el);
});

// Popup Modal Functionality
const modal = document.getElementById("vehicleModal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalPrice = document.getElementById("modal-price");
const modalMileage = document.getElementById("modal-mileage");
const modalCondition = document.getElementById("modal-condition");
const modalFuel = document.getElementById("modal-fuel");
const modalTransmission = document.getElementById("modal-transmission");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".modal-close");

// Vehicle Data with Seller Contacts
const vehicleData = {
    "2023 BMW X5": {
        mileage: "15,000 km",
        condition: "New",
        fuel: "Diesel",
        transmission: "Automatic",
        description: "Luxury SUV with advanced features and comfort.",
        sellerPhone: "+255683777200",
        sellerEmail: "kamarahj27@gmail.com",
        sellerSMS: "+255683777200"
    },
    "2022 Rolls Royce": {
        mileage: "20,000 km",
        condition: "New",
        fuel: "Petrol",
        transmission: "Manual",
        description: "High-perfomance modern car with sleek design.",
        sellerPhone: "+255683777200",
        sellerEmail: "kamarahj27@gmail.com",
        sellerSMS: "+255683777200"
    },
    "2025 Tesla Cybertruck": {
        mileage: "30,000 km",
        condition: "New",
        fuel: "Petrol",
        transmission: "Manual",
        description: "Classic muscle car with powerful engine.",
        sellerPhone: "+255683777200",
        sellerEmail: "kamarahj27@gmail.com",
        sellerSMS: "+255683777200"
    },
    "2023 Yamaha R1": {
        mileage: "20,000 km",
        condition: "New",
        fuel: "Diesel",
        transmission: "Automatic",
        description: "High-speed motorcycle for thrill seekers.",
        sellerPhone: "+255683777200",
        sellerEmail: "kamarahj27@gmail.com",
        sellerSMS: "+255683777200"
    },
    // Add more vehicles here...
};

// Open Modal on Button Click
document.querySelectorAll(".vehicle-card button, .listing-card button").forEach(button => {
    button.addEventListener("click", function() {
        let card = this.parentElement;
        let vehicleName = card.querySelector("h3").textContent;
        
        modalTitle.textContent = vehicleName;
        modalImage.src = card.querySelector("img").src;
        modalPrice.textContent = "Price: " + card.querySelector("p").textContent;

        if (vehicleData[vehicleName]) {
            modalMileage.textContent = vehicleData[vehicleName].mileage;
            modalCondition.textContent = vehicleData[vehicleName].condition;
            modalFuel.textContent = vehicleData[vehicleName].fuel;
            modalTransmission.textContent = vehicleData[vehicleName].transmission;
            modalDescription.textContent = vehicleData[vehicleName].description;
        } else {
            modalMileage.textContent = "N/A";
            modalCondition.textContent = "N/A";
            modalFuel.textContent = "N/A";
            modalTransmission.textContent = "N/A";
            modalDescription.textContent = "No details available.";
        }

        modal.style.display = "flex";
    });
});

// Close Modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
// Buy Now & Contact Seller
const buyNowBtn = document.getElementById("buy-now");
const contactSellerBtn = document.getElementById("contact-seller");

buyNowBtn.addEventListener("click", () => {
    let vehicleName = modalTitle.textContent;
    let price = modalPrice.textContent.replace("Price: ", "");
    window.location.href = "payment.html?vehicle=" + encodeURIComponent(vehicleName) + "&price=" + encodeURIComponent(price);
});






const contactPopup = document.getElementById("contact-popup");
const confirmation = document.getElementById("confirmation");
const selectedMethod = document.getElementById("selected-method");

contactSellerBtn.addEventListener("click", () => {
    contactPopup.style.display = "block";
});

// Close the popup
function closeContactPopup() {
    contactPopup.style.display = "none";
}

// Function to contact seller
function contactSeller(method) {
    let vehicleName = modalTitle.textContent;
    let price = modalPrice.textContent.replace("Price: ", "");
    let message = `Hello, I'm interested in buying the ${vehicleName} listed for ${price}.`;

    if (vehicleData[vehicleName]) {
        let phoneNumber = vehicleData[vehicleName].sellerPhone;
        let email = vehicleData[vehicleName].sellerEmail;
        let smsNumber = vehicleData[vehicleName].sellerSMS;

        if (method === "whatsapp") {
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
            selectedMethod.textContent = "WhatsApp";
        } else if (method === "email") {
            window.location.href = `mailto:${email}?subject=Inquiry about ${vehicleName}&body=${encodeURIComponent(message)}`;
            selectedMethod.textContent = "Email";
        } else if (method === "sms") {
            window.location.href = `sms:${smsNumber}?body=${encodeURIComponent(message)}`;
            selectedMethod.textContent = "SMS";
        }

        // Show confirmation
        confirmation.style.display = "block";
        setTimeout(() => {
            confirmation.style.display = "none";
        }, 3000);
    } else {
        alert("Seller contact information not available.");
    }

    closeContactPopup(); // Close popup after selection
}




// Load sound effects
const soundOpen = new Audio("sounds/success1.mp3");
const soundClose = new Audio("sounds/pop.mp3");
const soundClick = new Audio("sounds/click.mp3");
const soundCopy = new Audio("sounds/copy.mp3");
const soundHover = new Audio("sounds/hover.mp3");
const soundTyping = new Audio("sounds/typing.mp3");
const soundSuccess = new Audio("sounds/success.mp3");

// Show Popup with Sound
contactSellerBtn.addEventListener("click", () => {
    soundOpen.play();  // Play open sound
    contactPopup.style.display = "block";
});

// Close Popup with Fade-Out + Sound
function closeContactPopup() {
    soundClose.play();  // Play closing sound
    contactPopup.classList.add("fade-out");
    setTimeout(() => {
        contactPopup.style.display = "none";
        contactPopup.classList.remove("fade-out");
    }, 500);
}

// Contact Seller with Click Sound
function contactSeller(method) {
    soundClick.play();  // Play click sound

    let vehicleName = modalTitle.textContent;
    let price = modalPrice.textContent.replace("Price: ", "");
    let message = `Hello, I'm interested in buying the ${vehicleName} listed for ${price}.`;

    if (vehicleData[vehicleName]) {
        let phoneNumber = vehicleData[vehicleName].sellerPhone;
        let email = vehicleData[vehicleName].sellerEmail;
        let smsNumber = vehicleData[vehicleName].sellerSMS;

        if (method === "whatsapp") {
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
            selectedMethod.textContent = "WhatsApp";
        } else if (method === "email") {
            window.location.href = `mailto:${email}?subject=Inquiry about ${vehicleName}&body=${encodeURIComponent(message)}`;
            selectedMethod.textContent = "Email";
        } else if (method === "sms") {
            window.location.href = `sms:${smsNumber}?body=${encodeURIComponent(message)}`;
            selectedMethod.textContent = "SMS";
        }

        confirmation.style.display = "block";
        setTimeout(() => {
            confirmation.style.display = "none";
        }, 3000);
    } else {
        alert("Seller contact information not available.");
    }

    closeContactPopup();
}

// Copy Seller Contact with Copy + Success Sound
function copySellerContact() {
    let vehicleName = modalTitle.textContent;
    if (vehicleData[vehicleName]) {
        let sellerInfo = `Phone: ${vehicleData[vehicleName].sellerPhone}\nEmail: ${vehicleData[vehicleName].sellerEmail}\nSMS: ${vehicleData[vehicleName].sellerSMS}`;
        navigator.clipboard.writeText(sellerInfo).then(() => {
            soundCopy.play();  // Play copy sound
            setTimeout(() => soundSuccess.play(), 500);  // Play success sound after 0.5 sec
            alert("Seller's contact details copied!");
        }).catch(err => {
            alert("Failed to copy. Try manually.");
        });
    } else {
        alert("No contact details available.");
    }
}

// Add Hover Sound to Buttons
document.querySelectorAll(".contact-btn, .copy-btn").forEach(button => {
    button.addEventListener("mouseenter", () => {
        soundHover.play();  // Play hover sound
    });
});

// Play Typing Sound When Typing in an Input Field
document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("keydown", () => {
        soundTyping.play();  // Play typing sound
    });
});




// Show Login and Register forms
function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

// Register function
function register() {
    let name = document.getElementById('regName').value;
    let email = document.getElementById('regEmail').value;
    let password = document.getElementById('regPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! You can now log in.");
    showLogin();
}

// Login function
function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        alert("Login successful!");
        window.location.href = "Work.html"; // Redirect to portfolio page
    } else {
        alert("Invalid email or password!");
    }
}

