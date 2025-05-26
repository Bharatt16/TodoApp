import { Todo, createTodo } from './todo.js';
import { Project, getAllProjects, createProject, getAlltodos, initializeDefaultProjects } from './project.js';
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
        
        // Add click event to load the project
        li.addEventListener('click', () => {
            loadProject(project);
            // Close hamburger menu if it's open
            document.getElementById('hamburgerMenu').style.display = 'none';
        });
        
        projectList.appendChild(li);
    });
}

function updateProjectSelect() {
    const select = document.getElementById('projectSelect');
    select.innerHTML = '<option value="">Choose a project</option>';
    
    getAllProjects().forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.textContent = project.name;
        select.appendChild(option);
    });
}

function setupEventListeners() {
    // Project creation
    document.querySelector('#navbtn-1').addEventListener('click', () => {
        document.querySelector('#projectDialog').showModal();
    });

    // Add cancel button listener for project dialog
    document.querySelector('#projectcancelBtn').addEventListener('click', () => {
        document.querySelector('#projectDialog').close();
    });

    document.querySelector('#projectDialog form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.projectName.value;
        if (name) {
            const project = createProject(name);
            document.querySelector('#projectDialog').close();
            e.target.reset();
            updateProjectList();
            loadProject(project);
        }
    });

    // Todo creation
    document.querySelector('#navbtn-2').addEventListener('click', () => {
        document.querySelector('#todoDialog').showModal();
        updateProjectSelect();
    });

    // Add cancel button listener for todo dialog
    document.querySelector('#cancelBtn').addEventListener('click', () => {
        document.querySelector('#todoDialog').close();
    });

    document.querySelector('#todoDialog form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = e.target.dueDate.value;
        const priority = e.target.priority.value;
        const projectName = e.target.projectSelect.value;

        const project = getAllProjects().find(p => p.name === projectName);
        if (project) {
            const todo = createTodo(title, description, dueDate, priority);
            project.addTodo(todo);
            document.querySelector('#todoDialog').close();
            e.target.reset();
            if (currentProject === project) {
                loadProject(project);
            }
        }
    });
}

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';
    
    getAllProjects().forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', () => loadProject(project));
        projectList.appendChild(li);
    });
}

