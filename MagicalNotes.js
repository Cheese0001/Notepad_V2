<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magical Notes</title>
    <style>
        /* Sidebar Styles */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100%;
            background-color: #f0f0f0;
            padding: 10px;
            visibility: hidden;
            transition: visibility 0.3s;
        }

        .template-item {
            padding: 8px;
            background-color: #e0e0e0;
            margin: 5px 0;
            cursor: pointer;
        }

        .template-item:hover {
            background-color: #ccc;
        }

        /* Notepad Styles */
        #notepad {
            width: 80%;
            height: 400px;
            margin: 20px;
            font-family: Arial, sans-serif;
            font-size: 13px;
            padding: 10px;
            border: 1px solid #ccc;
            resize: both;
        }
    </style>
</head>
<body>

<!-- Sidebar -->
<div id="magicalNotesSidebar" class="sidebar">
    <button id="addTemplateBtn">Add Template</button>
    <div id="templateList">
        <!-- Template list will be populated here -->
    </div>
    <button id="saveTemplateButton">Save Current Note as Template</button>
</div>

<!-- Notepad -->
<textarea id="notepad" placeholder="Write your notes here..."></textarea>

<script>
// MagicalNotes.js

// Load saved templates from localStorage
const templateList = document.getElementById('templateList');
const saveTemplateButton = document.getElementById('saveTemplateButton');
let templates = JSON.parse(localStorage.getItem('templates')) || [];

// Predefined templates
const predefinedTemplates = [
  { name: "Meeting Notes Template", content: "Template: Meeting Notes\n\n[Start writing your notes here...]" },
  { name: "Project To-Do List", content: "Template: Project To-Do List\n\n[Start writing your tasks here...]" },
  { name: "Personal Journal Template", content: "Template: Personal Journal\n\n[Start writing your journal entry here...]" }
];

// Combine predefined templates with the saved templates from localStorage
templates = [...predefinedTemplates, ...templates];

// Function to render templates in the sidebar
function renderTemplates() {
  templateList.innerHTML = ''; // Clear the current template list

  templates.forEach((template, index) => {
    const li = document.createElement('li');
    li.classList.add('template-item');
    li.textContent = template.name;
    li.addEventListener('click', () => {
      // When template is clicked, load it into the notepad
      document.getElementById('notepad').value = template.content;
    });
    templateList.appendChild(li);
  });
}

// Save current note as template
saveTemplateButton.addEventListener('click', () => {
  const templateName = prompt('Enter a name for your template:');
  if (templateName) {
    const templateContent = document.getElementById('notepad').value;
    templates.push({ name: templateName, content: templateContent });
    localStorage.setItem('templates', JSON.stringify(templates)); // Save to localStorage
    renderTemplates(); // Re-render the templates with the newly saved one
  }
});

// Sidebar and template functionality

const sidebar = document.getElementById("magicalNotesSidebar");
const addTemplateBtn = document.getElementById("addTemplateBtn");
const notepad = document.getElementById("notepad");

// Toggle sidebar visibility
let isSidebarVisible = false;
function toggleSidebar() {
  sidebar.style.visibility = isSidebarVisible ? 'hidden' : 'visible';
  isSidebarVisible = !isSidebarVisible;
}

// Open sidebar on button click
addTemplateBtn.addEventListener("click", () => {
  toggleSidebar();
});

// Initialize sidebar with templates
renderTemplates();
</script>

</body>
</html>
