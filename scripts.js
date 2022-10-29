function generateNumber (max){
  let num = Math.floor(Math.random()*max);
  return num;
}

class ElementUI {
  column= null;
  row= null;
}

class Mark extends ElementUI{
}

class Rocket extends ElementUI{
  mark = new Mark();
  score = 0;
  setDefault () {
    super.column = 6;
    super.row = 6;
    this.score = 0;
  }

}

class Meteorite extends ElementUI{
  generatePosition(){
    super.column =  generateNumber(12);
    super.row = generateNumber(3);
  }
}

rocket = new Rocket()
rocket.setDefault();

var meteorites = Array(0);

function generateMeteorites(){
  meteorites =  [];
  for (let i = 0; i < 10; i= i +1){
    let meteorite = new Meteorite();
    meteorite.generatePosition();
    meteorites.push(meteorite);
  }
}

function showMark (){
  let markUI = document.getElementById('mark');
  if (rocket.mark.column != null){
    markUI.style.gridColumn =  rocket.mark.column;
    markUI.style.gridRow =  rocket.mark.row;
    markUI.style.visibility = 'inherit';
  }
  else {
    markUI.style.visibility = 'hidden';
  }
}

function render (){
  let rocketUI = document.getElementById('rocket');
  rocketUI.style.gridColumn =  rocket.column;
  rocketUI.style.gridRow =  rocket.row;
  showMark();

  let meteoritesUI = document.getElementsByClassName('meteorite');
  for (let i = 0; i < 10; i = i +1){
    if ( meteorites[i].column != null){
      meteoritesUI[i].style.gridColumn = meteorites[i].column;
      meteoritesUI[i].style.gridRow = meteorites[i].row;
      meteoritesUI[i].style.visibility = 'inherit';
    } else {
      meteoritesUI[i].style.visibility = 'hidden';
    }
  }
  let scoreUI = document.getElementById('score');
  scoreUI.innerHTML = rocket.score;
  collision();
}

function advance(){
  for (let i = 0; i < 10; i = i +1){
    if(meteorites[i].row <= 5){
      meteorites[i].row += 1;
    }
    else {
      meteorites[i].row = null;
      meteorites[i].column = null;
    }
    if ( meteorites.every (meteorite => {return meteorite.column === null})){
      this.generateMeteorites();
    }
  }
  rocket.score += 1;
  render();
}

function collision(){
  for (let i = 0; i < 10; i= i +1){
    if (meteorites[i].column === rocket.column && meteorites[i].row === rocket.row) {
      rocket = new Rocket();
      rocket.setDefault();
      generateMeteorites();
    }
  }
}

function right (){
  if(rocket.column <= 11){
    rocket.column +=  1;
  }
  render();
}

function up (){
  if(rocket.row>= 2){
    rocket.row -=  1;
  }
  render();
}

function down (){
  if(rocket.row <= 5){
    rocket.row +=  1;
  }
  render();
}


function left (){
  if(rocket.column >= 2){
    rocket.column -=  1;
  }
  render();
}

function mark (){
  if (rocket.mark.column !== null){
    rocket.column =  rocket.mark.column ;
    rocket.row = rocket.mark.row;
    rocket.mark.column = null;
    rocket.mark.row = null;
  } else{
    rocket.mark.column = rocket.column;
    rocket.mark.row = rocket.row;
  }
  render();
}



function move (){
  document.addEventListener('keydown', (event) => {
    const code = event.code;
    if( code === 'ArrowRight'){
      right();
    }
    else if( code === 'ArrowLeft'){
      left()
    }
    else if (code === 'ArrowUp'){
      up();
    }
    else if (code === 'ArrowDown'){
      down();
    }
    else if (code === 'Space'){
      mark();
    }
    render();
  }, false);
}


function gamepad () {
  const rightUI = document.getElementById("right");
  rightUI.addEventListener("click", right, false);
  const upUI = document.getElementById("up");
  upUI.addEventListener("click", up, false);
  const leftUI = document.getElementById("left");
  leftUI.addEventListener("click", left, false);
  const downUI = document.getElementById("down");
  downUI.addEventListener("click", down, false);
  const markUi = document.getElementById("space");
  markUi.addEventListener("click", mark, false);
}

setInterval(advance, 1000);
generateMeteorites();
render()
move();
gamepad();