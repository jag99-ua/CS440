function displayMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message'); 
    messageDiv.textContent = message; 
    messageDiv.style.color = isSuccess ? 'green' : 'red';
    messageDiv.style.display = 'block'; 
}

// event listener for login form submission 
document.getElementById('loginForm').addEventListener('submit', function(e) {

    // prevent default form submission behavior
    e.preventDefault(); 

    // retrieve username and password values from form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // send POST request to login endpoint with username and password
    fetch('/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    // handle response from server
    .then(response => response.json())
    .then(data => {
        // display success or error message based on result
        displayMessage(data.success ? 'Login successful! Redirecting...' : data.message, data.success);
        // if successful login, redirect to another page after a delay
        if (data.success) {
            setTimeout(() => {
                // change current page 
                window.location.href = 'web.html';
            }, 2000);
        }
    })
    // handle any errors that occur during fetch operation 
    .catch(error => {
        console.error('Error:', error);
        displayMessage('An error occurred during login.', false);
    });
});

