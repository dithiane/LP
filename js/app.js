// Get hamburger menu element
const hamburger = document.getElementsByClassName("hamburger")[0];
// Get main menu element
const menu = document.querySelector(".menu");
// Get all sections elements
const sections = document.querySelectorAll('section');
// Get back to top element
const goToTop = document.getElementsByClassName('goToTop')[0];

// @param {HTMLElement, string} el,  property
// @returns {string}
// Get the value of the style property for the specific element
const getStyleProperty = (el, property) => {
    const style = window.getComputedStyle(el);
    return style.getPropertyValue(property);
}

// Looping through "sections" elements to get their "id" and
// create dynamically the menu item for the specific "section"
const createMenu = () => {
    sections.forEach(el => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item'
        menuItem.innerHTML = `<a class="menu-link" href="#${el.id}">${el.firstElementChild.innerText}</a>`
        menu.appendChild(menuItem)
    });
}

// @param {HTMLElement} el
// @returns {Boolean}
// Check if the specific element presents in the viewport
const isInViewPort = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
};

// Check if the scroll more then clientHeight, show/hide back to top button
const checkIfShowGoToTop = () => {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        goToTop.style.display = 'block';
    } else {
        goToTop.style.display = 'none';
    }
};

// Looping through "sections" and make active menu item with id associated to the section that in the viewport
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

// Scroll to the top of the page
const handleGoToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add to mobile/tablet menu and hamburger menu "active" class
const toggleMenu = (e) => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
}

// Get "display" property of the hamburger menu, 
// if is it "displayed" then add to the mobile/tablet menu and hamburger menu "click" event listener
const checkHamburger = () => {
    display = getStyleProperty(hamburger, "display")
    if (display === "none") return
    menu.addEventListener('click', toggleMenu)
    hamburger.addEventListener("click", toggleMenu);
}

// If "resize" event was triggered check for visibility of the hamburger menu
const handleResize = (e) => {
    e.preventDefault()
    checkHamburger()
}

// Scroll to the section associated with clicked menu item
const handleMenuClick = (e) => {
    e.preventDefault()
    const target = document.getElementById(`${e.target.innerText.toLowerCase()}`)
    target.scrollIntoView({ behavior: 'smooth' });
}

// Add "scroll" listener to thepage
window.addEventListener("scroll", handleScroll);
// Add "click" listener to the back to top button
goToTop.addEventListener('click', handleGoToTop);
// Add "resize" listener to the page
window.addEventListener('resize', handleResize);
// Add "click" listener to the menu
menu.addEventListener('click', handleMenuClick);

createMenu()
checkHamburger()