// presentation/workout.js

document.addEventListener('DOMContentLoaded', () => {
    const workoutButtons = document.querySelectorAll('.workout-btn');
    const displaySection = document.querySelector('#exercise-list');


    workoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const workoutType = button.getAttribute('data-workout');
            
            fetch(`/workouts?type=${encodeURIComponent(workoutType)}`)

                .then(response => response.json())
                .then(data => {
                    displayExercises(data.exercises, workoutType);
                })
                .catch(error => console.error('Error fetching workouts:', error));
                
        });
    });

    function displayExercises(exercises, workoutType) {
        displaySection.innerHTML = '';

        const h4 = document.createElement('h4');
        h4.textContent = `${workoutType} - Recommended Exercises`;
        displaySection.appendChild(h4);

        const ul = document.createElement('ul');
        exercises.forEach(exercise => {
            const li = document.createElement('li');
            li.textContent = exercise;
            ul.appendChild(li);
        });

        displaySection.appendChild(ul);
    }
});
