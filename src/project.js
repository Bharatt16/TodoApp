import {CreateTodo} from './todo.js'

// Array to store all projects
let projects = [];

export class CreateProject {
    constructor(name){
        if (!this.isValidProjectName(name)) {
            throw new Error('Invalid project name');
        }
        this.name = name.trim();
        this.todos = [];
        this.createdAt = new Date();
        // Add the project to the projects array when created
        projects.push(this);
    }
    
    // Validate project name
    isValidProjectName(name) {
        return name && typeof name === 'string' && name.trim().length > 0;
    }

    // Get project name
    getName() {
        return this.name;
    }

    // Update project name
    updateName(newName) {
        if (!this.isValidProjectName(newName)) {
            return false;
        }
        // Check if name already exists
        if (projects.some(p => p.name === newName.trim() && p !== this)) {
            return false;
        }
        this.name = newName.trim();
        return true;
    }

    //instance methods for managing todos within a project 
    addTodo(todo){
        if(todo instanceof CreateTodo){
            this.todos.push(todo);
        }
    }

    deleteTodo(index){
        if(index>=0 && index<this.todos.length){
            this.todos.splice(index,1);
        }
    }

    getTodo(index){
        return this.todos[index];
    }

    getCompletedTodos(){
        return this.todos.filter(todo => todo.completed);
    }

    getPendingTodos(){
        return this.todos.filter(todo => !todo.completed);
    }
}

//Regular functions to manage projects 
export function addProject(name){
    const project = new CreateProject(name);
    return project;
}

export function getAllProjects(){
    return projects;
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
    const project = new CreateProject(name.trim());
    return project;
}
