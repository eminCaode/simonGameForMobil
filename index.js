var colors=["green","red","yellow","blue"];
var answers=[];
var clicks=[];
var level=0;
var started=false;

function randomEffectedDiv(){
  clicks=[]
  var randomNumber=Math.random()*4;
  randomNumber=Math.floor(randomNumber);
  var randomColor=colors[randomNumber];
  $("."+randomColor).fadeOut(100).fadeIn(100);
  addSound(randomColor);
  answers.push(randomColor);
}

$(".btn").click(function(event){
  var clickColor=event.target.id;
  clicks.push(clickColor);
  addSound(clickColor);
  var effectedDiv=event.target;
  addAnimate(effectedDiv);
  toCompare(clicks.length-1);
})

function toCompare(currentLevel){
  if (answers[currentLevel]===clicks[currentLevel]){
    if(answers.length===clicks.length){
      setTimeout(function(){
        nextLevel();
      },1000);
    }
  }else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    addSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    againPlay();
  }
}

function addSound(soundId){
  var sound=new Audio("./sounds/"+soundId+".mp3");
  sound.play();
}

function addAnimate(animateId){
  $(animateId).addClass("pressed");
  setTimeout(function () {
    $(animateId).removeClass('pressed');
  }, 100);
}
$("body").click(function(){
  if (started==false) {
    started=true;
    startGame();
  }
})

function startGame(){
    level=0;
    answers=[];
    $("h1").text("Level "+level);
    nextLevel();
}

function nextLevel(){
  level++;
  $("h1").text("Level "+level);
  randomEffectedDiv();
}

function againPlay(){
  started=false;
  answers=[];
}
