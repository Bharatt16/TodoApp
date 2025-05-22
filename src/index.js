import { CreateTodo} from './todo';
import { CreateProject} from './project';
import './style.css';

const myproject = new CreateProject('My project');

const t1 = new CreateTodo('Buy groceries', 'Milk, eggs, bread', '2025-05-25', 'high');
const t2 = new CreateTodo('Do laundry', '', '2025-05-22', 'medium');


myproject.addTodo(t1);
myproject.addTodo(t2);

console.log(myproject.todos);
console.log(myproject.getPendingTodos());

t1.toggleComplete()
console.log('Completed todos:', myproject.getCompletedTodos());