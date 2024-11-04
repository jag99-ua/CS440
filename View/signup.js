// event listener to signup form for submit event
document.getElementById('signup-form').addEventListener('submit', function(event) {
    // prevent default form submission behavior for custom handling
    event.preventDefault();

    // retrieve username and password values from form inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // POST request to signup endpoint with username and password
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // convert username and password data to a JSON string for request body
        body: JSON.stringify({ username, password })
    })
    // handle response from server
    .then(response => response.json()) // parse as JSON
    .then(data => {
        // check if signup was successful
        if (data.success) {
            // redirect user to login page if signup is successful
            window.location.href = 'login.html';
        } else {
            // display error message if signup failed
            document.getElementById('error-message').innerText = data.message;
        }
    })
    // handle errors that occur during fetch operation
    .catch(error => console.error('Error during signup:', error));
});
