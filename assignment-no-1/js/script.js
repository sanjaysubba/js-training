var mainDiv = document.getElementById("mainDiv");
var firstDiv = document.createElement("div");
var firstChildDiv = document.createElement("div");
var secondChildDiv = document.createElement("div");
var secondDiv = document.createElement("div");
secondDiv.className = "notes";
mainDiv.appendChild(firstDiv);
firstDiv.appendChild(firstChildDiv);
firstDiv.appendChild(secondChildDiv);
mainDiv.appendChild(secondDiv);

mainDiv.style.display = "flex";
mainDiv.style.justifyContent = "space-around";
mainDiv.style.alignItems = "center";
mainDiv.style.width = "60%";
mainDiv.style.margin = "auto";
mainDiv.style.padding = "20px";
mainDiv.style.border = "1px solid red";

firstDiv.style.width = "40%";
secondDiv.style.width = "60%";

var imageElement = document.createElement("img");
imageElement.src = "img/me1.jpg";
imageElement.style.borderRadius = "50%";
firstChildDiv.appendChild(imageElement);

var nameElement = document.createElement("p");
var Name = document.createTextNode("Name: Sanjay Subba");
secondChildDiv.appendChild(nameElement);
nameElement.appendChild(Name);

var phoneElement = document.createElement("p");
var phone = document.createTextNode("Phone: +977-9813017303");
secondChildDiv.appendChild(phoneElement);
phoneElement.appendChild(phone);

var emailElement = document.createElement("p");
var Email = document.createTextNode("Email: sanjay.subba@outside.tech");
secondChildDiv.appendChild(emailElement);
emailElement.appendChild(Email);

var notesElement = document.createElement("p");
var notes = document.createTextNode("I am a Web Developer");
secondDiv.appendChild(notesElement);
notesElement.appendChild(notes);
notesElement.style.fontSize = "96px";
notesElement.style.fontWeight = "bold";
notesElement.style.textAlign = "center";




