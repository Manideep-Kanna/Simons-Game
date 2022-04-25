
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var gameStarted=false;

var level=0;

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    Animate(userChosenColor);
    makeSound(userChosenColor);

   checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(!gameStarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted=true;
    }
});

function nextSequence(){

    userClickedPattern=[];

    level+=1;
    $("#level-title").text(`Level ${level}`);

    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    Animate(randomChosenColor);
    makeSound(randomChosenColor);

}

function Animate(Color){
    var ColorSelector='#'+Color;

    $(ColorSelector).addClass("pressed");
    setTimeout(() => {
        $(ColorSelector).removeClass("pressed");
    }, 100);

}


function makeSound(sound){
   var audio= new Audio("sounds/"+sound+".mp3");
   audio.play();
}

function checkAnswer(lastIndex){

        if(gamePattern[lastIndex]==userClickedPattern[lastIndex]){
            if(gamePattern.length==userClickedPattern.length){

                setTimeout(nextSequence,1000);
            }
        }
        else {

            $("h1").text("GAME OVER press any key to restart")

            makeSound("wrong");

            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
}

function startOver(){

  gamePattern=[];
  userClickedPattern=[];

  gameStarted=false;

  level=0;
}