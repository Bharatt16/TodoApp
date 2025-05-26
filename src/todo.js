export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    updateDetails(updates){
        // updates is an object containing the properties to update
        // Example: { title: "New Title", priority: "high" }
        Object.assign(this, updates);
    }

    addCheckListItem(item){
        this.checklist.push(item);
    }
    
    removeCheckListItem(index){
        if(index>= 0 && index<this.checklist.length){
            this.checklist.splice(index,1);
        }
    }
}

//Functions for todo management
export function createTodo(title, description, dueDate, priority) {
    return new Todo(title, description, dueDate, priority);
}

export function getFormattedDate(date){
    return new Date(date).toLocaleDateString();
}

export function getPriorityColor(priority){
    const colors = {
        low: '#4CAF50',    // Green
        medium: '#FFC107', // Yellow
        high: '#F44336'    // Red
    };
    return colors[priority] || '#000000';
}

//Sorting function
export function sortByDate(todos) {
    return [...todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

export function sortByPriority(todos) {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Filtering functions
export function filterByStatus(todos, completed) {
    return todos.filter(todo => todo.completed === completed);
}

export function filterByPriority(todos, priority) {
    return todos.filter(todo => todo.priority === priority);
}
