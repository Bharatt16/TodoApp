import { CreateTodo } from './todo.js';
import { CreateProject, addProject, getAllProjects, createProjectFromForm } from './project.js';
import sun from './images/sun.svg';
import night from './images/night.svg';
import { clearContent } from './index.js';

let currentProject = null;

function toggleTheme(){
    const rightNav = document.querySelector('.rightNavContainer');
    
    // Create both images
    const nightImg = document.createElement('img');
    nightImg.src = night;
    nightImg.id = 'night';
    nightImg.style.cursor = 'pointer';
    
    const sunImg = document.createElement('img');
    sunImg.src = sun;
    sunImg.id = 'sun';
    sunImg.style.cursor = 'pointer';
    
    // Add night image initially
    rightNav.prepend(nightImg);
    
    // Add click event to night image
    nightImg.addEventListener('click', () => {
        nightImg.remove();
        rightNav.prepend(sunImg);
        document.body.classList.add('dark-theme');
    });
    
    // Add click event to sun image
    sunImg.addEventListener('click', () => {
        sunImg.remove();
        rightNav.prepend(nightImg);
        document.body.classList.remove('dark-theme');
    });
}

function renderTodos(project){
    currentProject = project;
    const list = document.getElementById('todo-list');
    const title = document.getElementById('project-title');
    
    // Only proceed if elements exist
    if (!list || !title) {
        console.log('Todo list elements not found');
        return;
    }
    
    list.innerHTML = '';
    title.textContent = project.name;

    project.todos.forEach((todo , index) => {
        const li = document.createElement('li');
        li.textContent = `${todo.title} - ${todo.duedate}`;
        if(todo.completed){
            li.style.textDecoration = 'line-through';
        }

        li.addEventListener('click', ()=>{
            todo.toggleComplete();
            renderTodos(currentProject);
        });

        list.appendChild(li);
    });
}

function toggleHamburger(crossImg, hamburgerImg){
    crossImg.addEventListener('click', () => {
        document.querySelector('#hamburgerMenu').style.display = 'none';
    });
    hamburgerImg.addEventListener('click', () => {
        document.querySelector('#hamburgerMenu').style.display = 'block';
    });
}

function displayProjects() {
    const projectList = document.querySelector('#project-list');
    if (!projectList) return;

    // Clear existing projects
    projectList.innerHTML = '';

    // Get all projects and display them
    const projects = getAllProjects();
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        
        // Add click event to render todos
        li.addEventListener('click', () => {
            const event = new CustomEvent('projectSelected', { detail: project });
            document.dispatchEvent(event);
        });
        
        projectList.appendChild(li);
    });
}

function updateProjectSelect() {
    const projectSelect = document.getElementById('projectSelect');
    if (!projectSelect) return;

    // Clear existing options
    projectSelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Choose a project';
    projectSelect.appendChild(defaultOption);

    // Add all projects as options
    const projects = getAllProjects();
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

function setupEventListener() {
    // Project dialog event listeners
    document.querySelector('#navbtn-1').addEventListener('click', () => {
        document.querySelector('#projectDialog').showModal();
    });
    
    document.querySelector('#projectDialog form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const project = createProjectFromForm(formData);
        
        if (project) {
            document.querySelector('#projectDialog').close();
            document.getElementById('projectName').value = '';
            // Update project options and list
            updateProjectSelect();
            displayProjects();
            // Load the project page
            clearContent();
            loadProjectPage(project);
            document.getElementById('hamburgerMenu').style.display = 'none';
        } else {
            alert('Please enter a project name');
        }
    });
    
    document.querySelector('#projectcancelBtn').addEventListener("click", () => {
        document.querySelector('#projectDialog').close();
        document.getElementById('projectName').value = '';
    });

    // Listen for project selection
    document.addEventListener('projectSelected', (e) => {
        clearContent();
        loadProjectPage(e.detail);
        document.getElementById('hamburgerMenu').style.display = 'none';
    });

    // Todo dialog event listeners
    document.querySelector('#navbtn-2').addEventListener('click', () => {
        document.querySelector('#todoDialog').showModal();
        // Update project options when todo dialog opens
        updateProjectSelect();
    });
    
    document.querySelector('#cancelBtn').addEventListener("click", () => {
        document.querySelector('#todoDialog').close();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('priority').value = '';
    });
}

function loadHome(todos = []){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="home-container">
            <h1>Home Page</h1>
            <div class="todo-list-container">
                ${todos.map(todo => `
                    <div class="todo-item" data-id="${todo.id}">
                        <div class="todo-content">
                            <h3 class="todo-title">${todo.title}</h3>
                            <p class="todo-description">${todo.description || ''}</p>
                        </div>
                        <div class="todo-meta">
                            <span class="todo-date">${todo.dueDate || 'No due date'}</span>
                            <span class="todo-priority ${todo.priority?.toLowerCase() || 'normal'}">${todo.priority || 'Normal'}</span>
                            <button class="todo-details-btn">Details</button>
                        </div>
                    </div>
                `).join('') || '<p class="no-todos">No todos yet. Add some!</p>'}
            </div>
        </div>
    `;
}

function loadThisWeek(){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h1>This Week</h1>
            <p>This is the This week page content</p>
        </div>
    `;
}

function loadUpcoming(){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h1>Upcoming</h1>
            <p>This is the Upcomming page content</p>
        </div>
    `;
}

function loadOverDue(){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h1>Over Due</h1>
            <p>This is the loadOverDue page content</p>
        </div>
    `;
}

function loadCompleted(){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h1>completed</h1>
            <p>This is the Commpleted page content</p>
        </div>
    `;
}

// Add this new function to load project page
function loadProjectPage(project) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="project-page">
            <h1>${project.name}</h1>
            <div class="todo-list-container">
                ${project.todos.length > 0 ? project.todos.map(todo => `
                    <div class="todo-item" data-id="${todo.id}">
                        <div class="todo-content">
                            <h3 class="todo-title">${todo.title}</h3>
                            <p class="todo-description">${todo.description || ''}</p>
                        </div>
                        <div class="todo-meta">
                            <span class="todo-date">${todo.duedate || 'No due date'}</span>
                            <span class="todo-priority ${todo.priority?.toLowerCase() || 'normal'}">${todo.priority || 'Normal'}</span>
                            <button class="todo-details-btn">Details</button>
                        </div>
                    </div>
                `).join('') : '<p class="no-todos">No todos in this project yet. Add some!</p>'}
            </div>
        </div>
    `;
}

// Call both functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateProjectSelect();
    displayProjects();
    // ... rest of your initialization code ...
});

export { renderTodos, setupEventListener, toggleHamburger, loadHome, loadThisWeek, loadUpcoming, loadOverDue, loadCompleted, toggleTheme, displayProjects, updateProjectSelect, loadProjectPage };