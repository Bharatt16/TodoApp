import { CreateTodo } from './todo.js';

let currentProject = null;

function renderTodos(project){
      currentProject = project;
      const list = document.getElementById('todo-list');
      const title = document.getElementById('project-title');
      
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
      })

}


function setupEventListener(project) {
    document.getElementById('navbtn-2').addEventListener('click', () => {
      const title = prompt('Todo Title:');
      const dueDate = prompt('Due Date:');
  
      if (title && dueDate) {
        const todo = new CreateTodo(title, '', dueDate, 'medium');
        project.addTodo(todo);
        renderTodos(project);
      }
    });
  }


export { renderTodos, setupEventListener };