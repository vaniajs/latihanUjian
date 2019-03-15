import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBsYRvrvISyfYwQ8D0-uRWA0zByng4QYgs",
    authDomain: "react-dfb75.firebaseapp.com",
    databaseURL: "https://react-dfb75.firebaseio.com",
    projectId: "react-dfb75",
    storageBucket: "react-dfb75.appspot.com",
    messagingSenderId: "921772188672"
  };

  firebase.initializeApp(config)
  export const ref = firebase.database().ref();
  export const auth = firebase.auth;
  export const provider = new firebase.auth.GoogleAuthProvider();
