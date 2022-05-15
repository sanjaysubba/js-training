/*==============================
js for digital Clock
==============================*/
var digitalWatchContainer = document.getElementById("digitalWatchContainer");

var timeFormat = document.createElement("div");
timeFormat.className = "timeFormat-container"
digitalWatchContainer.appendChild(timeFormat);

//inserting radio button input for 12 hour time format
var twelveHourTimeFormat = document.createElement("input");
twelveHourTimeFormat.setAttribute('type', 'radio');
twelveHourTimeFormat.setAttribute('name', 'timeFormat');
twelveHourTimeFormat.setAttribute('value', 'twelveHour');
twelveHourTimeFormat.setAttribute('checked', 'true');
timeFormat.appendChild(twelveHourTimeFormat);

var twelveHourTimeLabel = document.createElement("label");
twelveHourTimeLabel.htmlFor = twelveHourTimeFormat.name;
twelveHourTimeLabel.innerText = "12 hours";
timeFormat.appendChild(twelveHourTimeLabel);

//inserting radio input for 24 hour time format
var twentyFourHourTimeFormat = document.createElement("input");
twentyFourHourTimeFormat.setAttribute('type', 'radio');
twentyFourHourTimeFormat.setAttribute('name', 'timeFormat');
twentyFourHourTimeFormat.setAttribute('value', 'twentyFourHour');
timeFormat.appendChild(twentyFourHourTimeFormat);

var twentyFourHourTimeLabel = document.createElement("label");
twentyFourHourTimeLabel.htmlFor = twentyFourHourTimeFormat.name;
twentyFourHourTimeLabel.innerText = "24 hours";
timeFormat.appendChild(twentyFourHourTimeLabel);

var digitalWatch = document.createElement("div");
digitalWatchContainer.appendChild(digitalWatch);
digitalWatch.className = "digital-watch";
digitalWatch.innerText = "12:00:00 am";

function newTime(){
  const d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var timeAbbr;
  var currenTime;
  if(document.querySelector('input[value="twelveHour"]').checked){
    if(hours > 12){
      hours = hours - 12;
      timeAbbr = "pm";
    }
    else{
      timeAbbr = "am";
    }
  }

  if(hours < 10){
    hours = `0` + hours;
  }

  if(minutes < 10){
    minutes = `0` + minutes;
  }

  if(seconds < 10){
    seconds = `0` + seconds;
  }
  
  if(document.querySelector('input[value="twelveHour"]').checked){
    currenTime = hours + `:` + minutes + `:` + seconds + ' ' + timeAbbr;
  }
  else{
    currenTime = hours + `:` + minutes + `:` + seconds;
  }

  return currenTime;
}
function abc(){  
    digitalWatch.innerText = newTime();;  
}
setInterval(abc, 1000);

/*=======================
js for stopwatch
========================*/

var stopWatchContainer = document.getElementById("stopWatchContainer");
var stopwatch = document.createElement("div");
stopwatch.className = "stop-watch";
stopWatchContainer.appendChild(stopwatch);
stopwatch.textContent = "00 : 00 : 00 : 000";

//creating buttons for stopwatch
var btnContainer = document.createElement("div");
btnContainer.className = "btn-container"
stopWatchContainer.appendChild(btnContainer);

//buttons
var startBtn = document.createElement("button");
btnContainer.appendChild(startBtn);
startBtn.setAttribute('value', 'start');
startBtn.id = "start-btn";
startBtn.innerText = "start";

var resetBtn = document.createElement("button");
btnContainer.appendChild(resetBtn);
resetBtn.setAttribute('value', 'reset');
resetBtn.id = "reset-btn";
resetBtn.innerText = "reset";

var start = document.getElementById("start-btn");
var reset = document.getElementById("reset-btn");

function stopWatch(){
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var milliseconds = 0;
  var startInterval;
  start.addEventListener('click', function(){
    if(start.value == "start"){
      start.setAttribute('value', 'stop');
      start.innerText = "stop";
      startInterval = setInterval(function(){
        milliseconds += 5;
        if(milliseconds == 1000){
          milliseconds = 0;
          seconds ++;
          if(seconds == 60){
            seconds = 0;
            minutes ++;
            if(minutes == 60){
              minutes = 0;
              hours++;
            }
          }
        }
       let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
       let s = seconds < 10 ? "0" + seconds : seconds;
       let m = minutes < 10 ? "0" + minutes : minutes;
       let h = hours < 10 ? "0" + hours : hours;
        stopwatch.innerText = h + ' : '+ m + ' : ' + s + ' : ' + ms;
      }, 5)
    }
    else{
      start.setAttribute('value', 'start');
      start.innerText = "start";
      clearInterval(startInterval);
    }
  })

  reset.addEventListener('click', function(){ 
    clearInterval(startInterval);
    stopwatch.innerText = "00 : 00 : 00 : 000";
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    if(start.value == "stop"){
      start.value = "start";
      start.innerText = "start";
    }
  })

}
stopWatch();
