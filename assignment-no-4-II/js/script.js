const main = document.getElementById('main');
const mainWidth = 800;
const mainHeight = 600;

//setting main div height and width
main.style.height = mainHeight + "px";
main.style.width = mainWidth + "px";

var div = [];
for( var i = 0; i < 2; i++){
    div[i] = document.createElement('div');
    main.appendChild(div[i]);
    div[i].id = "box" + [i];
}

var box1Container = document.getElementById('box0');
var box2Container = document.getElementById('box1');

var box1 = {
    height: 50,
    width: 50,
    speed: 1,
    position:{
            x: 100,
            y: 0,
        },
    direction:{
            x: 1,
            y: 1,
        },   
}
//console.log(box1.position.x);


//console.log(box1BottomEdge);
var box2 = {
    height: 150,
    width: 150,
    speed: 1,
    position:{
            x: 300,
            y: 100,
        },
    direction:{
            x: -1,
            y: 1,
        },   
}

function animation(){
    box1Container.style.backgroundColor = "brown";
    box1Container.style.position = "absolute";
    box1Container.style.height = box1.height + "px";
    box1Container.style.width = box1.width + "px";
    
    box2Container.style.backgroundColor = "green";
    box2Container.style.position = "absolute";
    box2Container.style.height = box2.height + "px";
    box2Container.style.width = box2.width + "px";
    
    let startAnimation = setInterval(function(){
        box1Container.style.left = box1.position.x + "px";
        box1Container.style.top = box1.position.y + "px";
        
        box2Container.style.left = box2.position.x + "px";
        box2Container.style.top = box2.position.y + "px";
        
        
        //setting edge value of box1 for collision detection
        var box1LeftEdge = box1.position.x;
        var box1RightEdge = box1.position.x + box1.width;
        var box1TopEdge = box1.position.y;
        var box1BottomEdge = box1.position.y + box1.height;

        //setting edge value of box2 for collision detection
        var box2LeftEdge = box2.position.x;
        var box2RightEdge = box2.position.x + box2.width;
        var box2TopEdge = box2.position.y;
        var box2BottomEdge = box2.position.y + box2.height;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        function changeColor1(){
            box1Container.style.backgroundColor = '#' + randomColor;
        }
        function changeColor2(){
            box2Container.style.backgroundColor = '#' + randomColor;
        }

        if(box1RightEdge == box2LeftEdge && box1TopEdge <= box2BottomEdge && box1BottomEdge >= box2TopEdge){
            box1.direction.x = box1.direction.x * -1;
            box2.direction.x = box2.direction.x * -1;
            changeColor1();
            changeColor2();
        }
        if(box1LeftEdge == box2RightEdge && box2BottomEdge >= box1TopEdge && box2TopEdge <= box1BottomEdge){
            box1.direction.x = box1.direction.x * -1;
            box2.direction.x = box2.direction.x * -1;           
            changeColor1();
            changeColor2();
            debugger;
        }
        if(box1TopEdge == box2BottomEdge && box1LeftEdge <= box2RightEdge && box1RightEdge >= box2LeftEdge){
            box1.direction.y = box1.direction.y * -1;
            box2.direction.y = box2.direction.y * -1;
            changeColor1();
            changeColor2();
        }
        
        if(box2TopEdge == box1BottomEdge && box2LeftEdge <= box1RightEdge && box2RightEdge >= box1LeftEdge){;
            box1.direction.y = box1.direction.y * -1;
            box2.direction.y = box2.direction.y * -1;
            changeColor1();
            changeColor2();
        }
        box1.position.x = box1.position.x + box1.speed * box1.direction.x;
        box1.position.y = box1.position.y + box1.speed * box1.direction.y;
   
        box2.position.x = box2.position.x + box2.speed * box2.direction.x;
        box2.position.y = box2.position.y + box2.speed * box2.direction.y;

        //checking overflow of boxes
        if( (box1.position.x + box1.width) > mainWidth ){
            box1.position.x = mainWidth -  box1.width;
        }
        if(  box1.position.x < 0 ){
            box1.position.x = 0;
        }
        if( (box1.position.y + box1.height) > mainHeight ){
            box1.position.y = mainHeight -  box1.height;
        }
        if(  box1.position.y < 0 ){
            box1.position.y = 0;
        }
   
        if( (box2.position.x + box2.width) > mainWidth ){
            box2.position.x = mainWidth -  box2.width;
        }
        if(  box2.position.x < 0 ){
            box2.position.x = 0;
        }
        if( (box2.position.y + box2.height) > mainHeight ){
            box2.position.y = mainHeight -  box2.height;
        }
        if(  box2.position.y < 0 ){
            box2.position.y = 0;
        }

        //change the direction if collision occurs
        if((box1.position.x + box1.width) >= mainWidth || box1.position.x <= 0){
            box1.direction.x = box1.direction.x * -1;
            changeColor1();
        }

        if((box1.position.y + box1.height) >= mainHeight || box1.position.y <= 0){
            box1.direction.y = box1.direction.y * -1;
            changeColor1();
        }

        if((box2.position.x + box2.width) >= mainWidth || box2.position.x <= 0){
            box2.direction.x = box2.direction.x * -1;
            changeColor2();
        }

        if((box2.position.y + box2.height) >= mainHeight || box2.position.y <= 0){
            box2.direction.y = box2.direction.y * -1;
            changeColor2();
        }

    },10)
}

animation();



for(var i=0; i<10; i++){
    setTimeout(function(){
        console.log(i);
    },1000)
}

for(var j=0; j<10; j++){
    setTimeout(function(val){
        return function(){
            console.log(val);
        };
    }(j), 1000);
}
