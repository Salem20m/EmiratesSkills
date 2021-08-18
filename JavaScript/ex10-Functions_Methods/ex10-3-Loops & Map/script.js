/**
 * Loops Aplenty!
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
 */

const stuff = ["piggy", "headlamp", "pen", "pencil", "eraser", "water bottle"];

const nestedObjects = {
  item01: {
    name: "piggy",
    type: "toy",
    weight: 30,
  },
  item02: {
    name: "headlamp",
    type: "equipment",
    weight: 120,
  },
  item03: {
    name: "pen",
    type: "tool",
    weight: 30,
  },
  item04: {
    name: "pencil",
    type: "tool",
    weight: 30,
  },
  item05: {
    name: "eraser",
    type: "tool",
    weight: 40,
  },
  item03: {
    name: "water bottle",
    type: "equipment",
    weight: 1300,
  },
};

const article = document.querySelector("article");
let stuffList = document.createElement("ul");



/**
 * foreach array method
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
 stuff.forEach((item) => {
  let listItem = document.createElement("li");
  listItem.innerHTML = item;
  stuffList.append(listItem);
});


/**
 * for...in loop and objects
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 */
for (const singleObject in nestedObjects) {
  let listItem = document.createElement("li");
  listItem.innerHTML = `name: ${nestedObjects[singleObject].name}`;
  stuffList.append(listItem);
}

article.append(stuffList);


// map(): used to create a new array using an array you have
const mappedStuff = stuff.map((item) => {
  let listItem = document.createElement('li');
  listItem.innerHTML = `Mapped: ${item}`;
  return listItem;
}); // Now we will have a list with li items

mappedStuff.forEach((item) => {
  article.append(item);
})







/**
 * for loop
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
 */
// for (let i = 0; i < stuff.length; i++) {
//   let listItem = document.createElement("li");
//   listItem.innerHTML = stuff[i];
//   stuffList.append(listItem);
// }

/**
 * for...of loop and arrays
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 */
// for (const item of stuff) {
//   let listItem = document.createElement("li");
//   listItem.innerHTML = item;
//   stuffList.append(listItem);
// }


