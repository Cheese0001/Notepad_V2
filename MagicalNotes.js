// MagicalNotes.js

// Load saved templates from localStorage
let templates = JSON.parse(localStorage.getItem('templates')) || [];

// Function to save a template
function saveTemplate() {
  const templateName = prompt('Enter a name for your template:');
  if (templateName) {
    const templateContent = document.getElementById('notepad').value; // Assuming you have a notepad with id 'notepad'
    templates.push({ name: templateName, content: templateContent });
    localStorage.setItem('templates', JSON.stringify(templates)); // Save to localStorage
    renderTemplates(); // Re-render the templates
  }
}

// Function to render saved templates
function renderTemplates() {
  const templateList = document.getElementById('templateList');
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

// Function to toggle visibility of the template sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('magicalNotesSidebar');
  sidebar.style.visibility = sidebar.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

// Initialize template list and event listener for saving templates
document.addEventListener('DOMContentLoaded', () => {
  const saveTemplateButton = document.getElementById('saveTemplateButton'); // Assuming a button with id 'saveTemplateButton'
  const sidebarToggleButton = document.getElementById('toggleSidebarButton'); // Button to toggle the sidebar
  
  saveTemplateButton.addEventListener('click', saveTemplate); // Listen for the save template button
  sidebarToggleButton.addEventListener('click', toggleSidebar); // Listen for the sidebar toggle button
  
  renderTemplates(); // Render existing templates when the page loads
});
