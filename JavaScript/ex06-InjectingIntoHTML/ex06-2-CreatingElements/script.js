/**
 * document.createElemnt('type')
 * Parent.append(newElement) // adds it to the end of the parent
 * Parent.prepend(newElement) // adds it to the beggening of the parent
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

const content = `
  <article class="backpack" id="everyday">
    <figure class="backpack__image">
      <img src=${everydayPack.image} alt="" width=456/>
    </figure>
    <h1 class="backpack__name">${everydayPack.name}</h1>
    <ul class="backpack__features">
      <li class="packprop backpack__volume">Volume:<span> ${
        everydayPack.volume
      }l</span></li>
      <li class="packprop backpack__color">Color:<span> ${
        everydayPack.color
      }</span></li>
      <li class="backpack__age">Age:<span> ${everydayPack.backpackAge()} days old</span></li>
      <li class="packprop backpack__pockets">Number of pockets:<span> ${
        everydayPack.pocketNum
      }</span></li>
      <li class="packprop backpack__strap">Left strap length:<span> ${
        everydayPack.strapLength.left
      } inches</span></li>
      <li class="packprop backpack__strap">Right strap length:<span> ${
        everydayPack.strapLength.right
      } inches</span></li>
      <li class="packprop backpack__lid">Lid status:<span> ${
        everydayPack.lidOpen
      }</span></li>
    </ul>
  </article>
`;

const main = document.querySelector(".maincontent");

// Creating the element
const newArticle = document.createElement('article')

newArticle.classList.add('backpack');
newArticle.setAttribute('id', 'everyday')

newArticle.innerHTML = content;

// Appending the element to the main
main.append(newArticle)




// CREATING ANOTHER ELEMENT
const navBarContent = `
  <ul>
    <li><a href="" target="_blank">Home</a></li>
    <li><a href="" target="_blank">About</a></li>
    <li><a href="" target="_blank">Contact Us</a></li>
    <li><a href="" target="_blank">Hi</a></li>
    <li><a href="" target="_blank">There</a></li>
  </ul>
`;

const navBar = document.createElement('nav')

navBar.setAttribute('id' , 'navBar')
navBar.innerHTML = navBarContent;

const body = document.querySelector('body');
body.prepend(navBar);