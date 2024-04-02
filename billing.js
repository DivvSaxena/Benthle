import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref , push as pushed , onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyAFFpetgRFF8LoAClB7zVXUhceT8EKmn0A",
    databaseURL:'https://benthle-default-rtdb.asia-southeast1.firebasedatabase.app/',
    authDomain: "benthle.firebaseapp.com",
    projectId: "benthle",
    storageBucket: "benthle.appspot.com",
    messagingSenderId: "315297642179",
    appId: "1:315297642179:web:ea0ac6e82346bb89f25476"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const userInDB = ref(database,"users")


/* SELECTING ELEMENT */
const userDetailEl = document.getElementById('user-detail')
const userContactEl = document.getElementById('user-contact')

const hairstyleDetailEl = document.getElementById('hairstyle-detail')
const barberDetailEl = document.getElementById('barber-detail')
const bookEl = document.getElementById('book')
const modalUserEl = document.getElementById('modal-user')
const modal = document.getElementById('modal')
const users = document.getElementById('users')



const bookingArray = JSON.parse(localStorage.getItem('bookingArray'))

const list = []

hairstyleDetailEl.textContent = `Hairstyle: ${bookingArray[0].hairstyle}`
barberDetailEl.textContent = `Barber: ${bookingArray[0].barber}`



bookEl.addEventListener('click', (e)=> {
    if(userDetailEl.value && userContactEl.value){
        list.push({ hairstyle: `${bookingArray[0].hairstyle}`, barber: `${bookingArray[0].barber}`,user:`${userDetailEl.value}`, contact:`${userContactEl.value}`})
       
        console.log(list)
        pushed(userInDB, list)
        modal.style.display = 'block'
        modalUserEl.textContent = `Awesome ${userDetailEl.value}!`
    }
})


function getFeed(item){
    return `<div class="store-user">
                <h2>Barber: '${item[0].barber}'</h2>
                <h2>Hairstyle: '${item[0].hairstyle}'</h2>
                <h2>user: '${item[0].user}'</h2>
                <h2>contact: '${item[0].contact}'</h2>
            </div>`
}

function render(feedHtml){
    users.innerHTML = feedHtml
}



function showLoggedInView(){
    showView(loggedInView)
    hideView(loggedOutView)
}

function showLoggedOutView(){
    showView(loggedOutView)
    hideView(loggedInView)
}


function showView(view){
    view.style.display = 'block'
}

function hideView(view){
    view.style.display = 'none'
}

