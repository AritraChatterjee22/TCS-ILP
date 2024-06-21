// Other functions

let bookings = []; // Array to store booking history
let currentPage = 1;
const rowsPerPage = 5;

// Function to show the registration form
function showRegister() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'block';
}

// Function to show the login form
function showLogin() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('ack-register-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}

// Function to show the service selection page
function showServicePage() {
    document.getElementById('service-page').style.display = 'block';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('ack-booking-page').style.display = 'none';
    document.getElementById('booking-form-page').style.display = 'none';
    document.getElementById('history-page').style.display = 'none';
    document.getElementById('history-button').style.display = 'block'; // Show history button after login
}

// Function to show specific service categories
function showService(service) {
    document.getElementById('service-page').style.display = 'none';
    if (service === 'AC') {
        document.getElementById('ac-service-page').style.display = 'block';
    } else if (service === 'Cleaning') {
        document.getElementById('cleaning-service-page').style.display = 'block';
    } else if (service === 'Vehicle') {
        document.getElementById('vehicle-service-page').style.display = 'block';
    } else if (service === 'Pickup') {
        document.getElementById('pickup-service-page').style.display = 'block';
    }
}

// Function to show specific sub-services within a category
function showSubService(service, category) {
    document.getElementById(`${category}-service-page`).style.display = 'none';
    document.getElementById('booking-form-page').style.display = 'block';
    document.getElementById('booking-title').innerText = service;
}

// Function to register a new user
function registerUser() {
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Simulating user ID generation (random number)
    const userId = 'USER' + Math.floor(Math.random() * 10000);

    document.getElementById('ack-register-message').innerText = `User ID: ${userId}, User Name: ${userName}, Email: ${email}`;
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('ack-register-page').style.display = 'block';
}

// Function to simulate user login (no actual authentication)
function loginUser() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('service-page').style.display = 'block';
    document.getElementById('history-button').style.display = 'block'; // Show history button after login
}

// Function to book a service
function bookService() {
    const serviceDate = document.getElementById('service-date').value;
    const timeSlot = document.getElementById('time-slot').value;
    const address = document.getElementById('service-address').value;
    const vendor = document.getElementById('vendor').value;
    const amount = document.getElementById('amount').value;

    // Simulating service ID generation (random number)
    const serviceId = 'SRV' + Math.floor(Math.random() * 10000);

    // Store booking in the bookings array
    bookings.push({
        serviceId,
        service: document.getElementById('booking-title').innerText,
        serviceDate,
        timeSlot,
        address,
        vendor,
        amount
    });

    document.getElementById('ack-booking-message').innerText = `Service ID: ${serviceId}, Vendor Name: ${vendor}, Date: ${serviceDate}, Time Slot: ${timeSlot}, Address: ${address}, Amount: ${amount}`;
    document.getElementById('booking-form-page').style.display = 'none';
    document.getElementById('ack-booking-page').style.display = 'block';
}

// Function to show the booking history page
function showHistory() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('service-page').style.display = 'none';
    document.getElementById('ack-booking-page').style.display = 'none';
    document.getElementById('booking-form-page').style.display = 'none';
    document.getElementById('history-page').style.display = 'block';

    displayBookings(currentPage);
}

// Function to display bookings with pagination
function displayBookings(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedBookings = bookings.slice(start, end);

    const tbody = document.getElementById('history-table').querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous rows

    paginatedBookings.forEach(booking => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = booking.serviceId;
        row.insertCell(1).innerText = booking.service;
        row.insertCell(2).innerText = booking.serviceDate;
        row.insertCell(3).innerText = booking.timeSlot;
        row.insertCell(4).innerText = booking.address;
        row.insertCell(5).innerText = booking.vendor;
        row.insertCell(6).innerText = booking.amount;
    });

    setupPagination();
}

// Function to set up pagination controls
function setupPagination() {
    const pageCount = Math.ceil(bookings.length / rowsPerPage);
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = ''; // Clear previous controls

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = () => {
            currentPage = i;
            displayBookings(currentPage);
        };
        if (i === currentPage) {
            button.disabled = true; // Disable current page button
        }
        paginationControls.appendChild(button);
    }
}

