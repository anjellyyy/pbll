// Initialize users array
let users = JSON.parse(localStorage.getItem('users')) || [];
if (!Array.isArray(users)) users = [];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');

// Check authentication state
function checkAuth() {
    const currentPage = window.location.pathname.split('/').pop();
    const currentUser = getCurrentUser();

    if (currentUser && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.href = 'index.html';
        return false;
    }

    if (!currentUser && currentPage === 'index.html') {
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Get current user safely
function getCurrentUser() {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Error reading user data:", e);
        return null;
    }
}

// Login functionality
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('loginBtn');
        const spinner = document.getElementById('loginSpinner');
        const text = document.getElementById('loginText');
        const feedback = document.getElementById('loginFeedback');
        
        btn.disabled = true;
        text.classList.add('d-none');
        spinner.classList.remove('d-none');
        feedback.textContent = '';
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        } else {
            feedback.textContent = 'Invalid email or password';
            btn.disabled = false;
            text.classList.remove('d-none');
            spinner.classList.add('d-none');
        }
    });
}

// Registration functionality
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('registerBtn');
        const spinner = document.getElementById('registerSpinner');
        const text = document.getElementById('registerText');
        const feedback = document.getElementById('registerFeedback');
        
        btn.disabled = true;
        text.classList.add('d-none');
        spinner.classList.remove('d-none');
        feedback.textContent = '';
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const dailyGoal = document.getElementById('registerGoal').value;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (users.some(u => u.email === email)) {
            feedback.textContent = 'Email already registered';
            btn.disabled = false;
            text.classList.remove('d-none');
            spinner.classList.add('d-none');
            return;
        }
        
        const newUser = {
            name,
            email,
            password,
            dailyGoal: parseInt(dailyGoal),
            foodLog: [],
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300);
    });
}

// Initialize auth check
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    const currentUser = getCurrentUser();
    if (currentUser && document.getElementById('userEmail')) {
        document.getElementById('userEmail').textContent = currentUser.email;
    }
    
    document.getElementById('loader').style.display = 'none';
});
