import { Project } from './project.js';
import { Todo } from './todo.js';
import { setupEventListeners, loadProject, updateProjectSelect, displayProjects } from './dom.js';
import './style.css';
import { CreateTodo} from './todo';
import { CreateProject, initializeDefaultProjects, getAllProjects } from './project';
import { renderTodos, toggleHamburger, loadHome, loadThisWeek, loadUpcoming, loadOverDue, loadCompleted, toggleTheme } from './dom';
import hamburger from './images/hamburger.svg';
import odinLogo from './images/odinLogo.png';
import cross from './images/cross.svg';
import night from './images/night.svg';
import sun from './images/sun.svg';

export function clearContent(){
    document.getElementById('content').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle first
    toggleTheme();

    const crossImg = document.createElement('img');
    crossImg.src = cross;
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

    // Initialize default projects
    initializeDefaultProjects();

    // Update project select dropdown with default project
    updateProjectSelect();

    // Update project list in sidebar
    displayProjects();

    // Set up event listeners
    setupEventListeners();

    // Set up navigation
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

    // Initial load - start with home view
    loadHome();
});






// const todos = [
//     {
//         id: 1,
//         title: "Complete project",
//         description: "Finish the todo app project",
//         dueDate: "2024-03-20",
//         priority: "High"
//     },
//     {
//         id: 2,
//         title: "Review code",
//         description: "Review the latest changes",
//         dueDate: "2024-03-21",
//         priority: "Medium"
//     }
// ];

loadHome(todos);

