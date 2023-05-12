
const hamburger = document.getElementsByClassName("hamburger")[0];
const menu = document.querySelector(".menu");
const sections = document.querySelectorAll('section');
const goToTop = document.getElementsByClassName('goToTop')[0];

const getStyleProperty = (el, property) => {
    const style = window.getComputedStyle(el);
    return style.getPropertyValue(property);
}

const createMenu = () => {
    sections.forEach(el => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item'
        menuItem.innerHTML = `<a class="menu-link" href="#${el.id}">${el.firstElementChild.innerText}</a>`
        menu.appendChild(menuItem)
    });
}

const isInViewPort = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
};

const handleScroll = (e) => {
    e.preventDefault()
    checkIfShowGoToTop()
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

const handleGoToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const checkIfShowGoToTop = () => {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        goToTop.style.display = 'block';
    } else {
        goToTop.style.display = 'none';
    }
};


const toggleMenu = (e) => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
}

const handleResize = (e) => {
    e.preventDefault()
    checkHamburger()
}

const checkHamburger = () => {
    display = getStyleProperty(hamburger, "display")
    if (display === "none") return
    menu.addEventListener('click', toggleMenu)
    hamburger.addEventListener("click",  toggleMenu);
}

window.addEventListener("scroll", handleScroll);
goToTop.addEventListener('click', handleGoToTop);
window.addEventListener('resize', handleResize);

createMenu()
checkHamburger()