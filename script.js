import { auth, database } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// **User Registration**
document.getElementById("register-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store in Firebase Database
            set(ref(database, `users/${user.uid}`), {
                username: username,
                email: email,
                password: password  // ⚠️ Warning: Encrypt this in real apps!
            });

            alert("User Registered Successfully!");
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert(error.message);
        });
});

// **User Login**
document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert(error.message);
        });
});
