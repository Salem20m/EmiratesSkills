/**
 * Traverse the DOM tree using querySelector() and querySelectorAll()
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
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
      <li class="backpack__volume">Volume:<span> ${
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

// querySelector() & querySelectorAll() methods both take css queries as the parameter
// querySelector() returns the first element it finds with the same specefications
// querySelectorAll() returns a NodeList with all the elements


// We can right in the console: document.querySelector("main")
//                              documnet.querySelectorAll(".sitefooter p")
//                              document.querySelector("p:last-of-type")


// *** STYLING THE ELEMENTS USING JS *** //

document.querySelectorAll("main li").forEach(item => item.style.backgroundColor= "gray")
document.querySelectorAll("main").forEach(item => item.style.color= "red")

document.querySelector('p:last-of-type').style.fontSize = '25px';
document.querySelector('p:last-of-type').style.color = 'purple';
document.querySelector('footer').style.backgroundColor = 'pink';
