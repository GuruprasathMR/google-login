import { database, ref, get, child } from "./firebase.js";

// Function for Admin Login
function adminLogin() {
    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;

    get(child(ref(database), "users/" + username)).then(snapshot => {
        if (snapshot.exists() && snapshot.val().isAdmin && snapshot.val().password === password) {
            alert("Welcome back, Sir!");
            document.getElementById("adminContent").style.display = "block";
            loadUsers();
        } else {
            alert("Access Denied!");
        }
    }).catch(error => {
        console.error("Error:", error);
    });
}

// Function to Load Users
function loadUsers() {
    get(child(ref(database), "users")).then(snapshot => {
        if (snapshot.exists()) {
            let users = snapshot.val();
            let userList = document.getElementById("userList");
            userList.innerHTML = "";
            Object.keys(users).forEach(user => {
                if (!users[user].isAdmin) {
                    let li = document.createElement("li");
                    li.textContent = `Username: ${user}, Password: ${users[user].password}`;
                    userList.appendChild(li);
                }
            });
        }
    }).catch(error => {
        console.error("Error:", error);
    });
}

window.adminLogin = adminLogin;
