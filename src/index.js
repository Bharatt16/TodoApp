import { CreateTodo} from './todo';
import { CreateProject} from './project';
import { renderTodos, setupEventListener, toggleHamburger , loadHome , loadThisWeek , loadUpcoming , loadOverDue , loadCompleted, toggleTheme } from './dom';
import './style.css';
import hamburger from './images/hamburger.svg';
import odinLogo from './images/odinLogo.png';
import cross from './images/cross.svg';
import night from './images/night.svg';
import sun from './images/sun.svg';


document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle first
    toggleTheme();

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
    document.querySelector('.leftNavContainer').prepend(hamburgerImg);

    toggleHamburger(crossImg, hamburgerImg);

    const myproject = new CreateProject('My project');

    const t1 = new CreateTodo('Buy groceries', 'Milk, eggs, bread', '2025-05-25', 'high');
    const t2 = new CreateTodo('Do laundry', '', '2025-05-22', 'medium');

    myproject.addTodo(t1);
    myproject.addTodo(t2);


    t1.toggleComplete()
    console.log('Completed todos:', myproject.getCompletedTodos());

    // Render UI
    renderTodos(myproject);
    setupEventListener(myproject);

    document.querySelector('#nav-home').addEventListener('click', () => {
        clearContent();
        loadHome();
        document.getElementById('hamburgerMenu').style.display = 'none';

    });

    document.querySelector('#nav-week').addEventListener('click', () => {
        clearContent();
        loadThisWeek();
        document.getElementById('hamburgerMenu').style.display = 'none';

    });
    document.querySelector('#nav-upcoming').addEventListener('click', () => {
        clearContent();
        loadUpcoming();
        document.getElementById('hamburgerMenu').style.display = 'none';

    });
    document.querySelector('#nav-overdue').addEventListener('click', () => {
        clearContent();
        loadOverDue();
        document.getElementById('hamburgerMenu').style.display = 'none';

    });
    document.querySelector('#nav-completed').addEventListener('click', () => {
        clearContent();
        loadCompleted();
        document.getElementById('hamburgerMenu').style.display = 'none';

    });

    // Initial load
    console.log("initial log");
    loadHome();
});

export default function clearContent(){
    document.getElementById('content').innerHTML = '';
}

