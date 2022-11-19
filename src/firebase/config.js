import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtXyuGlljJ8fCAlKxqYC1vcAA7IjFzjRA",
    authDomain: "proyectodb-af89c.firebaseapp.com",
    projectId: "proyectodb-af89c",
    storageBucket: "proyectodb-af89c.appspot.com",
    messagingSenderId: "364746248103",
    appId: "1:364746248103:web:e5c9c66184cf716dc4f082"
};


app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()