// import components
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDOjlzvhsmFcploP3jQzJPQ4PzsJcKF-HI",
  authDomain: "who-am-i-ebc22.firebaseapp.com",
  databaseURL: "https://who-am-i-ebc22.firebaseio.com",
  projectId: "who-am-i-ebc22",
  storageBucket: "who-am-i-ebc22.appspot.com",
  messagingSenderId: "29067018540",
  appId: "1:29067018540:web:b4ca5f65afa5f70e81ac89"
};

// initialise firebase
firebase.initializeApp(firebaseConfig);

export default firebase;