
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const sections = document.querySelectorAll('section');

const toggleActive = (e) => {
    e.preventDefault()
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
}

const createMenu = () => {
    sections.forEach(el => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item'
        menuItem.innerHTML = `<a class="menu-link" href="#${el.id}">${el.firstElementChild.innerText}</a>`
        menu.appendChild(menuItem)
    });
}

createMenu()
const isInViewPort = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
};

const handleScroll = (e) => {
    e.preventDefault()
    sections.forEach((el) => {
        let menuItem = document.querySelector(`a[href="#${el.id}"]`);
        if (isInViewPort(el)) {
            el.classList.add('active');
            menuItem.classList.add('active');
        } else {
            el.classList.remove('active');
            menuItem.classList.remove('active');
        }
    });
}
window.addEventListener("scroll", handleScroll);
hamburger.addEventListener("click", toggleActive)