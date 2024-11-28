// Load saved templates from localStorage
const templateList = document.getElementById('templateList');
const saveTemplateButton = document.getElementById('saveTemplateButton');
let templates = JSON.parse(localStorage.getItem('templates')) || [];

// Function to render saved templates
function renderTemplates() {
  templateList.innerHTML = '';
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

// Initialize templates
renderTemplates();
