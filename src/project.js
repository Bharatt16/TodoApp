import { CreateTodo } from './todo';

export class CreateProject{
   constructor(name){
       this.name = name ;
       this.todos = [];
   }
   
   addTodo(todo){
      if(todo instanceof CreateTodo){
         this.todos.push(todo);
      }
   }
   
   deleteTodo(index){
      if(index >= 0 && index < this.todos.length){
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