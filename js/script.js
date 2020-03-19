const nav = document.querySelector('.navLinks')
const burger = document.querySelector('.burger')

function toggleMeny() {
    
    document.querySelector('.navLinks').classList.toggle('navActive')
    document.querySelector('.burger').classList.toggle('toggle')
}

document.querySelector('.burger').addEventListener('click', toggleMeny)
document.querySelector('.burger').addEventListener(window.onclick, toggleMeny)

const box = document.querySelector('.notificationBox')
const button = document.querySelector('.notifications')

function toggleBox() {
      document.querySelector('.notificationBox').classList.toggle('navActive')
}

document.querySelector('.notifications').addEventListener('click', toggleBox)
document.querySelector('.notifications').addEventListener(window.onclick, toggleBox)


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

/*function AddReminder(title,time,day,month,year) {

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
  
    }

document.querySelector('#myModal').addEventListener('skapa', function(e) {
  e.preventDefault();
    let title = document.querySelector('#titel').value;
    let time = document.querySelector('#deadline-hours').value;
    let day = document.querySelector('#deadline-day').value;
    let month = document.querySelector('#deadline-month').value;
    let year = document.querySelector('#deadline-year').value;

AddReminder(title,time,day,month,year);


});*/

// create a reference to the notifications list in the bottom of the app; we will write database messages into this list by
//appending list items on to the inner HTML of this variable - this is all the lines that say note.innerHTML += '<li>foo</li>';
const note = document.getElementById('enable');

// create an instance of a db object for us to store the IDB data in
let db;

// create a blank instance of the object that is used to transfer data into the IDB. This is mainly for reference
let newItem = [
      { title: "", time: 0, day: 0, month: "", year: 0, notified: "no" }
    ];

// all the variables we need for the app
const taskList = document.getElementById('påminnelseTitel');

const taskForm = document.getElementById('task-form');
const title = document.getElementById('title');

const hours = document.getElementById('deadline-hours');
const day = document.getElementById('deadline-day');
const month = document.getElementById('deadline-month');
const year = document.getElementById('deadline-year');

const skapa = document.getElementById('skapa');

const notificationBtn = document.getElementById('enable');

if(Notification.permission === 'denied' || Notification.permission === 'default') {
  notificationBtn.style.display = 'block';
} else {
  notificationBtn.style.display = 'none';
}

window.onload = function() {
  note.innerHTML += '<li>App initialised.</li>';
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  const DBOpenRequest = window.indexedDB.open("toDoList", 4);

  DBOpenRequest.onerror = function(event) {
    note.innerHTML += '<li>Error loading database.</li>';
  };

  DBOpenRequest.onsuccess = function(event) {
    note.innerHTML += '<li>Database initialised.</li>';

    db = DBOpenRequest.result;

    displayData();
  };

  DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;

    db.onerror = function(event) {
      note.innerHTML += '<li>Error loading database.</li>';
    };

    let objectStore = db.createObjectStore("toDoList", { keyPath: "title" });

    objectStore.createIndex("hours", "hours", { unique: false });
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

          listItem.innerHTML = cursor.value.taskTitle + ' — ' + cursor.value.hours + ':' + cursor.value.minutes + ', ' + cursor.value.month + ' ' + cursor.value.day + daySuffix + ' ' + cursor.value.year + '.';

          if(cursor.value.notified == "yes") {
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "rgba(255,0,0,0.5)";
          }

          taskList.appendChild(listItem);

          const deleteButton = document.createElement('button');
          listItem.appendChild(deleteButton);
          deleteButton.innerHTML = 'X';
          deleteButton.setAttribute('data-task', cursor.value.taskTitle);
          deleteButton.onclick = function(event) {
            deleteItem(event);
          }

          cursor.continue();

        } else {
          note.innerHTML += '<li>Entries all displayed.</li>';
        }
      }
    }

  taskForm.addEventListener('skapa',addData,false);

  function addData(e) {
    e.preventDefault();

    if(title.value == '' || hours.value == null || minutes.value == null || day.value == '' || month.value == '' || year.value == null) {
      note.innerHTML += '<li>Data not submitted — form incomplete.</li>';
      return;
    } else {

      let newItem = [
        { title: title.value, hours: hours.value, day: day.value, month: month.value, year: year.value, notified: "no" }
      ];

      let transaction = db.transaction(["toDoList"], "readwrite");

      transaction.oncomplete = function() {
        note.innerHTML += '<li>Transaction completed: database modification finished.</li>';

        displayData();
      };

      transaction.onerror = function() {
        note.innerHTML += '<li>Transaction not opened due to error: ' + transaction.error + '</li>';
      };

      let objectStore = transaction.objectStore("toDoList");
      console.log(objectStore.indexNames);
      console.log(objectStore.keyPath);
      console.log(objectStore.name);
      console.log(objectStore.transaction);
      console.log(objectStore.autoIncrement);

      let objectStoreRequest = objectStore.add(newItem[0]);
        objectStoreRequest.onsuccess = function(event) {

          note.innerHTML += '<li>Request successful.</li>';
          
          title.value = '';
          hours.value = null;
          day.value = 01;
          month.value = 'January';
          year.value = 2020;

        };

      };

    };

  function deleteItem(event) {
    let dataTask = event.target.getAttribute('data-task');

    let transaction = db.transaction(["toDoList"], "readwrite");
    let request = transaction.objectStore("toDoList").delete(dataTask);

    transaction.oncomplete = function() {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      note.innerHTML += '<li>Task \"' + dataTask + '\" deleted.</li>';
    };
  };

  function checkDeadlines() {
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      notificationBtn.style.display = 'block';
    } else {
      notificationBtn.style.display = 'none';
    }

    const now = new Date();

    const minuteCheck = now.getMinutes();
    const hourCheck = now.getHours();
    const dayCheck = now.getDate();
    const monthCheck = now.getMonth();
    const yearCheck = now.getFullYear();

    let objectStore = db.transaction(['toDoList'], "readwrite").objectStore('toDoList');
    objectStore.openCursor().onsuccess = function(event) {
      let cursor = event.target.result;
        if(cursor) {

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

            if(Notification.permission === 'granted') {
              createNotification(cursor.value.taskTitle);
            }
          }

          cursor.continue();
        }

    }

  }



  
  function askNotificationPermission() {
    function handlePermission(permission) {
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        notificationBtn.style.display = 'block';
      } else {
        notificationBtn.style.display = 'none';
      }
    }

    if (!"Notification" in window) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }
  }

  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }

  notificationBtn.addEventListener('click', askNotificationPermission);

  function createNotification(title) {

    let img = '/projekt2/img/bell.png';
    let text = 'HALLÅ! Din uppgift "' + title + '" är försenad.';
    let notification = new Notification('PåminnMig', { body: text, icon: img });

    let objectStore = db.transaction(['toDoList'], "readwrite").objectStore('toDoList');

    let objectStoreTitleRequest = objectStore.get(title);

    objectStoreTitleRequest.onsuccess = function() {
      let data = objectStoreTitleRequest.result;

      data.notified = "yes";

      let updateTitleRequest = objectStore.put(data);

      updateTitleRequest.onsuccess = function() {
        displayData();
      }
    }
  }

  setInterval(checkDeadlines, 1000);
}