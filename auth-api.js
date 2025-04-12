// API endpoints
const API_URL = 'http://localhost:5000/api';

// Register new user
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store token
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error;
    }
}

// Login user
async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error;
    }
}

// Get mood-based food recommendations
async function getMoodRecommendations(mood) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/mood`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ mood })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to get recommendations');
        }

        return data.recommendations;
    } catch (error) {
        throw error;
    }
}

// Get user's mood history
async function getMoodHistory() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/history`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to get history');
        }

        return data.history;
    } catch (error) {
        throw error;
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('token');
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getMoodRecommendations,
    getMoodHistory
};