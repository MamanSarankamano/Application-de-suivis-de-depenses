// API Configuration
const API_BASE_URL = 'http://127.0.0.1:5000';

// Toast Notification System
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
    }, 4000);
}

// API Request helper
async function apiRequest(endpoint, options = {}, data = null) {
    const token = getAuthToken();

    if (typeof options === 'string') {
        const method = options;
        options = {
            method: method,
            ...(data && { body: JSON.stringify(data) })
        };
    }

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);

        if (response.status === 401) {
            const refreshed = await refreshToken();
            if (refreshed) {
                mergedOptions.headers['Authorization'] = `Bearer ${getAuthToken()}`;
                const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
                return await retryResponse.json();
            } else {
                logout();
                throw new Error('Session expirée. Veuillez vous reconnecter.');
            }
        }

        const result = await response.json();

        if (!response.ok) {
            const errorMsg = result.msg || 'Une erreur est survenue';
            showToast(errorMsg, 'error');
            throw new Error(errorMsg);
        }

        return result;
    } catch (error) {
        console.error('API Request Error:', error);
        if (error.message !== 'Session expirée. Veuillez vous reconnecter.') {
            showToast("Problème de connexion au serveur", 'error');
        }
        throw error;
    }
}

// Get auth token
function getAuthToken() {
    return localStorage.getItem('access_token');
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is authenticated
function checkAuth() {
    const token = getAuthToken();
    const publicPages = ['login.html', 'register.html', 'index.html', ''];
    const pathParts = window.location.pathname.split('/');
    const currentPage = pathParts.pop() || '';

    const isPublicPage = publicPages.includes(currentPage);

    if (!token && !isPublicPage) {
        window.location.href = 'login.html';
        return false;
    }

    // Special case: if on login/register and already logged in, go to dashboard
    if (token && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.href = 'dashboard.html';
        return false;
    }

    return true;
}

// Refresh access token
async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only run UI updates if we are NOT on a public page (or check specifically for elements)
    // But it's safe to check if elements exist.

    try {
        const user = getCurrentUser();
        if (user) {
            // Update user display if element exists
            const userDisplay = document.getElementById('userDisplay');
            if (userDisplay) {
                userDisplay.textContent = user.username;
            }

            const userAvatar = document.getElementById('userAvatar');
            if (userAvatar) {
                userAvatar.textContent = user.username.charAt(0).toUpperCase();
            }
        }
    } catch (e) {
        console.error("Error updating UI with user info:", e);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { apiRequest, checkAuth, logout, getAuthToken, getCurrentUser };
}
