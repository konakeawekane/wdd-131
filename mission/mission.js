
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
        page.style.backgroundColor = '#000';
        content.style.border = '1px solid white';
        page.style.color = '#fff';
        logo.src = darkModeImage;
        flavorText.style.color = '#9fd2f4';
    } else {
        page.style.backgroundColor = '#fff';
        content.style.border = '1px solid black';
        page.style.color = '#000';
        logo.src = lightModeImage;
        flavorText.style.color = '#2883C1';
    }
}