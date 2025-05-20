document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-list a');
    const startButton = document.querySelector('.global-button');

    hamburgerButton.addEventListener('click', () => {
        navContainer.classList.toggle('show');
    });

    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('show');
        });
    });

    // Close menu on button click
    startButton.addEventListener('click', () => {
        navContainer.classList.remove('show');
    });
});
