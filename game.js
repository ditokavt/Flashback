var easyColors = ["red", "blue", "green", "yellow"];
var mediumColors = ["red", "blue", "green", "yellow", "orange", "purple"];
var hardColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan"];
var buttonColors = easyColors;
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

$(".mode").click(function(){
    startOver();
    $("#level-title").text("Press A Key to Start");
    var mode =$(this).attr("id");
    $(".mode").removeClass("on");
    $(this).addClass("on");
    if(mode === "easy"){
        buttonColors = easyColors;
        $("body").css("background-color", "#011F3F");
    }
    if(mode === "medium"){
        buttonColors = mediumColors;
        $("body").css("background-color", "#2f1b50");
    }
    if(mode === "hard"){
        buttonColors = hardColors;
        $("body").css("background-color", "#240B0B");
    }
    showButtons();
})

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswers(userClickPattern.length-1);

})

function checkAnswers(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("success");
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        gameOver();
    }
}

function nextSequence(){
    userClickPattern = [];

    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(curentColor){
    var audio = new Audio("sounds/"+curentColor+".mp3");
    audio.play();
}

function showButtons(){
    if(buttonColors.length > 2){
        $("#orange").addClass("hide");
        $("#purple").addClass("hide");
        $("#pink").addClass("hide");
        $("#cyan").addClass("hide");
    }
    if(buttonColors.length > 4){
        $("#orange").removeClass("hide");
        $("#purple").removeClass("hide");
    }if(buttonColors.length > 6){
        $("#pink").removeClass("hide");
        $("#cyan").removeClass("hide");
    }
}

var isMobile = window.matchMedia("(max-width: 768px)");
function handleMobileCheck(width) {
    if (width.matches) {
        backToStart();
    } else {
        $(".mode-container").show();
        buttonColors = easyColors;
        showButtons();
    }
}
handleMobileCheck(isMobile);
isMobile.addEventListener("change", handleMobileCheck);

function backToStart(){
    $(".mode-container").hide(); 
    buttonColors = easyColors;
    $("body").css("background-color", "#011F3F");
    $(".medium-color, .hard-color").hide(); 
    $(".mode").removeClass("on");
    $("#easy").addClass("on");
}