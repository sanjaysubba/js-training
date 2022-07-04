const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var paddlePositionY;
var paddlePositionX;
var paddleHeight;
var paddleWidth;
var paddlePressed = false;
var initialDragX;
var ballPositionX;
var ballPositionY;
var ballVelocityX = 5;
var ballVelocityY = 5;
var ballRadius = 10;
var gamePlayStatus = 'notStarted';
var life = 3;
var brickWidth;
var brickOffset;
var brick;
var levels;
var score = 0;
let damage = [];
let bricks = [];
let brickLevel = [{
    lvl : [
    [1,1,1,2,0],
    [0,0,0,0,0],
    [3,0,0,0,0]],
},
{
    lvl : [
    [2,1,2,1,2],
    [1,1,1,1,1],
    [1,1,1,2,1]],
},
{
    lvl : [
    [2,1,2,1,2],
    [1,1,1,1,1],
    [1,1,1,2,1]],
},
];
var level = 0;
var menuList = 3;
var menuPositionX = 100;
var menuPositionY = 100;
var menuHeight = 500;
var menuWidth = 1200;
var menuOffset = 60;
var text = ["Play","Control","Highscore"]
var textPositionX = [];
var textPositionY = [];
var clr = [];
var textWidth = [];
textPositionY[0] =  300
for(var i=0; i<menuList; i++){
    clr[i]= "#fff";
    textPositionX[i] = (menuWidth + menuPositionX)/2;
    if(i != 0){
        textPositionY[i] = textPositionY[i-1] + menuOffset;
    }
}
const crack = new Image();
crack.src = 'image/crack-2.png';
const heart = new Image();
heart.src = 'image/Heart-image.png'
const hulk = new Image();
hulk.src = 'image/hulk.png'

var powerupPositionX = [];
var powerupPositionY = [];
var powerUpStatus = [];
var initialPaddleWidth = 0;

function menu(){
    canvas.height = window.innerHeight - 1;
    canvas.width = window.innerWidth - 0.5;
    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.fillRect(menuPositionX,menuPositionY,menuWidth,menuHeight);
    for(var i=0; i<menuList; i++){
        c.font = "30px Arial";
        c.fillStyle = "#fff";
        c.textAlign = "center";
        textWidth[i] = c.measureText(text[i]).width;
        c.strokeStyle = "#fff";
        // c.rect(textPositionX[i] - (textWidth[i]/2), textPositionY[i]-30, textWidth[i], 30);
        // c.stroke();
        c.fillStyle = clr[i];
        c.fillText(text[i], textPositionX[i], textPositionY[i]);  
    }
}
function gameMenu(){
    menu();
    requestAnimationFrame(gameMenu);
}
requestAnimationFrame(gameMenu);
function init(){
    canvas.height = window.innerHeight - 1;
    canvas.width = window.innerWidth - 0.5;
    paddleHeight = 20;
    paddleWidth = 100;
    paddlePositionY = canvas.height - 100;
    paddlePositionX = canvas.width/2 - this.paddleWidth/2;
    c.fillStyle = '#000';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'red';
    c.fillRect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
    c.strokeStyle = "#fff";
    c.lineWidth = 4;
    c.strokeRect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
    ballPositionX = paddlePositionX + (paddleWidth/2);
    ballPositionY = paddlePositionY - ballRadius;
    c.beginPath();
    c.arc(ballPositionX, ballPositionY, 10, ballRadius, 2 * Math.PI);
    c.stroke();
    brickWidth = canvas.width/6;
    brickOffset = brickWidth/6;
    brick = {
        row : 3,
        column : 5,
        width : brickWidth,
        height : 20,
        offsetLeft : brickOffset,
        offsetTop : 20,
        marginTop : 40,
        fillColor : 'red',
        strokeColor : 'white',
    };
  
    
    levels = brickLevel[level].lvl;
}
init();

function drawCanvas(){
    c.fillStyle = '#000';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'red';
    c.fillRect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
    c.strokeStyle = "#fff";
    c.lineWidth = 4;
    c.strokeRect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
}
function drawText(){ 
    c.textAlign = "right";
    c.fillStyle = "#fff";
    c.fillText("your score: " + score , canvas.width - 50, 50); 
    c.fillText("Highscore: " + localStorage.getItem("highscores") , canvas.width - 50, 100);  
    c.textAlign = "left";
    var heartPositionX = 10;
    for( var i = 0; i< life; i++){
        c.drawImage(heart, heartPositionX, 10, 25, 25);
        heartPositionX = heartPositionX + 35;
    }
}
    
