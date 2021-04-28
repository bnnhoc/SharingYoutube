import firebase from "firebase";
const config = {
    apiKey: "AIzaSyDKpCnHBpXiVDp4xwl_dVJ7EWuPxzC4dDg",
    authDomain: "fsharing-videos-efbb7.firebaseapp.com",
    databaseURL: "https://sharing-videos-efbb7-default-rtdb.firebaseio.com/",
    projectId: "sharing-videos-efbb7",
    storageBucket: "sharing-videos-efbb7.appspot.com",
    messagingSenderId: "144750278413",
};
firebase.initializeApp(config);
export default firebase;
