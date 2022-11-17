import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDT6NURvtFickNa_2YtVEP8DrnLHw4LaHE",
    authDomain: "practicafirebase-b920e.firebaseapp.com",
    projectId: "practicafirebase-b920e",
    storageBucket: "practicafirebase-b920e.appspot.com",
    messagingSenderId: "432561715585",
    appId: "1:432561715585:web:435d75ef2dcc3b85d1d080"
};


app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()