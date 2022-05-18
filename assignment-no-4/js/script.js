var main = document.getElementById("main");
var box = document.getElementById("box");
var box2 = document.getElementById("box2");

var mainHeight = 500;
var mainWidth = 700;

var boxHeight = 20;
var boxWidth = 20;


var positionY = 0;
var finalPositionX = mainWidth - boxWidth;
var finalPositionY = mainHeight - boxHeight;
var positionX = 0;
var positionXBox2 = finalPositionX;
var speed = 1;

main.style.width = mainWidth + "px";
main.style.height = mainHeight + "px";

box.style.width = boxWidth + "px";
box.style.height = boxHeight + "px";
box2.style.width = boxWidth + "px";
box2.style.height = boxHeight + "px";

var boxRightEdge;
var directionX = 1;
var directionXBox2 = -1;
// var directionY = 1;
setInterval(function(){
    boxRightEdge = positionX + boxWidth;
    console.log(boxRightEdge);
    box.style.left = positionX + "px";
    box2.style.left = positionXBox2 + "px";
    // box.style.top = positionY + "px";
    if(positionXBox2 == boxRightEdge){
        directionXBox2 = directionXBox2 * -1;
        directionX = directionX * -1;
    }
    positionX = positionX + speed * directionX ;
    positionXBox2 = positionXBox2 + speed * directionXBox2 ;
    // positionY = positionY + speed * directionY ;
    //console.log(positionXBox2);
    if(positionX >= finalPositionX){
        directionX = directionX * -1;
    } 
    if( positionX <= 0){
        directionX = directionX * -1;
    }
    if(positionXBox2 >= finalPositionX){
        directionXBox2 = directionXBox2 * -1;
    } 
    if( positionXBox2 <= 0){
        directionXBox2 = directionXBox2 * -1;
    }

    if(boxRightEdge === 359) {
        console.log(positionXBox2);
        console.log(positionX);
        console.log(boxRightEdge);
    }
    // if(positionY >= finalPositionY){
    //     directionY = directionY * -1;
    // } 
    // if( positionY <= 0){
    //     directionY = directionY * -1;
    // }

},10)
