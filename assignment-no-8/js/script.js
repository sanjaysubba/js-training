// const body = document.getElementById("main");
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-1;
canvas.height = window.innerHeight-5;

var c = canvas.getContext('2d');

var x = 500;
var y = 200;
var boxHeight = 100;
var boxWidth = 100;
var molePositionX;
var molePositionY;
var initialPositionX = x;
var initialPositionY = y;
var maxX = (initialPositionX / 100) + 2;
var minX = initialPositionX / 100;
var maxY = (initialPositionY / 100) + 2;
var minY = initialPositionY / 100;
var score = 0;
var countDown = 40;
var totalCount;
var start;
var elapsed;
var loopStart;
var loopTimeElapsed;
var gameSpeed = 1000;
var clickStatus = 'unclicked';

function drawHeadingText(){
    c.font="30px Comic Sans MS";
    c.fillStyle = "red";
    c.fillText('Whac a Mole using Canvas', 400, 100)
}
drawHeadingText();
function drawScore(){
    c.font="30px Comic Sans MS";
    c.fillStyle = "red";
    c.fillText('Your Score:', 200, 200)
    c.fillText(score, 380, 200 )
}
function drawRect(){
    for (var i = 0; i < 3; i ++){
        for(var j =0; j <3; j++){
            c.rect(x, y, boxWidth, boxHeight);

            c.stroke();
            // c.strokeStyle = "#000";
            x+=100; 
        }
        x = initialPositionX;
        y+=100;
    }
    y = initialPositionY;
}
function drawMole(){
    //Math.floor(Math.random() * (max - min + 1) + min);
    
    molePositionX = Math.floor(Math.random ()* ( maxX- minX + 1) + minX) * 100;
    molePositionY = Math.floor(Math.random ()* (maxY - minY + 1) + minY) * 100;
    c.fillStyle = 'yellow';
    c.fillRect(molePositionX, molePositionY, boxWidth, boxHeight);
    c.stroke();
}

function inputHandler(){
    window.addEventListener('click', function(event){
        if(event.x > molePositionX && event.x < (molePositionX + boxWidth) && event.y > molePositionY && event.y < (molePositionY +  boxHeight) && clickStatus == 'unclicked'){
            score = score + 1; 
            clickStatus = 'clicked';
        }
    })
}
inputHandler();

function countdown(timestamp){
    if (start == undefined){
        start = timestamp;
    }
    elapsed = timestamp - start;
    if(elapsed > 1000){
        countDown = countDown - 1;
        start = timestamp;
        
    } 
    if(countDown > 0){
        requestAnimationFrame(countdown);
    }
}
requestAnimationFrame(countdown);
function drawCountdown(){
    c.font="30px Comic Sans MS";
    c.fillStyle = "red";
    c.fillText(countDown, 300, 150)
}
drawRect();
drawMole();
drawScore();
drawCountdown();
function loop(timestamp){
    if(loopStart == undefined){
        loopStart = timestamp;
    }
    if(loopTimeElapsed >= gameSpeed){
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawHeadingText();
        drawRect();
        drawMole();
        drawScore();
        drawCountdown();
        loopStart = timestamp;
        clickStatus = 'unclicked';
    }
    loopTimeElapsed = timestamp - loopStart;
    
    if(countDown > 0){
        requestAnimationFrame(loop);
    }
}
window.requestAnimationFrame(loop);;
