const nav = document.querySelector('.navLinks')
const burger = document.querySelector('.burger')

function toggleMeny() {
    
    document.querySelector('.navLinks').classList.toggle('navActive')
    document.querySelector('.burger').classList.toggle('toggle')
}

document.querySelector('.burger').addEventListener('click', toggleMeny)

const box = document.querySelector('.notificationBox')
const button = document.querySelector('.notifications')

function toggleBox() {
      document.querySelector('.notificationBox').classList.toggle('navActive')
}

document.querySelector('.notifications').addEventListener('click', toggleBox)

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

///stopp

function AddReminder(title,time,day,month,year) {

        let box = document.createElement('div');
        box.innerHTML = `
    <p>${title}</p>
    <p>${time}</p>
    <p>${day}</p>
    <p>${month}</p>
    <p>${year}</p>
        `;
        console.log(box);
        document.querySelector('.instruktion').style.display = "none";
        document.querySelector('.myReminder').style.display = "flex";
        document.querySelector('.reminder').style.display = "flex"; 
        document.querySelector('.reminder').appendChild(box);
        modal.style.display = "none";
  
    }

document.querySelector('#myModal').addEventListener('submit', function(e) {
  e.preventDefault();
    let title = document.querySelector('#titel').value;
    let time = document.querySelector('#deadline-hours').value;
    let day = document.querySelector('#deadline-day').value;
    let month = document.querySelector('#deadline-month').value;
    let year = document.querySelector('#deadline-year').value;

AddReminder(title,time,day,month,year);


});
