let menu = document.querySelector("nav");
let btn = document.querySelector(".menu-btn");

btn.addEventListener("click", toggleMenu);

function toggleMenu() {
    menu.classList.toggle("hide");
    btn.classList.toggle("change");
}