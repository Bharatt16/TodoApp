import { CreateTodo } from './todo.js';
import { CreateProject, addProject, getAllProjects, createProjectFromForm } from './project.js';
import sun from './images/sun.svg';
import night from './images/night.svg';

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

function updateProjectList() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    
    getAllProjects().forEach((project, index) => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.style.cursor = 'pointer';
        li.style.padding = '8px 10px';
        li.style.borderBottom = '1px dashed #ccc';
        
        li.addEventListener('click', () => {
            renderTodos(project);
        });
        
        projectList.appendChild(li);
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
        try {
            const project = createProjectFromForm(formData);
            updateProjectList();
            document.querySelector('#projectDialog').close();
            document.getElementById('projectName').value = '';
            // Optionally render the new project's todos
            renderTodos(project);
        } catch (error) {
            alert(error.message);
        }
    });
    
    document.querySelector('#projectcancelBtn').addEventListener("click", () => {
        document.querySelector('#projectDialog').close();
        document.getElementById('projectName').value = '';
    });

    // Todo dialog event listeners
    document.querySelector('#navbtn-2').addEventListener('click', () => {
        document.querySelector('#todoDialog').showModal();
    });
    
    document.querySelector('#cancelBtn').addEventListener("click", () => {
        document.querySelector('#todoDialog').close();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('priority').value = '';
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

function loadHome(){
    const content = document.getElementById('content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
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
    `;


        // Add event listeners for detail buttons
        document.querySelectorAll('.todo-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const todoId = e.target.closest('.todo-item').dataset.id;
                // Handle todo details click
                console.log('Todo details clicked:', todoId);
            });
        });
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








export { renderTodos, setupEventListener, toggleHamburger, loadHome, loadThisWeek, loadUpcoming, loadOverDue, loadCompleted, toggleTheme };