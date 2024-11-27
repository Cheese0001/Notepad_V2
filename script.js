// 1. Remember Theme and Apply
const themeToggle = document.getElementById('theme-toggle');

// Load the saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        document.querySelectorAll('button').forEach(btn => {
            btn.style.backgroundColor = savedColor;
        });
    }

    // Load Notepad content
    const savedNotes = localStorage.getItem('notepadContent');
    if (savedNotes) {
        document.getElementById('notepad').value = savedNotes;
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('selectedTheme', currentTheme);
});

// 2. Color Palette
const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        document.querySelectorAll('button').forEach(btn => {
            btn.style.backgroundColor = color;
        });
        localStorage.setItem('selectedColor', color);
    });
});

// 3. Notepad Save and Clear
const notepad = document.getElementById('notepad');
notepad.addEventListener('input', () => {
    localStorage.setItem('notepadContent', notepad.value);
});

document.getElementById('clear-notes').addEventListener('click', () => {
    notepad.value = '';
    localStorage.removeItem('notepadContent');
});

// 4. Task Manager
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

document.getElementById('add-task').addEventListener('click', () => {
    if (newTaskInput.value.trim() === '') return;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = newTaskInput.value;
    li.appendChild(span);

    // Add cross-out feature
    span.addEventListener('click', () => {
        span.classList.toggle('completed');
    });

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    newTaskInput.value = '';
});
