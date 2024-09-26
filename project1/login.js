
function displayMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message'); 
    messageDiv.textContent = message; 
    messageDiv.style.color = isSuccess ? 'green' : 'red';
    messageDiv.style.display = 'block'; 
}


document.getElementById('Go').addEventListener('click', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    if (username && password) {
       
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {
                displayMessage('¡Login succesfully!', true); 
                setTimeout(() => {
                    window.location.href = 'web.html'; // Redireccionar
                }, 2000);
            } else {
                displayMessage('User or password incorrects.', false); // Mostrar mensaje de error
            }
        })
        .catch(err => {
            console.error('Error:', err); // Mostrar error en la consola
            displayMessage('Error in the conexion with the server.', false); // Mostrar mensaje de error
        });
    } else {
        displayMessage('Ples, fill in the fields.', false); // Mensaje si los campos están vacíos
    }
});
