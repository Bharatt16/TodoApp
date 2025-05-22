

export class CreateTodo{
    constructor(title,description,duedate,priority,notes='',checklist=[]){
       this.title = title ;
       this.description = description ;
       this.duedate = duedate ;
       this.priority = priority ;
       this.notes = notes ;
       this.checklist = checklist ;
       this.completed = false ;
}

   toggleComplete(){
    this.completed = !this.completed ;
}
}