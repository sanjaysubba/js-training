var slider = document.querySelector(".slider-wrap");
var slidesCount = document.querySelectorAll(".slide");
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var position = 0;
var finalPosition = (slidesCount.length - 1 ) * 100;
console.log(finalPosition);
var direction = "normal";

//creating dots
var dotsContainer = document.querySelector(".carousel-dots");
for(var i = 0; i < slidesCount.length; i++){
    var dotsElement = document.createElement("div");
    var dots = dotsContainer.appendChild(dotsElement);
    if(i == 0){
        dots.className = "dots active";
    }
    else{
        dots.className = "dots";
    }
}

/*=============================
infinite autoplay without hold 
==============================*/

// setInterval(function(){
//     if(position <= 200 && direction == "normal"){
//         slider.style.left = "-" + position + "%";
//         position += 10;
//         if(position==200){
//             direction = "reverse";
//         }
//     }
    
//     if(position <= 200 && direction == "reverse"){
//         slider.style.left = "-" + position + "%";
//         position -= 10;
//         if(position==0){
//             direction = "normal";
//         }
//     } 
// },100);

/*==========================
infinite autoplay with hold
===========================*/
//autoplay
// function abc(){
//     let currentPosition = position;
//     let nextPosition = position + 100;
//     let smallInterval = setInterval(function(){
//         if(position <= finalPosition && direction == "normal"){
//             slider.style.left = "-" + position + "%";
//             position += 10;
//             if(currentPosition == finalPosition){
//                 direction = "reverse";
//             }
//         }
        
//         if(position <= finalPosition && direction == "reverse"){
//             slider.style.left = "-" + position + "%";
//             position -= 10;
//             if(position==0){
//                 direction = "normal";
//             }
//         } 
//         if( position >= nextPosition){
//             clearInterval(smallInterval);
//         }
//     },100);
// }
// setInterval(abc, 5000)
//onclick slide
var xyz = document.querySelectorAll(".dots")
var activeDots;
var lastActiveDots=0;
prev.addEventListener('click', function(){
    
    if( position != 0){
        lastActiveDots = position / 100;
        activeDots = position / 100 - 1;
    }
    else{
        activeDots = finalPosition / 100;
        lastActiveDots = 0;
    }
    xyz[lastActiveDots].className = "dots";
    xyz[activeDots].className += " active";

    if( position == 0){
        position = finalPosition;
        slider.style.left = "-" + position + "%";
    }
    else{
        position -= 100;
        slider.style.left = "-" + position + "%";
    }
})

next.addEventListener('click', function(){
       
    if( position != finalPosition){
        lastActiveDots = position / 100;
        activeDots = position / 100 + 1;
    }
    else{
        activeDots = 0;
        lastActiveDots = finalPosition / 100;
    }
    xyz[lastActiveDots].className = "dots";
    xyz[activeDots].className += " active";

    if( position == finalPosition){
        position = 0;
        slider.style.left = "-" + position + "%";
    }
    else{
        position += 100;
        slider.style.left = "-" + position + "%";
    }
})
