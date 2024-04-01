
/* FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref , push as pushed , onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

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

// For Auth
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


onAuthStateChanged(auth, (user) => {
    if(user){
        showLoggedInView()
    } else {
        showLoggedOutView()
    }
})

function authSignUpWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log('Sign in With Google')
  }).catch((error) => {
     alert(error.message)
  })
}

function authSignInWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        alert(error.message)
    })
}

function authCreateAccountWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        alert(error.message)
    })
}

function clearAuthFields(){
    emailInputEl.value = ''
    passwordInputEl.value = ''
}


onValue(userInDB , (snapshot) => {
    let itemArray = Object.entries(snapshot.val())
    let feedHtml = ''

    console.log(itemArray)

    for(let item = itemArray.length - 1; item >= 0; item--){
        let currentItem = itemArray[item][1]
        console.log(currentItem)
        feedHtml += getFeed(currentItem)
        
    }

    render(feedHtml)
})

const bookingArray = JSON.parse(localStorage.getItem('bookingArray'))

const list = []


/* SELECTING ELEMENT */
const userDetailEl = document.getElementById('user-detail')
const userContactEl = document.getElementById('user-contact')

const hairstyleDetailEl = document.getElementById('hairstyle-detail')
const barberDetailEl = document.getElementById('barber-detail')
const bookEl = document.getElementById('book')
const modalUserEl = document.getElementById('modal-user')
const modal = document.getElementById('modal')
const users = document.getElementById('users')

const loggedInView = document.getElementById('loggedInView')
const loggedOutView = document.getElementById('loggedOutView')

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

showLoggedOutView()

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

