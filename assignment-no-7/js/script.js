const canvas = document.querySelector('canvas');
const canvasHeight = window.innerHeight - 10;
const canvasWidth = window.innerWidth;
canvas.height = canvasHeight;
canvas.width = canvasWidth
var c = canvas.getContext('2d');
var x = 150;
var y = canvasHeight - 50
var hitterWidth = 200;
c.fillRect(x, y, hitterWidth, 50);



function animate(val){
    c.clearRect(0, 0 , canvasWidth, canvasHeight)
    if(val == 'left'){
        if(x <= 0){
            c.fillRect(x, y, hitterWidth, 50);
        }else{
            c.fillRect(x -= 15, y, hitterWidth, 50);
        }
    }
    if(val == 'right'){
        if(x + hitterWidth >= canvasWidth){
            c.fillRect(x, y, hitterWidth, 50);
        }else{
            c.fillRect(x += 15, y, hitterWidth, 50);
        }
    }
    console.log(x);
}

/*================
defining ball
==================*/
var ball = {
    x : 120,
    y : 120,
    speed : {
        x : 5,
        y : 5,
    },
    radius : 30,
}
var initialBrickPOsitionX = 100;
var brickPositionX = initialBrickPOsitionX;
var brickPositionY = 100;
var brickWidth = 200;
var brickHeight = 50;
var gapX = 20;
var gapY = 40;
function drawBricks(){
    for( var i = 0; i < 3; i++){
        for( var j = 0; j<3; j++){
            c.fillRect(brickPositionX, brickPositionY, brickWidth, brickHeight);
            console.log(brickPositionX);
            brickPositionX = brickPositionX + brickWidth + gapX;
        }
        brickPositionX = initialBrickPOsitionX;
        brickPositionY = brickPositionY + brickHeight + gapY;
    }
}
drawBricks();
function animateBall(){
   // c.clearRect(0, 0 , canvasWidth, canvasHeight)
    // requestAnimationFrame(animateBall);
    
    /*defining bricks*/
    // c.fillRect(100, 50, 60, 20);
    // c.fillRect(300, 20, 60, 20);
    // c.fillRect(400, 80, 260, 20);
    // c.fillRect(800, 50, 260, 20);
    // c.fillRect(970, 80, 260, 20);


    c.fillRect(x, y, hitterWidth, 50);
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    c.stroke();
    if((ball.x + ball.radius) > canvasWidth || (ball.x - ball.radius) < 0){
        ball.speed.x = -ball.speed.x;
    }
    if((ball.y - ball.radius) < 0){
        ball.speed.y = -ball.speed.y;
    }
    
    if((ball.y + ball.radius) >= y && (ball.y + ball.radius) < (y + 5) &&  ball.x <= (x + hitterWidth) && (ball.x + ball.radius) >= x){
        ball.speed.y = -ball.speed.y;
    }
    if((ball.y + ball.radius) > canvasHeight){
        cancelAnimationFrame(animateBall);
    }
    ball.x = ball.x + ball.speed.x;
    ball.y = ball.y + ball.speed.y;
}
animateBall();
window.addEventListener('keydown', function(e){
    if(e.key == "ArrowLeft"){
        animate('left');
    }
    if(e.key == "ArrowRight"){
        animate('right');
    }
})
