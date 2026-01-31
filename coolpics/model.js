const pictures = document.querySelector(".pictures");
const model = document.querySelector("dialog");
const modelImage = model.querySelector("img");
const modelCloseBtn = model.querySelector(".close-btn");
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav");


pictures.addEventListener("click", openModal);
function openModal(event){
    const target = event.target;
    
    const newSrc = target.src.replace("-sm", "-full");
    const newAlt = target.getAttribute("alt");

    modelImage.src = newSrc;
    modelImage.alt = newAlt;

    model.showModal();
}

model.addEventListener("click", (event) => {
    if(event.target === model){
        model.close();
    }
});

modelCloseBtn.addEventListener("click", () => {
    model.close();
});


menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    navMenu.classList.toggle("hide");
}