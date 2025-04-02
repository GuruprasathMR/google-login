// Import the functions you need from the SDKs you need
import { database, ref, set, get, child } from "./firebase.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpnHMrVqAGowpB5E1_KzYe9YGquAtZo4I",
  authDomain: "login-357d6.firebaseapp.com",
  databaseURL: "https://login-357d6-default-rtdb.firebaseio.com",
  projectId: "login-357d6",
  storageBucket: "login-357d6.firebasestorage.app",
  messagingSenderId: "595509328299",
  appId: "1:595509328299:web:c7d2ca67ac1f25e800faee",
  measurementId: "G-7M89ZR4MKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function registerUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    set(ref(database, "users/" + username), {
        password: password
    }).then(() => {
        alert("User registered successfully!");
    }).catch(error => {
        console.error("Error:", error);
    });
}



function getUser() {
    let username = document.getElementById("username").value;

    get(child(ref(database), "users/" + username)).then(snapshot => {
        if (snapshot.exists()) {
            console.log("User Data:", snapshot.val());
        } else {
            console.log("User not found.");
        }
    }).catch(error => {
        console.error("Error:", error);
    });
}
