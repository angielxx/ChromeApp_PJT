<<<<<<< HEAD
const loginBox = document.querySelector('#loginBox')
const appBox = document.querySelector('#appBox')
const loginForm = document.querySelector('#loginForm')
const loginInput = document.querySelector('#loginForm input')

const HIDDEN_CLASSNAME = 'hidden'
const USERNAME_KEY = 'username'

function onLoginSubmit(event) {
    event.preventDefault()
    loginBox.classList.add(HIDDEN_CLASSNAME)
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username)
}

const savedUsername = localStorage.getItem(USERNAME_KEY)

if (savedUsername === null) {
    loginBox.classList.remove(HIDDEN_CLASSNAME)
    appBox.classList.add(HIDDEN_CLASSNAME)
    loginForm.addEventListener('submit', onLoginSubmit)
} else {
    loginBox.classList.add(HIDDEN_CLASSNAME)
    appBox.classList.remove(HIDDEN_CLASSNAME)
    console.log(savedUsername)
=======
const loginForm = document.querySelector("#loginForm")
const loginInput = document.querySelector("#loginForm input")

const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  showName(username)
}

function showName(username) {
  
>>>>>>> 9e8fa1c0d68f683e675da59f902f2119b9790189
}