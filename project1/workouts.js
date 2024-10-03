document.addEventListener('DOMContentLoaded', () => {
    const workoutButtons = document.querySelectorAll('.workout-btn');
    const displaySection = document.querySelector('#exercise-list');

    workoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const workoutType = button.getAttribute('data-workout');

            // Fetch and display the exercises
            fetch('workouts.txt')
                .then(response => response.text())
                .then(data => {
                    const exercises = parseExercises(data, workoutType);
                    displayExercises(exercises, workoutType);
                })
                .catch(error => console.error('Error fetching workouts:', error));
        });
    });

    // Function to parse the workout data
    function parseExercises(data, workoutType) {
        const regex = new RegExp(`\\[${workoutType}\\]([\\s\\S]*?)(\\[|$)`, 'g');
        const match = regex.exec(data);
        return match ? match[1].trim().split('\n') : [];
    }

    // Function to display exercises in the DOM
    function displayExercises(exercises, workoutType) {
        displaySection.innerHTML = ''; // Clear previous exercises

        // Create and append the title for the workout
        const h4 = document.createElement('h4');
        h4.textContent = `${workoutType} - Recommended Exercises`;
        displaySection.appendChild(h4);

        // Create and append the exercises
        const ul = document.createElement('ul');
        exercises.forEach(exercise => {
            const li = document.createElement('li');
            li.textContent = exercise;
            ul.appendChild(li);
        });

        displaySection.appendChild(ul); // Append the list to the container
    }
});
