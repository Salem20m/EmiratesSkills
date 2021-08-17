
const car = {
  model: 2019,
  make: "Lexus",
  doorNum: 4,
  seatsNum : {
    front: 2,
    back: 3,
  },
  color: "Titanium",
  interior: "red",

  doorOpen: false,

  // Methods
  setDoorStatus: function (doorStatus) {
    this.doorOpen = doorStatus;
  },

  setColors: function (newColor, newInterior) {
    this.color = newColor;
    this.interior = newInterior;
  }
};

console.log("Colors Before: ", car.color , ",", car.interior);
car.setColors("Red", "White");
console.log("Colors After: ", car.color , ",", car.interior);


// Tamplate litteral
//Define the content you want to inject
const content = `
  <main>
  <article>
    <h1>My Car</h1>
    <ul>
      <li>Model: ${car.model}</li>
      <li>Make: ${car.make}</li>
      <li>Color: ${car.color}</li>
      <li>Interior Color: ${car.interior}</li>
      <li>Front Seats: ${car.seatsNum.front}</li>
      <li>Back Seats: ${car.seatsNum.back}</li>
      <li>Door is: ${car.doorStatus ? "Open" : "Closed"}</li>
    </ul>
  </article>
  </main>
`;

document.body.innerHTML = content;