import { database, ref, set, get, child } from "./firebase.js";


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



<script type="module" src="script.js"></script>
