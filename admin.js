import { database, ref, get, child } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const dbRef = ref(database);

onAuthStateChanged(auth, (user) => {
  if (user) {
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.isAdmin) {
          // Admin can see all users
          get(child(dbRef, "users")).then((allUsers) => {
            console.log("All Users:", allUsers.val());
          });
        } else {
          console.log("Access Denied: You are not an admin.");
        }
      }
    });
  } else {
    console.log("User not logged in");
  }
});
