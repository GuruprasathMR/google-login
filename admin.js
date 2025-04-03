import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Check if logged-in user is admin
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        const adminRef = ref(database, `admins/${userId}`);

        get(adminRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Admin Access Granted");

                // Fetch All User Data
                const usersRef = ref(database, "users");
                get(usersRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const usersData = snapshot.val();
                        displayUserData(usersData);
                    } else {
                        console.log("No users found");
                    }
                }).catch((error) => {
                    console.error("Error fetching users:", error);
                });
            } else {
                console.log("Access Denied: Not an Admin");
                window.location.href = "index.html"; // Redirect non-admins
            }
        }).catch((error) => {
            console.error("Error checking admin status:", error);
        });
    } else {
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
});

// Function to Display User Data in Table
function displayUserData(users) {
    const userTable = document.getElementById("user-table");
    userTable.innerHTML = `
        <tr>
            <th>Username</th>
            <th>Password</th>
        </tr>
    `;

    for (const key in users) {
        const user = users[key];
        userTable.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td>${user.password}</td>
            </tr>
        `;
    }
}
