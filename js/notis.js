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



const notificationBtn = document.getElementById('enable');

function askNotificationPermission() {
        function handlePermission(permission) {
          if(!('permission' in Notification)) {
            Notification.permission = permission;
          }
    
          if(Notification.permission === 'denied' || Notification.permission === 'default') {
            notificationBtn.style.display = 'block';
          } else {
            notificationBtn.style.background = 'lightgrey';
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



