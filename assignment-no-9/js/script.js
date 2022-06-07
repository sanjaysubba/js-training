const canvas = document.querySelector('canvas');
var canvasHeight = window.innerHeight - 200;
var canvasWidth = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var birdPositionX = 100;
var birdPositionY = 100;
var birdRadius = 20;
var jumpStatus = "false";
var loopStartTime;
var loopTimeElapsed;
const c = canvas.getContext('2d');
var pipeInitialPositionX = canvasWidth;
var pipeX = pipeInitialPositionX;
var pipeY = 0;
var pipeWidth = 50;
var pipeHeight = canvasHeight;
var pipeSpeed = 4;
var holeWidth = pipeWidth;
var holeHeight = 150;
var holeX = pipeX;
var holeYMin = 0;
var holeYMax = canvasHeight - holeHeight;
//  Math.random() * (max - min) + min;
var holeY =  Math.floor(Math.random() * (holeYMax - holeYMin) + holeYMin);
var collision = 'notCollided';
var gameOver = 'false';
var score = 0;
var start;
// var image = new Image();
// image.src = 'images/parrot.png'
// var image1 = new Image();
// image1.src = 'images/fly2.webp'

function drawCanvas(){
    c.strokeRect(0, 0, canvasWidth, canvasHeight);
}
drawCanvas();
function note(){
    c.font = "30px Arial";
    c.textAlign = "center";
    c.fillText("Press Spacebar to play", canvasWidth/2, canvasHeight/2);
    window.addEventListener('keyup', function(e){
        if (start == undefined){
            if(e.key == " "){
                start = 'started';
                requestAnimationFrame(loop);
            }
        }
    })

}
note();
function drawBird(){
    c.fillStyle = 'red';
    c.beginPath();
    // c.drawImage(image,birdPositionX, birdPositionY, birdRadius, birdRadius);
    c.arc(birdPositionX, birdPositionY, birdRadius, 0, 2 * Math.PI);
    c.fill();   
}
function drawPipe(){
    c.fillStyle = "green";
    c.fillRect (pipeX, pipeY, pipeWidth, pipeHeight);
  
    c.fillStyle = "white";
    c.fillRect (holeX, holeY, holeWidth, holeHeight);
}
function animatePipe(){
    pipeX = pipeX - pipeSpeed;
    holeX = pipeX;
    if((pipeX + pipeWidth) < 0){
        pipeX = pipeInitialPositionX;
        holeY = Math.floor(Math.random() * (holeYMax - holeYMin) + holeYMin);
    }
}
function detectCollision(){
    if(pipeX <= (birdPositionX + birdRadius) && (pipeX + pipeWidth) >= birdPositionX){
        if(!(birdPositionY >= holeY && (birdPositionY + birdRadius) < (holeY + holeHeight))){
            collision = 'collided';
            gameOver = 'true';
        }
    } 
}
function inputHandler(){
    window.addEventListener('keyup', function(event){
        if(((birdPositionY + birdRadius) < canvasHeight) && collision == 'notCollided') {  
            if(event.key == " "){
                jumpStatus = "true";
                birdPositionY =  birdPositionY - 30;
            }
        }
    })
}
inputHandler();
function gravity(){
    if((birdPositionY + birdRadius) < canvasHeight) {
        if(jumpStatus == "false"){
            birdPositionY = birdPositionY + 3;
        }
    }
}
function scoreText(){
    c.font = "30px Arial";
    c.fillText(score, canvasWidth - 100, 50);
}
function gameOverText(){
    if(gameOver == 'true'){
        c.font = "30px Arial";
        c.textAlign = "center";
        c.fillText("GameOver", canvasWidth/2, canvasHeight/2);
    }
}
function checkGameOver(){
    if((birdPositionY + birdRadius) >= canvasHeight){
        gameOver = 'true';
    }
}
function loop(timestamp){
    if(loopStartTime == undefined){
        loopStartTime = timestamp;
    }
    loopTimeElapsed = timestamp - loopStartTime;
    if(loopTimeElapsed >= 300){
        jumpStatus = "false"
        loopStartTime = timestamp;
        if( collision == 'notCollided'){
            score = score + 1;
        }
    }
    requestAnimationFrame(loop);
    c.clearRect(0,0, canvasWidth, canvasHeight);
    drawCanvas();
    drawPipe();
    drawBird();
    animatePipe();
    detectCollision()
    gravity();
    scoreText();
    checkGameOver();
    gameOverText();
}
