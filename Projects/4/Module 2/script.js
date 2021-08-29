const colors = document.querySelectorAll("svg path");
const playBtn = document.querySelector(".play.btn");
const rankBtn = document.querySelector(".ranking.btn");
const input = document.querySelector("input");
const form = document.querySelector(".form");
const scoreHTML = document.querySelector(".score");
const gameOverHTML = document.querySelector(".game-over");
const rankTable = document.querySelector(".rank-table");

let name = "";
let score = 0;
let arrayAttempt = [];
let arraySolution = [];
let ranking = [];
let gameIsOver = false;

if(!localStorage.getItem('ranking')) {
  localStorage.setItem('ranking', JSON.stringify(ranking));
} 
else {
  ranking = JSON.parse(localStorage.getItem('ranking'));
}


function mouseDown(e) {
  e.target.classList.add("active");
  playSound(e.target.classList[0])
  if(arraySolution.length > 0) {
    addToAttempt(e.target.classList[0]);
    l = arrayAttempt.length-1;
    check(arrayAttempt[l],arraySolution[l])
    
  }
}
function mouseUp(e) {
    e.target.classList.remove("active");    

    if(arrayAttempt.length == arraySolution.length 
        && arraySolution.length > 0) {
      score++;
      changeScore();
      arrayAttempt = [];
      playSolution();
    }

}


colors.forEach(function (color) {
  color.addEventListener('mousedown', mouseDown);
})

colors.forEach(function (color) {
  color.addEventListener('mouseup', mouseUp);
})

playBtn.addEventListener("click", newGame);

input.addEventListener("keydown", function(k) {
  if(k.key === "Enter") {
    newGame();
  }
});

rankBtn.addEventListener('click', function() {
  rankTable.classList.toggle("d-none");
})

function addToAttempt(color) {
  switch (color) {
    case "red":
      arrayAttempt.push(0);
      break;
    case "blue":
      arrayAttempt.push(1);
      break;
    case "green":
      arrayAttempt.push(2);
      break;
    case "yellow":
      arrayAttempt.push(3);
      break;
  }
}

function check(a,b) {
  if(a==b) {
    return true
  } else {
    gameOver();
  }
}


function addToSolution() {
  let r = Math.floor(Math.random() * 4);
  arraySolution.push(r);
}

function playSolution() {
  addToSolution();
  let i = 0;

  let interval = setInterval(function() {

    let current = arraySolution[i];
    colors[current].classList.add('active');
    playSound(colors[current].classList[0])

    setTimeout(function() {
      colors[current].classList.remove('active');
    }, 400)

    i++;
    
    if(i >= arraySolution.length) {
      clearInterval(interval);
    }
    
  }, 700)
}







function gameOver() {
  ranking.push({name,score});
  updateRank();
  gameisOver = true;
  arraySolution = [];
  arrayAttempt = [];
  gameOverHTML.classList.remove("d-none");
  form.classList.remove("d-none");
  playBtn.innerHTML = "Play Again"
  playBtn.classList.remove("d-none");
  
}

function newGame() {
  gameisOver = false;
  arraySolution = [];
  arrayAttempt = [];
  name = input.value;
  score = 0;
  changeScore();
  form.classList.add("d-none");
  playBtn.classList.add("d-none");
  gameOverHTML.classList.add("d-none");
  scoreHTML.classList.remove("d-none");
  playSolution();
}


const song = document.createElement('audio');
function playSound(color) {
  song.src = `medias/sounds/${color}.mp3`;
  song.autoplay = true;
  document.body.appendChild(song);
}


function changeScore() {
  scoreHTML.innerHTML = `Score: ${score}`;
}


function updateRank() {

  ranking.sort((a,b)=>{
    return b.score - a.score
  })
  localStorage.setItem('ranking', JSON.stringify(ranking));
  
  if(ranking.length>2){
    rankTable.innerHTML = `
      <tr>
        <td>Rank</td>
        <td>Name</td>
        <td>Score</td>
      </tr>
      <tr>
        <td>1.</td>
        <td>${ranking[0].name}</td>
        <td>${ranking[0].score}</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>${ranking[1].name}</td>
        <td>${ranking[1].score}</td>
      </tr>
      <tr>
        <td>3.</td>
        <td>${ranking[2].name}</td>
        <td>${ranking[2].score}</td>
      </tr>
    `
  } else {
    rankTable.innerHTML = `
      <tr>
        <td>Play 3 games at least to view the ranking</td>
      </tr>
    `;
  }

}



updateRank();