
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

let content = document.querySelector('#content');
let page = document.querySelector('body');
let flavorText = document.querySelector('h2');

let lightModeImage = 'byui-logo-blue.webp';
let darkModeImage = 'byui-logo-white.png';

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        page.classList.add('dark');
        flavorText.style.color = '#9fd2f4';
        content.style.border = '1px solid white';
        logo.src = darkModeImage;
    } else {
        page.classList.remove('dark');
        flavorText.style.color = '#2883C1';
        content.style.border = '1px solid black';
        logo.src = lightModeImage;
    }
}