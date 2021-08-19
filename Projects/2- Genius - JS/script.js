// 1.red, 2.blue, 3.green, 4.yellow

// const arrayColors = ['red', 'blue', 'green', 'yellow'];
let arraySolution = [];
let arrayAttempt = [];
let score = 0;
const colors = document.querySelectorAll('svg path');
const board = document.querySelector('svg');

colors.forEach(function (color) {
  color.addEventListener('mousedown', function() {
    this.classList.add('active');
    addToArrayAttempt(color);
    let i = arrayAttempt.length-1
    checkSolution(arrayAttempt[i], arraySolution[i])
    addScore();
    playSound(this.classList[0]);
  })
  color.addEventListener('mouseup', function() {
    color.classList.remove('active');
    if(arrayAttempt.length == arraySolution.length) {
      playSolution();
      arrayAttempt = [];
    }
  })
})

const addToArrayAttempt = function(color) {
  switch (color.classList[0]) {
    case 'red': 
      arrayAttempt.push(1); break;

    case 'blue': 
      arrayAttempt.push(2); break;

    case 'green': 
    arrayAttempt.push(3); break;

    case 'yellow': 
    arrayAttempt.push(4); break;
  }
  console.log(arrayAttempt);
}

const addToArraySolution = function() {
  let a = Math.floor(Math.random() * 4) + 1;
  console.log(a);
  arraySolution.push(a);
}

const playSolution = function() {
  addToArraySolution(); // will add a random number to the solution
  
  let index = 0;
  let interval = setInterval(() => {

    let solution = arraySolution[index] - 1;
    colors[solution].classList.add('active');

    playSound(colors[solution].classList[0]);

    setTimeout(function() {     
      colors[solution].classList.remove('active');
    }, 450);    

    index++; 

    if(index >= arraySolution.length) {
      clearInterval(interval);
      index = 0;
    }    
  }, 700);
}

function checkSolution (a,b) {
  if(a==b){
    return true;
  } else {
    gameOver();
    return false;
  }
} 

function gameOver() {
  console.log("Game Over!");
  arrayAttempt, arraySolution = [];
  menu.classList.add('d-none');
  scoreMenu.classList.add('d-none');
  gameOverMenu.classList.remove('d-none');
  score=-1;
}

function playSound(color){

  const song = document.createElement('audio')
  song.src = `medias/sounds/${color}.mp3`;
  song.autoplay = true;
  song.load();
  document.body.appendChild(song);
}


const playButtons = document.querySelectorAll('.play.btn')
const menu = document.querySelector('.menu')
const gameOverMenu = document.querySelector('.game-over.menu')
const scoreMenu = document.querySelector('.score.menu')

playButtons.forEach(function (btn) {
  btn.addEventListener('click', function() {
    menu.classList.add('d-none');
    scoreMenu.classList.remove('d-none');
    gameOverMenu.classList.add('d-none');
    arrayAttempt, arraySolution = [];
    playSolution();
  })
})


function addScore() {
  // const newScore = document.createElement('h2');
  scoreMenu.innerHTML = `<h2>Score: ${score}</h2>`;
  // scoreMenu.innerHTML
}


 




// newRound -> playSolution, push new rando value to array, waits for the event click from user

// do click, if attempt is correct, do anohter round, if false, game over



// playSolution();

// triggerEvent( colors[0]);