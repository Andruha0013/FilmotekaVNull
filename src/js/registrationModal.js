
import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  // browserSessionPersistence,
  // inMemoryPersistence,
} from 'firebase/auth';

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBl5SaGWDBoXNFTgYkPi1ymvworRC_pleE",
  authDomain: "filmoteka-registration.firebaseapp.com",
  databaseURL: "https://filmoteka-registration-default-rtdb.firebaseio.com",
  projectId: "filmoteka-registration",
  storageBucket: "filmoteka-registration.appspot.com",
  messagingSenderId: "469553931635",
  appId: "1:469553931635:web:189a4bd682716d76b81106"
});



const auth = getAuth(firebaseConfig);

const logInButtonRef = document.querySelector('.auth-btn');
const logOutButtonRef = document.querySelector('.logout__btn');
const modalWindow = document.querySelector('.container__form');
const checkBoxRef = document.querySelector('.form-check-input');
const formButtonSignUpRef = document.querySelector('.btn__signup');
const formButtonLogInRef = document.querySelector('.btn__login');
const formRef = document.querySelector('.form');
let firstPassInputRef = document.querySelector('#firstPass');
let userEmailInputRef = document.querySelector('#userEmail');
let libraryLinkRef = document.querySelector('#library-link');

formButtonSignUpRef.disabled = true;
if(logInButtonRef!==null){
  logInButtonRef.addEventListener('click', onLoginBtnClick);
}
if(checkBoxRef!==null){checkBoxRef.addEventListener('change', onToggle);}
if(logOutButtonRef!==null){logOutButtonRef.addEventListener('click', logOutHandler);}
 // if(logInButtonRef!==null){}
//logInButtonRef.addEventListener('click', onLoginBtnClick);



function onLoginBtnClick() {
  modalWindow.classList.remove('invis');
  window.addEventListener('keydown', modalCloseOnEscPress);
  modalWindow.addEventListener('click', onCloseModalBtn);
  formButtonLogInRef.addEventListener('click', onLoginPageSubmit);
  formRef.addEventListener('submit', onFormSubmit);
  onToggle();
}

function onFormSubmit(e) {
  e.preventDefault();
  if (firstPassInputRef.value.length < 6) {
    Notiflix.Notify.failure('Password should be at least 6 characters');
  } else if (userEmailInputRef.value.length === 0) {
    Notiflix.Notify.failure('Please enter Your email address');
  } else {
    const userEmail = userEmailInputRef.value;
    const userPassword = firstPassInputRef.value;
    createAccount(auth, userEmail, userPassword);
    formRef.reset();
    modalWindow.classList.add('invis');
  }
}

function onCloseModalBtn(event) {
  if (
    event.target.classList.contains('fa-solid') ||
    event.target === event.currentTarget
  ) {
    modalWindow.classList.add('invis');
    window.removeEventListener('keydown', modalCloseOnEscPress);
    modalWindow.removeEventListener('click', onCloseModalBtn);
  }
}

function modalCloseOnEscPress(event) {
  if (event.code !== 'Escape') return;
  modalWindow.classList.add('invis');
}

function onToggle() {
  if (checkBoxRef.checked) {
    formButtonSignUpRef.disabled = false;
    formButtonSignUpRef.style.border = '1px black solid';
  } else {
    formButtonSignUpRef.disabled = true;
    formButtonSignUpRef.style.border = '1px grey solid';
  }
}

async function createAccount(auth, email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    Notiflix.Notify.success('User created');
    logOutButtonRef.disabled = false;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning(
      'User already created, please procced to Log In page'
    );
  }
}

function onLoginPageSubmit(e) {
  e.preventDefault();
  const userEmail = userEmailInputRef.value;
  const userPassword = firstPassInputRef.value;
  loginIntoAccount(auth, userEmail, userPassword);
  formRef.reset();
  modalWindow.classList.add('invis');
}

async function loginIntoAccount(auth, email, password) {
  try {
    auth = getAuth(firebaseConfig);
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    isUserAlreadyLogedIn();
    libraryLinkRef.removeEventListener('click', onLibraryLinkClick);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning(
      'User is not found. Or user data do not match ours records'
    );
  }
}

function logOutHandler() {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.success('Log-out successful.');
      libraryLinkRef.addEventListener('click', onLibraryLinkClick);
      logOutButtonRef.disabled = true;
    })
    .catch(error => {
      Notiflix.Notify.warning('Log-out unsuccessful.');
    });
}

function onLibraryLinkClick(e) {
  e.preventDefault();
  Notiflix.Notify.info('To use "Mi Library" page. First You need to login');
}

async function isUserAlreadyLogedIn() {
  const auth = getAuth(firebaseConfig);

  onAuthStateChanged(auth, user => {
    if (user) {
      Notiflix.Notify.success('You are login in');
      logOutButtonRef.disabled = false;
    } else {
      console.log(error);
    }
  });
}
if(logInButtonRef!==null){
function ifUserLoged() {
  const auth = getAuth(firebaseConfig);

  onAuthStateChanged(auth, user => {
    if (user) {
      libraryLinkRef.removeEventListener('click', onLibraryLinkClick);
    } else {
      libraryLinkRef.addEventListener('click', onLibraryLinkClick);
      logOutButtonRef.disabled = true;
    }
  });
}
ifUserLoged();
}