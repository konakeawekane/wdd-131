let title = document.querySelector("h1");

console.log(title);

title.textContent = "Web Page Components"

let topicTitle = document.getElementById('topics');

topicTitle.style.color = 'purple';

let list = document.querySelector('.list');

list.style.border = '3px solid black';

let para = document.querySelector('p');

para.classList.add('background');

let img = document.querySelector('img');

img.setAttribute('src', 'images/html.png');

// alphabet = [
//     'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
// ]

// function changeMessage(){
//     let number = Math.random();
//     number = Math.round(number * 100000000.0)
//     let digits = number.toString();
//     let text = '';
//     for (let i = 0; i < digits.length; i++){
//         text = text + alphabet[digits.charAt(i)];
//     }
//     title.textContent = text;
// }

// setInterval(changeMessage,1);


let selectElem = document.getElementById('webdevlist');

selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
    document.querySelector('#html').style.color = 'red';
})

const newPara = document.createElement('p');
newPara.innerText = 'Added with Javascript';
document.body.appendChild(newPara);