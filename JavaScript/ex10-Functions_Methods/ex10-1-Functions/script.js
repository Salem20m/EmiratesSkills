/**
 * FUNCTIONS
 */

// Function Declaration: This function can be changed later on in the code
//                       The order of it will be important
function doSomeMath(a ,b) {
  let c = a + b;
  return c;
}
console.log('Do Some Math:', doSomeMath(4,4));



// Function Expression: This is what is usually used
const doMoreMath = function (a, b) {
  let c = a * b;
  return c
}
console.log('Do More Math:', doMoreMath(4,4));


// Arrow Function
// NEVER USE ARROW FUNCTION IF YOU WANT TO USE 'this'
const doArrowMath = (a, b) => {
  let c = a / b;
  return c
}
console.log('Do More Math:', doMoreMath(4,4));


// EXAMPLE

const salemsCar = {
  name: "Salem's Car",
  color: 'Titanium',
  doors: 4,
  make: 'Lexus'
};
const brunosCar = {
  name: "Bruno's Car",
  color: 'عنابي',
  doors: 4,
  make: 'Nissan'
};

// This is the function
const addCar = (currentCar) => {
  let newArticle = document.createElement('article');
  newArticle.innerHTML = `
    <h1>${currentCar.name}</h1>
    <ul>
      <li>Make: ${currentCar.make}</li>
      <li>Color: ${currentCar.color}</li>
      <li>Doors: ${currentCar.doors}</li>
    </ul>
  `;
  return newArticle;
}
// Using the function
const main = document.querySelector('main');
main.append(addCar(salemsCar));
main.append(addCar(brunosCar));







// Function inside Objects

const Game = {
  player: "Salem",
  highScore: 0,

  start() {
    console.log(this.player);
  },

  updateHighScore(newHishScore) {
    this.highScore = newHishScore;
    console.log(this);
  },

  // Never use => for object methods 
  end: () => {
    console.log(this.player);
  }

}

Game.start();
Game.end();
Game.updateHighScore(420);



// Practice

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
// Formater
// const formatter = (num) => {
//   let formated = 
//   console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num));

//   return formated;
// }


// Tip Calculator
const tipCalculator = (bill, percent, currency) => {
  let tip = (bill * percent/100);
  let total = bill + tip;

  console.log(`
    Bill:            ${currency}${bill}
    Tip percentage:  ${(percent)}%
    Tip:             ${currency}${tip.toFixed(2)}
    Total:           ${currency}${total.toFixed(2)}
  `);
};

tipCalculator(380.99, 15, '$')

element.addEventListener("click", () => {
  console.log("hello");
});