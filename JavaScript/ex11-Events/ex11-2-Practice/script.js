/**
 * Practice: Play with event listeners
 * - Use an event listener and CSS either inline or through an added class to draw a highlight around the entire grid when you hover over it with your mouse.
 * - Add an event listener to each grid cell to highlight that cell when you hover your mouse over it.
 * - Add an event listener to each grid cell to change its background color when it is clicked.
 * - Add an event listener to a specific key on the keyboard to change the background color of the whole page - from dark to light and back again.
 */

const container = document.querySelector(".container");

container.addEventListener("mouseenter", () => {
  container.classList.add('border');
})
container.addEventListener("mouseleave", () => {
  container.classList.remove('border');
})


const gridCells = document.querySelectorAll('.cell');

gridCells.forEach((cell) => {
  cell.addEventListener("mouseenter", () => {
    // cell.classList.add('border');
    cell.classList.add('highlight');
  })
  cell.addEventListener("mouseleave", () => {
    // cell.classList.remove('border');
    cell.classList.remove('highlight');
  })
})