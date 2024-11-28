// MagicalNotes.js

// Load saved templates from localStorage
const templateList = document.getElementById('templateList');
const saveTemplateButton = document.getElementById('saveTemplateButton');
let templates = JSON.parse(localStorage.getItem('templates')) || [];

// Function to render saved templates
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
    renderTemplates(); // Re-render the templates
  }
});
// Magical Notes Sidebar and Templates Logic

// Variables to reference HTML elements
const sidebar = document.getElementById("magicalNotesSidebar");
const addTemplateBtn = document.getElementById("addTemplateBtn");
const templateList = document.getElementById("templateList");
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

// Add template functionality
const templates = [
  "Meeting Notes Template",
  "Project To-Do List",
  "Personal Journal Template"
];

// Display templates in the sidebar
function renderTemplates() {
  templateList.innerHTML = '';
  templates.forEach((template, index) => {
    const templateDiv = document.createElement('div');
    templateDiv.textContent = template;
    templateDiv.addEventListener('click', () => {
      notepad.value = `Template: ${template}\n\n[Start writing your notes here...]`;
      toggleSidebar(); // Hide sidebar after template is selected
    });
    templateList.appendChild(templateDiv);
  });
}

// Initialize sidebar with templates
renderTemplates();