function reset(){
    addEventListener('resize', ()=>{
        if(gamePlayStatus == 'start'){
            init();
            createBricks();
        }
    });
}
reset();
function playGame(){
    addEventListener('keypress', (event)=>
    {
        console.log(gamePlayStatus)
        if(event.key == " " && gamePlayStatus == 'start'){
            ballVelocityY = -1;
            gamePlayStatus = 'play';
            
            // ballVelocityX = 0;
        }
    })
}
playGame();
function drawBall(){
    if(gamePlayStatus == 'play'){
        ballPositionX = ballPositionX + ballVelocityX;
        ballPositionY = ballPositionY + ballVelocityY;
    }
    else{
        ballPositionY = paddlePositionY - ballRadius;
        ballPositionX = paddlePositionX + (paddleWidth/2);
    }
    c.beginPath();
    c.arc(ballPositionX, ballPositionY, ballRadius, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
}

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let col = 0; col < brick.column; col++){
            let brickStatus = levels[r][col];
            if(brickStatus == 1 ){
                bricks[r][col] = {
                    x : col * (brick.width + brick.offsetLeft) + brick.offsetLeft,
                    y : r * (brick.height + brick.offsetTop) + brick.offsetTop + brick.marginTop,
                    status: true,
                    damage: 1,
                }
            }
            else if(brickStatus == 2 ){
                bricks[r][col] = {
                    x : col * (brick.width + brick.offsetLeft) + brick.offsetLeft,
                    y : r * (brick.height + brick.offsetTop) + brick.offsetTop + brick.marginTop,
                    status: true,
                    damage: 2,
                }
            }
            
            else{
                bricks[r][col] = {
                    x : col * (brick.width + brick.offsetLeft) + brick.offsetLeft,
                    y : r * (brick.height + brick.offsetTop) + brick.offsetTop + brick.marginTop,
                    status: false,
                    damage: -1,
                }
            }
        }
    }
}
createBricks();
function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let col = 0; col<brick.column; col++){
            let b = bricks[r][col];
            let brickStatus = levels[r][col];
            if(b.status == true || brickStatus == 3){
                if(brickStatus == 2){
                    c.fillStyle = 'blue';
                    if(b.damage == 1){
                        c.beginPath();
                        c.fillRect(b.x, b.y, brick.width, brick.height);
                        c.strokeRect(b.x, b.y, brick.width, brick.height);
                        c.drawImage(crack, b.x, b.y, brick.width, brick.height);
                    }
                    else{
                        c.fillRect(b.x, b.y, brick.width, brick.height);
                        c.strokeRect(b.x, b.y, brick.width, brick.height);

                    }
                }
                else if(brickStatus ==3){
                    c.fillStyle = 'gray';
                    b.status = false;
                    c.fillRect(b.x, b.y, brick.width, brick.height);
                    c.strokeRect(b.x, b.y, brick.width, brick.height);
                }
                else{
                    c.fillStyle = 'red';
                    c.fillRect(b.x, b.y, brick.width, brick.height);
                    c.strokeRect(b.x, b.y, brick.width, brick.height);
                }
            }
        }
    }
}


function wallCollision(){
    if((ballPositionX - ballRadius) <= 0 || ( ballPositionX + ballRadius ) > canvas.width){
        ballVelocityX = ballVelocityX * -1;
    }
    if((ballPositionY - ballRadius)<= 0 ){
        ballVelocityY = ballVelocityY * -1;
    }
}


function brickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let col = 0; col < brick.column; col++){
            let b = bricks[r][col];
            let brickStatus = levels[r][col];
            if(b.status == true || brickStatus == 3){
                if( (ballPositionY - ballRadius) < (b.y + brick.height) && (ballPositionX + ballRadius) >= b.x && (ballPositionX - ballRadius) <= (b.x + brick.width) && (ballPositionY + ballRadius) > b.y ){
                   if(brickStatus == 1){
                       b.status = false;
                       score = score + 2;
                       powerupPositionX.push(ballPositionX);
                       powerupPositionY.push(ballPositionY);
                       var random = Math.floor((Math.random() * 5) + 1);
                       if( random == 1){
                            powerUpStatus.push(true);
                        }
                    }
                    else if(brickStatus == 2){
                        b.damage = b.damage - 1;
                        if(b.damage <= 0){
                            score = score + 2;
                            b.status = false;
                        }
                    }
                    ballVelocityY = ballVelocityY * -1;
                    highScore();
                }
            }
        }
    }
}
function paddleCollision(){
    if((ballPositionX + ballRadius) > paddlePositionX && ( ballPositionX - ballRadius ) < (paddlePositionX + paddleWidth) &&  ( ballPositionY + ballRadius ) > paddlePositionY  && ( ballPositionY - ballRadius ) < (paddlePositionY + paddleHeight)){
        // ballVelocityY = ballVelocityY * -1; 
        let collidePoint = ballPositionX - (paddlePositionX + (paddleWidth / 2));
         collidePoint = collidePoint / (paddleWidth / 2);

         let angle = collidePoint * Math.PI/3;
        // console.log(angle);
         ballVelocityX = 5 * Math.sin(angle);
         ballVelocityY = -5 * Math.cos(angle);
    } 
    for( let i = 0; i < powerupPositionX.length; i++){
        if(powerupPositionX[i] > paddlePositionX && powerupPositionX[i] < (paddlePositionX + paddleWidth) &&   powerupPositionY[i] > (paddlePositionY - paddleHeight)  && powerupPositionY[i]< (paddlePositionY + paddleHeight) && powerUpStatus[i] == true){
            powerUps();
            powerUpStatus[i] = false;
        }
    }
}
function drawPowerUp(){
    // console.log(powerupPositionY);
    for( let i = 0; i < powerupPositionX.length; i++){
        if(powerUpStatus[i] == true){
            c.drawImage(hulk, powerupPositionX[i], powerupPositionY[i], 25, 25);
            powerupPositionY[i] = powerupPositionY[i] + 1;
        }
        if(powerupPositionY[i] >= canvas.height){
            powerUpStatus[i] = false;
        }
    }
}
function powerUps(){
    if(initialPaddleWidth == 0){
        initialPaddleWidth = paddleWidth;
        paddleWidth = paddleWidth * 2;
        setTimeout(function(){
            paddleWidth = initialPaddleWidth;
            initialPaddleWidth = 0;
        }, 5000);
    }
}
function levelup(){
    let levelCompleted = true;
    for(let r = 0; r < brick.row; r++){
        for(let col = 0; col < brick.column; col++){
            let b = bricks[r][col];
            levelCompleted = levelCompleted && !b.status;
        }
    }
    if(levelCompleted == true){
        gamePlayStatus = 'start';
        level ++;
        init();
        createBricks();
        console.log('mylevel: '+ level);
        powerupPositionX = [];
    }
}
function death(){
    if(( ballPositionY + ballRadius ) >= canvas.height){
        gamePlayStatus = 'start';
        life --;
        init();
        powerupPositionX = [];
    }
}

