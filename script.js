document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToDOM(task);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.parentElement.dataset.id;
            tasks = tasks.filter(task => task.id != id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            e.target.parentElement.remove();
        }

        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const id = e.target.parentElement.dataset.id;
            const task = tasks.find(task => task.id == id);
            task.completed = e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            e.target.parentElement.classList.toggle('completed');
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(li);
    }
});