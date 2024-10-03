
function displayMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message'); 
    messageDiv.textContent = message; 
    messageDiv.style.color = isSuccess ? 'green' : 'red';
    messageDiv.style.display = 'block'; 
}


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.innerText = 'Login successful! Redirecting...';
            messageDiv.style.color = 'green'; 
            setTimeout(() => {
                window.location.href = 'web.html';
            }, 2000);
        } else {
            messageDiv.innerText = data.message;
            messageDiv.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred during login.';
        document.getElementById('message').style.color = 'red';
    });
});

