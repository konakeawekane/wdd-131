for (let i = 0; i < 5; i++){
    console.log(i);
}

let balance = 100;
let months = 12;
let x;

for(x = 1; x <= months; x++){
    balance += 500;
    console.log("Month ",x," Balance ", balance)
}

let i = 0;

while (i <= 10){
    console.log(i);
    i++;
}

// More array methods

//.includes() - returns true or false

let text = "Hello world, welcome to WDD 131";
let result = text.toLowerCase().includes("world");
console.log(result);

// .find() - return an object or value from the first instance it finds

const pets = [
    {id: 1,
        type: "cat",
        isFurry: true
    },
    {id: 2,
        type: "dog",
        isFurry: true
    },
    {id: 3,
        type: "Lizard",
        isFurry: false
    }
]

let idResult = pets.find(function(item){
    return item.id === 2;
});

console.log(idResult);

let furryResult = pets.filter(function(item){
    return item.isFurry === true;
});

console.log(furryResult);

