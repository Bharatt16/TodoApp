let currentTodo = null;

function renderTodos(project){
      currentProject = project;
      const list = document.getElementById('todo-list');
      const title = document.getElementById('project-title');
      
      list.innerHtml = '';
      title.textcontent = project.name;

}