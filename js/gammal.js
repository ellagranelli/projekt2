let db;

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

const note = document.getElementById('enable');

let newItem = [
      { title: "", time: 0, day: 0, month: "", year: 0, notified: "no" }
    ];

//variabler
const taskList = document.getElementById('lista');
const taskForm = document.getElementById('task-form');
const title = document.getElementById('titel');
const time = document.getElementById('deadline-hours');
const day = document.getElementById('deadline-day');
const month = document.getElementById('deadline-month');
const year = document.getElementById('deadline-year');

const skapa = document.getElementById('skapa');

window.onload = function() {
  
    indow.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  const DBOpenRequest = window.indexedDB.open("toDoList", 4);

  DBOpenRequest.onerror = function(event) {
  };

  DBOpenRequest.onsuccess = function(event) {
    
    db = DBOpenRequest.result;

    displayData();
  };

  DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;


    let objectStore = db.createObjectStore("toDoList", { keyPath: "title" });

    objectStore.createIndex("time", "time", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });

    objectStore.createIndex("notified", "notified", { unique: false });

  };

  function displayData() {
    
    taskList.innerHTML = "";

    let objectStore = db.transaction('toDoList').objectStore('toDoList');
    objectStore.openCursor().onsuccess = function(event) {
      let cursor = event.target.result;
        if(cursor) {
          
            const listItem = document.createElement('li');

          listItem.innerHTML = cursor.value.title + ' — ' + cursor.value.time + ',' + cursor.value.month + ' ' + cursor.value.day + ' ' + cursor.value.year + '.';

          taskList.appendChild(listItem);

          const deleteButton = document.createElement('button');
          listItem.appendChild(deleteButton);
          deleteButton.innerHTML = 'X';
          deleteButton.setAttribute('data-task', cursor.value.title);
          deleteButton.onclick = function(event) {
            deleteItem(event);
          }

          cursor.continue();

      }
    }
  }

  taskForm.addEventListener('skapa',addReminder,false);
  
  function addReminder(title,time,day,month,year) {

    let box = document.createElement('div');
    box.innerHTML = `
        <h2>${title}</h2>
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

    let transaction = db.transaction(["toDoList"], "readwrite");

    let objectStore = transaction.objectStore("toDoList");

    let objectStoreRequest = objectStore.add(newitem[0]);
     objectStoreRequest.onsuccess = function(event) {

     };
    
    document.querySelector('#myModal').addEventListener('skapa', function(e) {
        e.preventDefault();
    })};

  document.querySelector('#myModal').addEventListener('skapa', function(e) {
    e.preventDefault();
      let title = document.querySelector('#titel').value;
      let time = document.querySelector('#deadline-hours').value;
      let day = document.querySelector('#deadline-day').value;
      let month = document.querySelector('#deadline-month').value;
      let year = document.querySelector('#deadline-year').value;


addReminder(title,time,day,month,year);

    function deleteItem(event) {
          event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        };
        deleteItem(event);
      });

    //const now = new Date();

    /*const minuteCheck = now.getMinutes();
    const hourCheck = now.getHours();
    const dayCheck = now.getDate();
    const monthCheck = now.getMonth();
    const yearCheck = now.getFullYear();
*/
   // let objectStore = db.transaction(["toDoList"], "readwrite").objectStore('toDoList');
    //objectStore.openCursor().onsuccess = function(event) {
     // let cursor = event.target.result;
       
      
      /*if(cursor) {
        switch(cursor.value.month) {
          case "January":
            var monthNumber = 0;
            break;
          case "February":
            var monthNumber = 1;
            break;
          case "March":
            var monthNumber = 2;
            break;
          case "April":
            var monthNumber = 3;
            break;
          case "May":
            var monthNumber = 4;
            break;
          case "June":
            var monthNumber = 5;
            break;
          case "July":
            var monthNumber = 6;
            break;
          case "August":
            var monthNumber = 7;
            break;
          case "September":
            var monthNumber = 8;
            break;
          case "October":
            var monthNumber = 9;
            break;
          case "November":
            var monthNumber = 10;
            break;
          case "December":
            var monthNumber = 11;
            break;
          default:
          alert('Incorrect month entered in database.');
        }
          // check if the current hours, minutes, day, month and year values match the stored values for each task in the IDB.
          // The + operator in this case converts numbers with leading zeros into their non leading zero equivalents, so e.g.
          // 09 -> 9. This is needed because JS date number values never have leading zeros, but our data might.
          // The secondsCheck = 0 check is so that you don't get duplicate notifications for the same task. The notification
          // will only appear when the seconds is 0, meaning that you won't get more than one notification for each task
          if(+(cursor.value.hours) == hourCheck && +(cursor.value.minutes) == minuteCheck && +(cursor.value.day) == dayCheck && monthNumber == monthCheck && cursor.value.year == yearCheck && cursor.value.notified == "no") {

          }

          cursor.continue();*/
        
    };