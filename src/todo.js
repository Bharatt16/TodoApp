export class CreateTodo {
    constructor(title, description , duedate , priority , notes='' , checklist=[]){
        this.title = title ;
        this.description = description ;
        this.duedate = duedate;
        this.priority = priority ;
        this.notes = notes;
        this.checklist= checklist ;
        this.completed = false;
    }

    toggleComplete(){
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

export function createTodoFromForm(formData){
    const title = formData.get('title');
    const description = formData.get('description');
    const duedate = formData.get('dueDate');
    const priority = formData.get('priority');
    const notes = formData.get('notes'||'');
    const checklist = formData.get('checklist');

    return new CreateTodo(title,description,duedate,priority,notes,checklist);
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
    return [...todos].sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
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
