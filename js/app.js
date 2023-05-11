
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const sections = document.querySelectorAll('section');

const toggleActive = (e) => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
}

hamburger.addEventListener("click",toggleActive)

const createMenu = () => {
        sections.forEach(el => {
            const title = el.getAttribute('id');
            console.log(el.firstElementChild.innerText)
            const menuItem = document.createElement('li');
            menuItem.className = 'menu-item'
            menuItem.innerHTML =  `<a class="menu-link" aria-controls="${el.id}" href="#">${el.firstElementChild.innerText}</a>`
            menu.appendChild(menuItem)
        });
}

createMenu()