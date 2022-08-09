/**
 * Getting the list of attributes in an element and manipulating it
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
 */

import Backpack from "./Backpack.js";

const everydayPack = new Backpack(
  "Everyday Backpack",
  30,
  "grey",
  15,
  26,
  26,
  false,
  "December 5, 2018 15:00:00 PST",
  "../../assets/images/everyday.svg"
);

const main = document.querySelector(".maincontent");

const content = `
  <article class="backpack" id="everyday">
    <figure class="backpack__image">
      <img src=${everydayPack.image} alt="" />
    </figure>
    <h1 class="backpack__name">${everydayPack.name}</h1>
    <ul class="backpack__features">
      <li class="first backpack__volume">Volume:<span> ${
        everydayPack.volume
      }</span></li>
      <li class="backpack__color">Color:<span> ${everydayPack.color}</span></li>
      <li class="backpack__age">Age:<span> ${everydayPack.backpackAge()} days old</span></li>
      <li class="backpack__pockets">Number of pockets:<span> ${
        everydayPack.pocketNum
      }</span></li>
      <li class="backpack__strap">Left strap length:<span> ${
        everydayPack.strapLength.left
      } inches</span></li>
      <li class="backpack__strap">Right strap length:<span> ${
        everydayPack.strapLength.right
      } inches</span></li>
      <li class="backpack__lid">Lid status:<span> ${
        everydayPack.lidOpen
      }</span></li>
    </ul>
  </article>
`;

main.innerHTML = content;


console.log ( 
  // get the list of all atributes
  document.querySelector('img').attributes
)
// Check if it has an attribute
document.querySelector('img').hasAttribute('src') // This will return a boolean

// Getting the content of the attribute
document.querySelector('img').getAttribute('src') // This will return the src link

// Setting an attribute
document.querySelector('img').setAttribute('alt', 'drawing of a backback')
document.querySelector('img').setAttribute('title', 'drawing of a backback')

// Removing an attribute
document.querySelector('img').removeAttribute('title')


// console.log ( 
//   document.querySelector('img').attributes
// )
