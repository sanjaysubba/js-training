const canvas = document.querySelector('canvas');
const canvasHeight = 600;
const canvasWidth = 800;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const pi = Math.PI;

const ctx = canvas.getContext('2d');

// arc(x, y, radius, startAngle, endAngle)
var circle1 = {
    x: 100,
    y: 100,
    speed: 5,
    direction:{
        x: 1,
        y: 1,
    },
    radius: 50,
}
var circle2 = {
    x: 200,
    y: 300,
    speed: 5,
    direction:{
        x: 1,
        y: 1,
    },
    radius: 50,
}
function calculateDistance(x1, y1, x2, y2){
    let x = x2 - x1;
    let y = y2 - y1;
    
    let distance = Math.sqrt(Math.pow(x, 2) + (Math.pow(y, 2)));
    
    return distance;
}
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.beginPath();
    ctx.arc(circle1.x, circle1.y, circle1.radius, 0, 2 * pi);
    ctx.stroke();
    if((circle1.x + circle1.radius) > canvasWidth || (circle1.x - circle1.radius) < 0){
        circle1.direction.x = -circle1.direction.x;
    }
    if((circle1.y + circle1.radius) > canvasHeight || (circle1.y - circle1.radius) < 0){
        circle1.direction.y = -circle1.direction.y;
    }
    // let distance = calculateDistance(circle1.x, circle1.y, circle2.x, circle2.y);
    // console.log(distance);
    // if( distance <= (circle1.radius + circle2.radius)){
    //     circle1.direction.x = -circle1.direction.x;
    //     circle2.direction.x = -circle2.direction.x;
    //     circle1.direction.y = -circle1.direction.y;
    //     circle2.direction.y = -circle2.direction.y;
    // }
    circle1.x = circle1.x + circle1.speed * circle1.direction.x;
    circle1.y = circle1.y + circle1.speed * circle1.direction.y;
    

    ctx.beginPath();
    ctx.arc(circle2.x, circle2.y, circle2.radius, 0, 2 * pi);
    ctx.stroke();
    if((circle2.x + circle2.radius) > canvasWidth || (circle2.x - circle2.radius) < 0){
        circle2.direction.x = -circle2.direction.x;
    }
    if((circle2.y + circle2.radius) > canvasHeight || (circle2.y - circle2.radius) < 0){
        circle2.direction.y = -circle2.direction.y;
    }
    circle2.x = circle2.x + circle2.speed * circle2.direction.x;
    circle2.y = circle2.y + circle2.speed * circle2.direction.y;

}
animate();
