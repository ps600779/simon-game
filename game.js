var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function(){
  if(!started){
    
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
     
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);


    

}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        
  
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  

    }else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          $("#level-title").text("Game Over, Press Any Key to Restart");

          statOver();
    }
}

function statOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
