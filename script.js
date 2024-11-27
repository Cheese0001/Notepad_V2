// Theme toggle and persistence
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add("dark-theme");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    // Save theme to localStorage
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}); 
 });

        // Timezone Update Functionality
        function updateTimezones() {
            const now = new Date();
            document.getElementById('timezone-pacific').textContent = `Pacific Time: ${now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' })}`;
            document.getElementById('timezone-mountain').textContent = `Mountain Time: ${now.toLocaleTimeString('en-US', { timeZone: 'America/Denver' })}`;
            document.getElementById('timezone-central').textContent = `Central Time: ${now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })}`;
            document.getElementById('timezone-eastern').textContent = `Eastern Time: ${now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}`;
            document.getElementById('timezone-philippines').textContent = `Philippines Time: ${now.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' })}`;

            // Store timezones in localStorage
            const timezones = {
                pacific: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }),
                mountain: now.toLocaleTimeString('en-US', { timeZone: 'America/Denver' }),
                central: now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' }),
                eastern: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }),
                philippines: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' })
            };
            localStorage.setItem('timezones', JSON.stringify(timezones));
        }

        // Retrieve stored timezones on page load
        const storedTimezones = JSON.parse(localStorage.getItem('timezones'));
        if (storedTimezones) {
            document.getElementById('timezone-pacific').textContent = `Pacific Time: ${storedTimezones.pacific}`;
            document.getElementById('timezone-mountain').textContent = `Mountain Time: ${storedTimezones.mountain}`;
            document.getElementById('timezone-central').textContent = `Central Time: ${storedTimezones.central}`;
            document.getElementById('timezone-eastern').textContent = `Eastern Time: ${storedTimezones.eastern}`;
            document.getElementById('timezone-philippines').textContent = `Philippines Time: ${storedTimezones.philippines}`;
        }

        setInterval(updateTimezones, 1000);
        updateTimezones(); // Initial update

// Notepad Persistence
const notepad = document.getElementById('notepad');

// Load notes from localStorage if available
const savedNotes = localStorage.getItem('notepad');
if (savedNotes) {
    notepad.value = savedNotes;
}

// Save notes to localStorage
notepad.addEventListener('input', () => {
    localStorage.setItem('notepad', notepad.value);
});

// Font size control for notepad
const increaseFontButton = document.getElementById('increase-font');
const decreaseFontButton = document.getElementById('decrease-font');

increaseFontButton.addEventListener('click', () => {
    let currentFontSize = parseInt(window.getComputedStyle(notepad).fontSize);
    notepad.style.fontSize = (currentFontSize + 2) + 'px';
});

decreaseFontButton.addEventListener('click', () => {
    let currentFontSize = parseInt(window.getComputedStyle(notepad).fontSize);
    notepad.style.fontSize = (currentFontSize - 2) + 'px';
});

// Clear Notepad
document.getElementById('clear-notes').addEventListener('click', () => {
    notepad.value = '';
    localStorage.removeItem('notepad');
});

// Task Manager Persistence
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const clearTasksButton = document.getElementById('clear-tasks');

// Load tasks from localStorage if available
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => {
    const taskItem = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskItem);
});

// Add new task
addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const taskItem = createTaskElement(taskText, false);
        taskList.appendChild(taskItem);
        newTaskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }
});

// Delete task functionality
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
        saveTasks();
    }
});

// Toggle task completion
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-text')) {
        e.target.classList.toggle('completed');
        saveTasks();
    }
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const taskCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Helper function to create task element
function createTaskElement(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<span class="task-text ${completed ? 'completed' : ''}" contenteditable="true">${taskText}</span><button class="delete-task">Delete</button>`;
    return taskItem;
}
