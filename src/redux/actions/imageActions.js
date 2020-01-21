import firebase from "../../config/Config";
const db = firebase.firestore();

// get saved images from firestore
export const getImages = () => {
  return (dispatch) => {
    db
      .collection("images")
      .orderBy("createdAt", "asc")
      .get()
        .then(snapshot => {
          const arr = []
          snapshot.forEach(doc => {
            arr.push({id: doc.id, imageUrl: doc.data().imageUrl , data: doc.data()})
          })
        dispatch({type: "GET_IMAGES", payload: arr})  
        })
  }
}