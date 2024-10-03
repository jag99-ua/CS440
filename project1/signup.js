document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch the database (simulated using fetch API)
    fetch('database.txt')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n').map(line => line.split('/')[0]); // Extract usernames
            if (users.includes(username)) {
                document.getElementById('error-message').innerText = 'Username already exists.';
            } else {
                // Add the new user
                addUserToDatabase(username, password);
            }
        })
        .catch(error => console.error('Error fetching the database:', error));
});

// Function to add the new user to the database
function addUserToDatabase(username, password) {
    const newUser = `${username}/${password}\n`;

    // Use fetch POST method to simulate appending to database.txt
    fetch('database.txt', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: newUser
    })
    .then(() => {
        // Redirect to login page on successful registration
        window.location.href = 'login.html';
    })
    .catch(error => console.error('Error saving new user:', error));
}
