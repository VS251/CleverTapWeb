function showSuccess(message = 'Action completed successfully!') {
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

function debugLog(action, data) {
    console.log(`CleverTap ${action} attempted:`, data);
    console.log('CleverTap Debug ID:', clevertap.getCleverTapID());
}

function getUserData() {
    const data = {
        "Site": {
            "Name": document.getElementById('name').value,
            "Email": document.getElementById('email').value,
            "Phone": document.getElementById('phone').value,
            "DOB": new Date(document.getElementById('dob').value)
        }
    };
    console.log('User Data Prepared:', data);
    return data;
}

function handleLogin() {
    if (validateForm()) {
        const userData = getUserData();
        console.log('Attempting Login Push...');
        clevertap.onUserLogin.push(userData);
        debugLog('onUserLogin', userData);
        
        console.log('CleverTap Object Status:', {
            'clevertap exists': !!clevertap,
            'onUserLogin exists': !!clevertap.onUserLogin,
            'profile exists': !!clevertap.profile,
            'event exists': !!clevertap.event
        });
        
        showSuccess('Login successful!');
    }
}

function handleProfilePush() {
    if (validateForm()) {
        const userData = getUserData();
        console.log('Attempting Profile Push...');
        clevertap.profile.push(userData);
        debugLog('profile', userData);
        showSuccess('Profile updated successfully!');
    }
}

function handlePushNotification() {
    const notifData = {
        "titleText": 'Would you like to receive Push Notifications?',
        "bodyText": 'We promise to only send you relevant content and give you updates on your transactions',
        "okButtonText": 'Sign me up!',
        "rejectButtonText": 'No thanks',
        "askAgainTimeInSeconds": 5,
        "okButtonColor": '#f28046'
    };
    console.log('Attempting Push Notification...');
    clevertap.notifications.push(notifData);
    debugLog('notifications', notifData);
}

function handleEventPush() {
    if (validateForm()) {
        const eventData = {
            "Product name": "Casio Chronograph Watch",
            "Category": "Mens Accessories",
            "Price": 59.99,
            "Date": new Date(),
        };
        console.log('Attempting Event Push...');
        clevertap.event.push("Product Viewed", eventData);
        debugLog('event', eventData);
        showSuccess('Event raised successfully!');
    }
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;

    if (!name || !email || !phone || !dob) {
        alert('Please fill in all fields');
        return false;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!phone.match(/^\+?\d{10,}$/)) {
        alert('Please enter a valid phone number with country code');
        return false;
    }

    return true;
}

window.addEventListener('load', function() {
    console.log('Page loaded, checking CleverTap initialization...');
    if (clevertap && clevertap.getCleverTapID) {
        console.log('CleverTap initialized with ID:', clevertap.getCleverTapID());
    } else {
        console.log('CleverTap not properly initialized');
    }
});