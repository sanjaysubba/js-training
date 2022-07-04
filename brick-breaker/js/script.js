const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 0.5;
const c = canvas.getContext('2d');
class BrickBreaker{
    constructor(){
        this.paddleHeight = 20;
        this.paddleWidth = 100;
        // this.paddlePositionX;
        // this.paddlePositionY;
        this.paddlePositionY = canvas.height - 100;
        this.paddlePositionX = canvas.width/2 - this.paddleWidth/2;
        this.draw();
        this.redraw();
        this.paddleDrag();
        this.gameloop();
        this.paddlePressed;
        this.initialDragX;
        this.newDragX;
    }
  
    draw(){
        c.fillStyle = '#000';
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'red';
        c.fillRect(this.paddlePositionX, this.paddlePositionY, this.paddleWidth, this.paddleHeight);
        c.strokeStyle = "#fff";
        c.lineWidth = 4;
        c.strokeRect(this.paddlePositionX, this.paddlePositionY, this.paddleWidth, this.paddleHeight);
    }
    redraw(){
        addEventListener('resize', this.draw);
    }
    paddleDrag(){
        addEventListener('mousedown', (event)=>{
            if(event.x > this.paddlePositionX && event.x < (this.paddlePositionX + this.paddleWidth) && event.y > this.paddlePositionY && event.y < (this.paddlePositionY + this.paddleHeight)){
                this.paddlePressed = true;
                this.initialDragX = event.x;
                console.log(this.paddlePressed);
            }
        })
        addEventListener('mouseup', (event) =>{
            if(event.x > 0 && event.x < canvas.width && event.y > 0 && event.y < canvas.height){
                this.paddlePressed = false;
                console.log(this.paddlePressed);
            }
        })
        addEventListener('mousemove', (event) =>{
            if(this.paddlePressed == true){
                this.newDragX = event.x - this.initialDragX;
                this.paddlePositionX = this.paddlePositionX + this.newDragX;
            }
        })
    }
    gameloop(){
        c.clearRect(0, 0, canvas.width, canvas.height);
        this.draw;
       requestAnimationFrame(this.gameloop);
    }
}
let game = new BrickBreaker();
