import firebase from "../../config/Config";
const db = firebase.firestore();

// check if user is signed in
export const authCheck = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dispatch({type: "AUTH_CHECK", payload: user.uid})
        localStorage.setItem("authUser", JSON.stringify(user))
      } 
    })
  }
};

// sign up a user 
export const signUp = (credentials) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        localStorage.setItem("authUser", JSON.stringify(user))
        dispatch({type: "SIGNUP_SUCCESS", payload: user})  
      })
      .catch(error => {
        dispatch({type: "SIGNUP_ERROR", payload: error})
      })
  }
};

// sign in user 
export const signIn = (credentials) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        localStorage.setItem("authUser", JSON.stringify(user))
        db.collection("users").doc(user.user.uid).get()
          .then(doc => {
            dispatch({type: "SIGNIN_SUCCESS", payload: doc.data()})
          })  
      })
      .catch(error => {
        dispatch({type: "SIGNIN_ERROR", payload: error})
      })
  }
};

// sign out the user 
export const signOut = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("authUser")
        dispatch({type: "SIGNOUT_SUCCESS"})
      })
      .catch(error => {
        console.log(error)
      })
  }
};