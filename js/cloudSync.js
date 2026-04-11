/**
 * cloudSync.js
 * Handles Google Identity Services (GSI) and Cloud Synchronization via Google Sheets.
 * Uses JSONP for high reliability fetching (bypasses CORS).
 */

window.CloudSync = (() => {
    const GOOGLE_CLIENT_ID = "280084320639-lpne635i1hrblj28d5gcl43dgh1mlp6a.apps.googleusercontent.com";
    const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwZZueanfMwYjuVwqHzOU-e5jhPHPQhBafj2XlILx9HM_QT5_iG_0vZ4jFOAsLhB-Uf/exec";

    let userEmail = null;
    let unlockedDrinks = [];
    let onDataUpdateCallback = null;

    // Global listener for JSONP
    window.handleCloudData = (result) => {
        console.log("CloudSync: Received JSONP result:", result);
        if (result.success) {
            unlockedDrinks = [...new Set((result.data || []).map(name => name.trim()))];
            console.log("CloudSync: Successfully updated collection:", unlockedDrinks);
            if (onDataUpdateCallback) onDataUpdateCallback(unlockedDrinks);
        }
    };

    function init(callback) {
        onDataUpdateCallback = callback;
        const loginPrompt = document.getElementById('login-prompt-overlay');
        if (loginPrompt) loginPrompt.classList.remove('hidden');

        setTimeout(() => {
            if (typeof google !== 'undefined') {
                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse
                });
                const loginBtn = document.getElementById('google-login-btn');
                const promptBtn = document.getElementById('google-login-prompt-btn');
                if (loginBtn) google.accounts.id.renderButton(loginBtn, { theme: "outline", size: "medium", shape: "pill" });
                if (promptBtn) google.accounts.id.renderButton(promptBtn, { theme: "filled_blue", size: "large", shape: "pill", width: 250 });
            }
        }, 1000);
    }

    function handleCredentialResponse(response) {
        const payload = decodeJwtResponse(response.credential);
        userEmail = payload.email;

        const nameSpan = document.getElementById('user-name');
        const avatarImg = document.getElementById('user-avatar');
        const loginBtn = document.getElementById('google-login-btn');
        const profileEl = document.getElementById('user-profile');
        const promptOverlay = document.getElementById('login-prompt-overlay');

        if (nameSpan) nameSpan.textContent = payload.name;
        if (avatarImg) avatarImg.src = payload.picture;
        if (loginBtn) loginBtn.classList.add('hidden');
        if (profileEl) profileEl.classList.remove('hidden');
        if (promptOverlay) promptOverlay.classList.add('hidden');

        console.log("CloudSync: Logged in as", payload.name);
        fetchFromCloud();
    }

    // High Reliability Fetching using JSONP (Script Injection)
    function fetchFromCloud() {
        if (!userEmail) return;
        const cleanEmail = userEmail.trim().toLowerCase();
        console.log("CloudSync: Initiating JSONP fetch for:", cleanEmail);

        // Remove any old scripts
        const oldScript = document.getElementById('cloud-fetch-script');
        if (oldScript) oldScript.remove();

        // Create new script tag
        const script = document.createElement('script');
        script.id = 'cloud-fetch-script';
        script.src = `${GAS_WEBAPP_URL}?action=fetch&email=${encodeURIComponent(cleanEmail)}&callback=handleCloudData&t=${Date.now()}`;
        document.body.appendChild(script);
    }

    async function saveProgress(drinkName) {
        console.log("CloudSync: saveProgress called for:", drinkName);
        if (!userEmail) {
            console.warn("CloudSync: Cannot save. User is not logged in.");
            return;
        }

        try {
            console.log("CloudSync: Sending SAVE request to Google Sheets...", drinkName);
            const saveUrl = `${GAS_WEBAPP_URL}?action=save&email=${encodeURIComponent(userEmail)}&drink=${encodeURIComponent(drinkName)}`;

            // Mode no-cors is fine for one-way save
            await fetch(saveUrl, { mode: 'no-cors' });
            console.log("CloudSync: ✅ Save request SENT to Google Sheets!");
        } catch (err) {
            console.error("CloudSync: ❌ Save Error:", err);
        }

        if (!unlockedDrinks.includes(drinkName)) {
            unlockedDrinks.push(drinkName);
            if (onDataUpdateCallback) onDataUpdateCallback(unlockedDrinks);
        }
    }

    function logout() {
        userEmail = null;
        unlockedDrinks = [];
        const loginBtn = document.getElementById('google-login-btn');
        const profileEl = document.getElementById('user-profile');
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (profileEl) profileEl.classList.add('hidden');
        if (onDataUpdateCallback) onDataUpdateCallback([]);
        console.log("CloudSync: Logged out");
    }

    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    return { init, saveProgress, logout, getUnlockedDrinks: () => unlockedDrinks, getUserEmail: () => userEmail };
})();
