import { Todo } from './todo.js';

// Array to store all projects
let projects = [];

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
        projects.push(this);
    }

    addTodo(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo);
        }
    }

    deleteTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1);
        }
    }
}

// Initialize default projects and todos
export function initializeDefaultProjects() {
    if (projects.length === 0) {
        // Create default project
        const defaultProject = new Project('My Project');

        // Add default todos to the project
        defaultProject.addTodo(new Todo(
            'Complete project proposal',
            'Finish the initial draft of the project proposal',
            new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            'high'
        ));

        defaultProject.addTodo(new Todo(
            'Team meeting',
            'Weekly team sync meeting',
            new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            'medium'
        ));

        defaultProject.addTodo(new Todo(
            'Gym workout',
            'Complete 1-hour workout session',
            new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            'medium'
        ));
    }
}

export function getAllProjects() {
    return projects;
}

export function createProject(name) {
    return new Project(name);
}

//Regular functions to manage projects 
export function addProject(name){
    const project = new Project(name);
    return project;
}

export function getProject(index){
    return projects[index];
}

export function getProjectByName(name) {
    return projects.find(p => p.name === name.trim());
}

export function deleteProject(index){
    if(index >= 0 && index < projects.length) {
        projects.splice(index, 1);
    }
}

export function getAlltodos(){
    return projects.flatMap(project => project.todos);
}

export function createProjectFromForm(formData){
    const name = formData.get('projectName');
    
    // Check if project name already exists
    if (projects.some(p => p.name === name.trim())) {
        alert('A project with this name already exists');
        return null;
    }
    
    // Create new project with trimmed name
    const project = new Project(name.trim());
    return project;
}
