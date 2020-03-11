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
      document.querySelector('.notifications').classList.toggle('toggle')
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

function AddReminder() {

        let box = document.createElement('div');
        box.innerHTML = `
    <p>${newreminder.title}</p>
    <p>${newreminder.time}</p>
    <p>${newreminder.day}</p>
    <p>${newreminder.month}</p>
    <p>${newreminder.year}</p>
        `;
        document.querySelector('.instruktion').style.display = "none";
        document.querySelector('.text').style.display = ""
        document.querySelector('.påminnelse').appendChild(row);
    }

document.querySelector('#myModal').addEventListener('submit', function(e) {
    let title = document.querySelector('#titel').value;
    let time = document.querySelector('#deadline-hours').value;
    let day = document.querySelector('#deadline-day').value;
    let month = document.querySelector('#deadline-month').value;
    let year = document.querySelector('#deadline-year').value;

let newreminder = new reminder(title,time,day,month,year);

newreminder.AddReminder(newreminder);

e.preventDefault();
});
