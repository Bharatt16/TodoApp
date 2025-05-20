

export default function createTodo(title,description,duedate,priority,notes='',checklist=[]){
    return{
        title,
        description,
        duedate,
        priority,
        notes,
        checklist,
        completed : false,
        toggleComplete(){
            this.completed = !this.completed;
        }
    }
}