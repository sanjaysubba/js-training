const boxes = document.querySelectorAll('.box');
const mole = document.querySelector('.mole');
const countDown = document.getElementById('countdown')
const score = document.getElementById('score')
const scoreMessage = document.getElementById('score-message');
const endMessage = document.getElementById('end-message');
const playAgain = document.getElementById('play-again');
var count = 10;
countDown.innerText =  count;
var scoreNumber = 0;
score.innerText = 'your score: ' + scoreNumber;
var randomPosition;
var boxid = 0
let addMole;
let timer;

//adding mole
function start(){
    addMole = setInterval(function(){
        boxes.forEach( box => {
            box.classList.remove('mole');
            box.style.backgroundImage = '';
        })
        
        randomPosition = Math.floor(Math.random() * 9);
        boxes[randomPosition].classList.add("mole");

        
        for( var i = 0; i<boxes.length; i++){
            boxes[i].id = i;
        }    
        
    }, 1000);
}
start();

//adding countdown and clearing interval when countdown reaches 0
function end(){
    timer = setInterval( function(){
        count --;
        countDown.innerText =  count;
        if( count == 0 ){
            clearInterval(addMole);
            clearInterval(timer);
            endMessage.style.display = "block";
            scoreMessage.innerText = 'Your Final Score is ' + scoreNumber;
        }
    },1000)
}
end();

//On hit event
for( var i = 0; i<boxes.length; i++){
    (function(i){
        boxes[i].addEventListener('mousedown', function(){
            if(boxes[i].id == randomPosition){
                scoreNumber = scoreNumber + 2;
                score.innerText = 'your score: ' + scoreNumber;
                boxes[i].id = '';
                const mole = document.querySelector('.mole');
                mole.style.backgroundImage = "url('img/dead-mole-2.jpg')";
                }
            });
    })(i);
}

playAgain.addEventListener('click', function(){
    
    endMessage.style.display = "none";
    count = 10;
    scoreNumber = 0;
    start();
    end();
})
