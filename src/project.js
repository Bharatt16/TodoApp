import {CreateTodo} from './todo.js'

// Array to store all projects
let projects = [];

export class CreateProject {
    constructor(name){
        this.name = name;
        this.todos = [];
        // Add the project to the projects array when created
        projects.push(this);
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

//Regular functionns to manage projeccts 
export function addProject(name){
    return new CreateProject(name);
}

export function getAllProjects(){
    return projects;
}

export function getProject(index){
    return projects[index];
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
  
    
    // Create and return new project
    return new CreateProject(name);
}