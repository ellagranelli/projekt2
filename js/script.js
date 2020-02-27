const nav = document.querySelector('.navLinks')
const burger = document.querySelector('.burger')

function toggleMeny() {
    
    document.querySelector('.navLinks').classList.toggle('navActive')
    document.querySelector('.burger').classList.toggle('toggle')
}

document.querySelector('.burger').addEventListener('click', toggleMeny)

const box = document.querySelector('.notificationsBox')
const button = document.querySelector('.notifications')

function toggleMeny() {
    document.querySelector('.notificationsBox').classList.toggle('navActive')
}

document.querySelector('.notifications').addEventListener('click', toggleMeny)

//Modal 
var modal = document.getElementById("myModal");

var btn = document.querySelector(".plus");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}