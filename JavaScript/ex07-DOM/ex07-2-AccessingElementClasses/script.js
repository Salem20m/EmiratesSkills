/**
 * Getting the list of classes in an element
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
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
  // get the list of all classes
  document.querySelector('main li:first-child').classList
)
// Adding a new class to the element
document.querySelector('main li:first-child').classList.add('new-class')

// Removing a class
document.querySelector('main li:first-child').classList.remove('new-class')

// Toggle: ADDS the class when it's not there, and REMOVES it if it's there
document.querySelector('main li:first-child').classList.toggle('new-class')

// Replace: Element.classList.replace('classToBeReplaced' , 'new-class')
document.querySelector('main li:first-child').classList.replace('first', 'second')


console.log ( 
  document.querySelector('main li:first-child').classList
)
