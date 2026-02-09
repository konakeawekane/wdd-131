// let pets = ['goldfish', 'dog', 'rhino'];

// let numbers = [1,7,3,4,8,3,8,2];

// numbers.forEach(populate);

// function populate(num){
//     num = Math.random(0,1);
// }

// let sumOfEvens = 0;

// numbers.forEach(evens);

// function evens(num){
//     sumOfEvens += num *(num % 2);
// }

// console.log(numbers);
// console.log(sumOfEvens);


const steps = ['one', 'two', 'three'];

myList = document.querySelector("#myList");

console.log(myList);

const stepsHtml = steps.map(listTemplate)

function listTemplate(item){
    return `<li>${item}</li>`
}

myList.innerHTML = stepsHtml.join('');

let grades = ['A', 'B', 'C'];

let points;

let gpaPoints = grades.map(convert);

function convert(grade){
    switch (grade.toUpperCase()){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            points = 0;
            alert("Invalid grade - " + grade);
    }
    return points;
}

console.log(gpaPoints);

let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, point){
    return total + point;
}

let averagePoints = totalPoints / gpaPoints.length;

console.log(averagePoints);

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const shortWords = words.filter(function(word){
    return word.length < 6;
})

console.log(shortWords);