function paddleDrag(){
    addEventListener('mousedown', (event)=>{
        if(event.x > paddlePositionX && event.x < (paddlePositionX + paddleWidth) && event.y > paddlePositionY && event.y < (paddlePositionY + paddleHeight)){
            paddlePressed = true;
            initialDragX = event.x - paddlePositionX;
        }
    })
    addEventListener('mouseup', (event) =>{
        if(event.x > 0 && event.x < canvas.width && event.y > 0 && event.y < canvas.height){
            paddlePressed = false;
        }
    })
    addEventListener('mousemove', (event) =>{
        if(paddlePressed == true){
            paddlePositionX = event.x - initialDragX;
            if(paddlePositionX <=  0){
                paddlePositionX = 0;
            }
            if( (paddlePositionX + paddleWidth) >= canvas.width){
                paddlePositionX = canvas.width - paddleWidth;
            }
        }
    })
}
paddleDrag();

function gameloop(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
    drawBricks();
    drawBall();
    drawText();
    if(gamePlayStatus == 'play'){
        wallCollision();
        paddleCollision();
        brickCollision();
        levelup();
        death();
    }
    for( let i = 0; i < powerupPositionX.length; i++){
        if(powerUpStatus[i] == true){
            drawPowerUp(); 
        }
    }
    requestAnimationFrame(gameloop);

}

function showHighScore(){
    c.fillStyle = '#000';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.textAlign = "center";
    c.fillStyle = "#fff";
    c.fillText(localStorage.getItem("highscores") , canvas.width/2, canvas.height/2); 
    requestAnimationFrame(showHighScore);
}
function highScore(){
    let hs = localStorage.getItem("highscores");
    if(hs){
        if(score > hs){
            localStorage.setItem("highscores", score);
        }
    }else{
        localStorage.setItem("highscores", "0");
    }
    console.log('highscore:' + hs);
}
highScore();

function updateMenu(){
    for(let i=0; i<menuList; i++){
        addEventListener('mousemove', function(e){
            if( e.x > (textPositionX[i] - (textWidth[i]/2)) && e.x < (textPositionX[i] + (textWidth[i]/2)) && e.y < textPositionY[i] && e.y > (textPositionY[i] - menuOffset)){
                clr[i] ='blue';
            }
            else{
                clr[i] = 'white';
            }
            })

        addEventListener('click', function(e){
            if( e.x > (textPositionX[i] - (textWidth[i]/2)) && e.x < (textPositionX[i] + (textWidth[i]/2)) && e.y < textPositionY[i] && e.y > (textPositionY[i] - menuOffset) && gamePlayStatus == 'notStarted'){
                switch(i){
                    case 0 : 
                        gamePlayStatus = 'start';
                        cancelAnimationFrame(gameMenu);
                        init();
                        requestAnimationFrame(gameloop);
                        break;
                    case 1:
                        console.log(i);
                        break;
                    case 2:
                        console.log(i);
                        
                        cancelAnimationFrame(gameMenu);
                        requestAnimationFrame(showHighScore);
                        break;
                }
            }
            else{
                clr[i] = 'white';
            }
        })
    }  
}updateMenu();

