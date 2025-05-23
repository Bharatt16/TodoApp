import { CreateTodo} from './todo';
import { CreateProject} from './project';
import { renderTodos , setupEventListener, toggleHamburger } from './dom';
import './style.css';
import hamburger from './images/hamburger.svg';
import odinLogo from './images/odinLogo.png';
import cross from './images/cross.svg';

const crossImg = document.createElement('img');
crossImg.src  = cross;
crossImg.id = 'crossID';
document.querySelector('#hamburgerMenu').prepend(crossImg);

const odinLogoImg = document.createElement('img');
odinLogoImg.src = odinLogo;
odinLogoImg.id = 'odinLogoID';
document.querySelector('.odin').prepend(odinLogoImg);

const hamburgerImg = document.createElement('img');
hamburgerImg.src = hamburger;
hamburgerImg.id = 'hamburgerID';
// hamburgerImg.classList.add('hamburgerID');
document.querySelector('.leftNavContainer').prepend(hamburgerImg);

toggleHamburger(crossImg, hamburgerImg);

const myproject = new CreateProject('My project');

const t1 = new CreateTodo('Buy groceries', 'Milk, eggs, bread', '2025-05-25', 'high');
const t2 = new CreateTodo('Do laundry', '', '2025-05-22', 'medium');


myproject.addTodo(t1);
myproject.addTodo(t2);

console.log(myproject.todos);
console.log(myproject.getPendingTodos());

t1.toggleComplete()
console.log('Completed todos:', myproject.getCompletedTodos());


// Render UI
renderTodos(myproject);
setupEventListener(myproject);