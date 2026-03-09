let nums = [12, 10, 8, 3, 5, 5 , 200, -5, 5];

console.log(nums.sort(NumCompare));

function NumCompare(a, b){
    //is simpler for numbers
    return Math.sign(a - b);
}


const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

const simpleSort = simpleList.sort();

const lowerList = simpleList.map(function(item){
    return item.toLowerCase();
});

const alphabeticalSort = simpleList.map(item => item.toLowerCase()).sort();

console.log(alphabeticalSort);

let searchTerm = 'an';

let filtered = alphabeticalSort.filter(IsContaining);

function IsContaining(item){
    return item.includes(searchTerm);
};

console.log(filtered);


const products = [
  {
    productName: "Wireless Mouse",
    price: 29.99
  },
  {
    productName: "Bluetooth Keyboard",
    price: 49.99
  },
  {
    productName: "Laptop Stand",
    price: 39.99
  }
];


function compareFn(a, b) {
  if (a.productName < b.productName){
    return -1;
  } else if (a.productName > b.productName) {
    return 1;
  }
 return 0;
}

let productSort = products.sort(compareFn);

console.log(productSort);


const animals = [
  {
    name: "Lion",
    traits: ["brave", "strong", "fierce", "wild"]
  },
  {
    name: "Elephant",
    traits: ["large", "gentle", "smart", "wild"]
  },
  {
    name: "Fox",
    traits: ["sly", "quick", "clever", "wild"]
  },
  {
    name: "Dog",
    traits: ["loyal", "friendly", "playful", "cuddly"]
  },
  {
    name: "Cat",
    traits: ["quiet", "independent", "curious", "cuddly"]
  }
];

let query = 'dog';

let filteredList = animals.filter(searchList);

function searchList(item){
    return item.name.toLowerCase().includes(query.toLowerCase());
}

console.log(filteredList);

let queryTrait = "cuddly";

let filteredTraits = animals.filter(searchTraits);

function searchTraits(item){
    return item.traits.find((trait) => 
        trait.toLowerCase().includes(queryTrait.toLowerCase())
    )
}

console.log(filteredTraits);

console.log(animals.filter((item) => item.traits.find((a) => a.toLowerCase().includes(queryTrait.toLowerCase()))))