function loadProject(project) {
    if (!project) return;
    
    currentProject = project;
    const content = document.getElementById('content');
    
    content.innerHTML = `
        <div class="project-header">
            <h2>${project.name}</h2>
            <button class="add-todo-btn" onclick="document.querySelector('#todoDialog').showModal()">
                Add Todo
            </button>
        </div>
        <div class="todo-list">
            ${project.todos.map((todo, index) => `
                <div class="todo-item ${todo.completed ? 'completed' : ''}" data-index="${index}">
                    <div class="todo-content">
                        <div class="todo-header">
                            <h3>${todo.title}</h3>
                            <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                        </div>
                        <p class="todo-description">${todo.description}</p>
                        <div class="todo-footer">
                            <span class="due-date">
                                <i class="far fa-calendar"></i>
                                ${new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                            <div class="todo-actions">
                                <button class="toggle-btn ${todo.completed ? 'completed' : ''}" data-index="${index}">
                                    ${todo.completed ? '✓' : '○'}
                                </button>
                                <button class="delete-btn" data-index="${index}">×</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('') || '<p class="no-todos">No todos yet. Add some!</p>'}
        </div>
    `;

    // Add event listeners to todo buttons
    content.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.dataset.index);
            project.todos[index].toggleComplete();
            loadProject(project);
        });
    });

    content.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.dataset.index);
            project.deleteTodo(index);
            loadProject(project);
        });
    });
}

function loadHome() {
    const content = document.getElementById('content');
    const allProjects = getAllProjects();
    const allTodos = getAlltodos().filter(todo => !todo.completed);
    
    content.innerHTML = `
        <div class="home-container">
            <h1>All Active Todos</h1>
            <div class="todo-list">
                ${allTodos.map(todo => {
                    // Find which project this todo belongs to
                    const project = allProjects.find(p => p.todos.includes(todo));
                    return `
                        <div class="todo-item">
                            <div class="todo-content">
                                <div class="todo-header">
                                    <h3>${todo.title}</h3>
                                    <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                                </div>
                                <p class="todo-description">${todo.description}</p>
                                <div class="todo-footer">
                                    <span class="due-date">
                                        <i class="far fa-calendar"></i>
                                        ${new Date(todo.dueDate).toLocaleDateString()}
                                    </span>
                                    <span class="project-badge">
                                        <i class="fas fa-folder"></i>
                                        ${project ? project.name : 'No Project'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('') || '<p class="no-todos">No active todos</p>'}
            </div>
        </div>
    `;
}

function loadThisWeek() {
    const content = document.getElementById('content');
    const allTodos = getAlltodos().filter(todo => !todo.completed);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const thisWeekTodos = allTodos.filter(todo => {
        const todoDate = new Date(todo.dueDate);
        return todoDate >= today && todoDate <= nextWeek;
    });
    
    content.innerHTML = `
        <div class="home-container">
            <h1>This Week's Active Todos</h1>
            <div class="todo-list">
                ${thisWeekTodos.map(todo => `
                    <div class="todo-item">
                        <div class="todo-content">
                            <div class="todo-header">
                                <h3>${todo.title}</h3>
                                <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                            </div>
                            <p class="todo-description">${todo.description}</p>
                            <div class="todo-footer">
                                <span class="due-date">
                                    <i class="far fa-calendar"></i>
                                    ${new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('') || '<p class="no-todos">No active todos for this week</p>'}
            </div>
        </div>
    `;
}

function loadUpcoming() {
    const content = document.getElementById('content');
    const allTodos = getAlltodos().filter(todo => !todo.completed);
    const today = new Date();
    
    const upcomingTodos = allTodos.filter(todo => {
        const todoDate = new Date(todo.dueDate);
        return todoDate > today;
    });
    
    content.innerHTML = `
        <div class="home-container">
            <h1>Upcoming Active Todos</h1>
            <div class="todo-list">
                ${upcomingTodos.map(todo => `
                    <div class="todo-item">
                        <div class="todo-content">
                            <div class="todo-header">
                                <h3>${todo.title}</h3>
                                <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                            </div>
                            <p class="todo-description">${todo.description}</p>
                            <div class="todo-footer">
                                <span class="due-date">
                                    <i class="far fa-calendar"></i>
                                    ${new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('') || '<p class="no-todos">No upcoming active todos</p>'}
            </div>
        </div>
    `;
}

function loadOverDue() {
    const content = document.getElementById('content');
    const allTodos = getAlltodos().filter(todo => !todo.completed);
    const today = new Date();
    
    const overdueTodos = allTodos.filter(todo => {
        const todoDate = new Date(todo.dueDate);
        return todoDate < today;
    });
    
    content.innerHTML = `
        <div class="home-container">
            <h1>Overdue Active Todos</h1>
            <div class="todo-list">
                ${overdueTodos.map(todo => `
                    <div class="todo-item overdue">
                        <div class="todo-content">
                            <div class="todo-header">
                                <h3>${todo.title}</h3>
                                <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                            </div>
                            <p class="todo-description">${todo.description}</p>
                            <div class="todo-footer">
                                <span class="due-date">
                                    <i class="far fa-calendar"></i>
                                    ${new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('') || '<p class="no-todos">No overdue active todos</p>'}
            </div>
        </div>
    `;
}

function loadCompleted() {
    const content = document.getElementById('content');
    const allTodos = getAlltodos();
    const completedTodos = allTodos.filter(todo => todo.completed);
    
    content.innerHTML = `
        <div class="home-container">
            <h1>Completed Todos</h1>
            <div class="todo-list">
                ${completedTodos.map(todo => `
                    <div class="todo-item completed">
                        <div class="todo-content">
                            <div class="todo-header">
                                <h3>${todo.title}</h3>
                                <span class="priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</span>
                            </div>
                            <p class="todo-description">${todo.description}</p>
                            <div class="todo-footer">
                                <span class="due-date">
                                    <i class="far fa-calendar"></i>
                                    ${new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('') || '<p class="no-todos">No completed todos</p>'}
            </div>
        </div>
    `;
}

// Call both functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateProjectList();
    // ... rest of your initialization code ...
});

export { renderTodos, setupEventListeners, toggleHamburger, loadHome, loadThisWeek, loadUpcoming, loadOverDue, loadCompleted, toggleTheme, displayProjects, updateProjectSelect, loadProject };