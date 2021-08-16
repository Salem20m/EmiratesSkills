/**
 * Practice: Building objects
 *
 * - Create JavaScript objects based on objects in your current environment.
 * - Give each object an identifiable name.
 * - Create properties to describe the objects and set their values.
 * - Find an object that has another object inside of it to create a nested object.
 * - Test your objects in the browser console by accessing the entire object and its specific properties.
 */

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
