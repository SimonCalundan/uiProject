// Firebase start

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import {
  getDatabase,
  set,
  ref,
  update,
  remove,
  get,
  child,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwbX8T_yLr9etttxCSGZq00bgJqR6nIWw",
  authDomain: "uxuiproject-fa6c7.firebaseapp.com",
  projectId: "uxuiproject-fa6c7",
  storageBucket: "uxuiproject-fa6c7.appspot.com",
  messagingSenderId: "444829520617",
  appId: "1:444829520617:web:99cbfe2ed23331cde89678",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const firebaseErrorsCodes = {
  "auth/user-not-found": "Der er ikke nogen bruger med denne email.",
  "auth/email-already-in-use": "Der findes allerede en bruger med denne email.",
  "auth/invalid-email": "Ugyldig email. \n\nSkriv venligst en rigtig email.",
  "auth/invalid-password":
    "Ugyldigt kodeord. \n\nKoden skal være minimum seks (6) karakterer lang.",
  "auth/wrong-password":
    "Forkert kode. \n\nHar du glemt din kode kan du nulstille den nederst på siden.",
  "auth/missing-email": "Der findes ikke en bruger med denne email.",
  "auth/too-many-requests":
    "Du har forsøgt for mange gange med forkerte informationer. \nPrøv venligst igen om ca. 30-60 sekunder.\n\n Skriver du forkert flere gange efterfølgende, bliver ventetiden muligvis længere. \n\nHar du glemt din kode kan du nulstille den nederst på siden.",
  "auth/weak-password":
    "Ugyldigt kodeord. \n\nKoden skal være minimum seks (6) karakterer lang.",
};

// Firebase end

// switch between login and register
const dataGoToRegisterButton = document.querySelector(
  "[data-go-to-register-button]"
);
const dataGoToLoginButton = document.querySelector("[data-go-to-login-button]");

dataGoToRegisterButton.addEventListener("click", (e) => {
  const loginSectionContainer = document.querySelector(
    "[data-login-section-container]"
  );
  const registerSectionContainer = document.querySelector(
    "[data-register-section-container]"
  );

  loginSectionContainer.classList.toggle("activeContainer");
  registerSectionContainer.classList.toggle("activeContainer");
});

dataGoToLoginButton.addEventListener("click", (e) => {
  const loginSectionContainer = document.querySelector(
    "[data-login-section-container]"
  );
  const registerSectionContainer = document.querySelector(
    "[data-register-section-container]"
  );

  loginSectionContainer.classList.toggle("activeContainer");
  registerSectionContainer.classList.toggle("activeContainer");
});

const userFormLogin = document.querySelector("[data-user-form-login]");

// let user log in
userFormLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmailLogin = document.querySelector(
    "[data-user-email-login]"
  ).value;
  const userPasswordLogin = document.querySelector(
    "[data-user-password-login]"
  ).value;

  signInWithEmailAndPassword(auth, userEmailLogin, userPasswordLogin)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // GÅ TIL AMALIES SIDE
      alert("Du er nu logget ind med " + userEmailLogin);
      userFormLogin.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(firebaseErrorsCodes[errorCode] || errorMessage);
    });
});

// user forgot password
const userForgotPasswordForm = document.querySelector(
  "[data-user-form-forgot-password]"
);

userForgotPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userForgotPasswordEmail = document.querySelector(
    "[data-user-forgot-password-email]"
  ).value;

  sendPasswordResetEmail(auth, userForgotPasswordEmail)
    .then(() => {
      // Password reset email sent!
      alert(
        "Der er nu sendt en email til " +
          userForgotPasswordEmail +
          ". Det kan være mailen er kommet i spam."
      );
      userForgotPasswordForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(firebaseErrorsCodes[errorCode] || errorMessage);
    });
});

// let user register

const userRegisterForm = document.querySelector("[data-user-form-register]");

userRegisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userRegisterEmail = document.querySelector(
    "[data-user-email-register]"
  ).value;
  const userRegisterPassword = document.querySelector(
    "[data-user-password-register]"
  ).value;
  const userRegisterPasswordConfirm = document.querySelector(
    "[data-user-password-confirm-register]"
  ).value;

  if (userRegisterPassword !== userRegisterPasswordConfirm) {
    alert("Koderne matcher ikke hinanden.");
    return;
  }

  createUserWithEmailAndPassword(auth, userRegisterEmail, userRegisterPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Der er nu oprettet med " + userRegisterEmail);
      userRegisterForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(firebaseErrorsCodes[errorCode] || errorMessage);
    });
});
