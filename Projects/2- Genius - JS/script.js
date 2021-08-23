let arraySolution = [];
let arrayAttempt = [];
let score = 0;
let name = '';
const colors = document.querySelectorAll('svg path');
const board = document.querySelector('svg');
const playButton = document.querySelector('.play.btn');
const tryAgainButton = document.querySelector('.try-again');
const menu = document.querySelector('.menu');
const gameOverMenu = document.querySelector('.game-over.menu');
const scoreMenu = document.querySelector('.score.menu');
const input = document.querySelector('input');
const rankingTable = document.querySelector('table');
const rankingButton = document.querySelector('nav .btn');

const currentPlayer = {
  name: '',
  score: 0
}

let ranking = [];

if(!localStorage.getItem('ranking')) {
  localStorage.setItem('ranking', JSON.stringify(ranking));
} else {
  ranking = JSON.parse(localStorage.getItem('ranking'));
}

updateRanking();
activateBoard();

function mousedownFunction  () {  
  this.classList.add('active');
  if(arraySolution.length != 0)
  {
    addToArrayAttempt(this);
    let i = arrayAttempt.length-1
    checkSolution(arrayAttempt[i], arraySolution[i]) 
  }
  playSound(this.classList[0]);  
};

function mouseupFunction () {  
  this.classList.remove('active');
  if(arrayAttempt.length == arraySolution.length 
    && arraySolution.length != 0) {
    score++;
    addScore();
    playSolution();
    arrayAttempt = [];
  }
};


function activateBoard () {
  colors.forEach(function (color) {
    color.addEventListener('mousedown', mousedownFunction)
    color.addEventListener('mouseup', mouseupFunction)
  });
}

function deactivateBoard () {
  colors.forEach(function (color) {
    color.removeEventListener('mouseup', mouseupFunction);
    color.removeEventListener('mousedown', mousedownFunction);
  });
}


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
}

const addToArraySolution = function() {
  let a = Math.floor(Math.random() * 4) + 1;
  arraySolution.push(a);
}

const playSolution = function() {

  addToArraySolution();
  deactivateBoard();
  
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
      activateBoard();
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

  ranking.push({name,score});
  
  updateRanking();

  console.log(ranking);
  localStorage.setItem('ranking', JSON.stringify(ranking));  

}

const song = document.createElement('audio')
function playSound(color){
  song.src = `medias/sounds/${color}.mp3`;
  song.autoplay = true;
  song.load();
  document.body.appendChild(song);
}




 function play() {
  menu.classList.add('d-none');
  scoreMenu.classList.remove('d-none');
  gameOverMenu.classList.add('d-none');
  newGame();
  
 }

playButton.addEventListener('click', play)
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    play();
  }
});

tryAgainButton.addEventListener('click', function() {
  menu.classList.remove('d-none');
  scoreMenu.classList.add('d-none');
  gameOverMenu.classList.add('d-none');    
})

function newGame() {
  score = 0;
  addScore();
  arrayAttempt = [];
  arraySolution = [];
  name = input.value;
  score = 0;
  playSolution();
}



function addScore() {
  scoreMenu.innerHTML = `<h2>Score: ${score}</h2>`;
}

function updateRanking() {  

  ranking.sort(function (a, b) {
    return b.score - a.score;
  });

  if(ranking.length > 2) {    
      rankingTable.innerHTML = `
        <tr class="first">
            <th>1.</th>
            <th>${ranking[0].name}</th>
            <th>${ranking[0].score}</th>
        </tr>
        <tr class="second">
          <th>2.</th>
          <th>${ranking[1].name}</th>
          <th>${ranking[1].score}</th>
        </tr>
        <tr class="third">
          <th>3.</th>
          <th>${ranking[2].name}</th>
          <th>${ranking[2].score}</th>
        </tr>
      `;
  } else {
    rankingTable.innerHTML = `
      <tr class="third">
        <td colspan="3">Play ${3-ranking.length} more games to get the ranking.</td>
      </tr>`;
  }
}


rankingButton.addEventListener('click', function(){
  rankingTable.classList.toggle('d-none');
});


 



