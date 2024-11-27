// Toggle dark mode and light mode
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const colorPaletteContainer = document.getElementById('color-palette-container');

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    colorPaletteContainer.classList.toggle('show', body.classList.contains('dark-theme'));
});

// Color palette functionality
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-color');
        document.querySelectorAll('button').forEach(btn => {
            btn.style.backgroundColor = selectedColor;
        });
    });
});

// Notepad functionality with local storage
const notepad = document.getElementById('notepad');
const clearNotesButton = document.getElementById('clear-notes');

notepad.addEventListener('input', () => {
    localStorage.setItem('notepadContent', notepad.value);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
        notepad.value = savedContent;
    }
});

clearNotesButton.addEventListener('click', () => {
    notepad.value = '';
    localStorage.removeItem('notepadContent');
});

// Font size adjustment
const fontSizeInput = document.getElementById('font-size');
fontSizeInput.addEventListener('input', () => {
    notepad.style.fontSize = `${fontSizeInput.value}px`;
});

// Task Manager functionality
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');

document.getElementById('add-task').addEventListener('click', () => {
    if (newTaskInput.value.trim() !== '') {
        const taskItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = newTaskInput.value;
        taskText.classList.add('task-text');

        const checkButton = document.createElement('button');
        checkButton.textContent = '✓';
        checkButton.addEventListener('click', () => {
            taskText.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(checkButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        newTaskInput.value = '';
        saveTasks();
    }
});

clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Load saved tasks from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.classList.add('task-text');
            if (task.completed) {
                taskText.classList.add('completed');
            }

            const checkButton = document.createElement('button');
            checkButton.textContent = '✓';
            checkButton.addEventListener('click', () => {
                taskText.classList.toggle('completed');
                saveTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                saveTasks();
            });

            taskItem.appendChild(taskText);
            taskItem.appendChild(checkButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    }
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text');
        tasks.push({
            text: taskText.textContent,
            completed: taskText.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
