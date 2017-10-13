import firebase from "firebase";

var config = {
    apiKey: "AIzaSyAEd_9NNdHj7JxsRNtox5uMYwCMC-x2sGM",
    authDomain: "psychlearningexperiment.firebaseapp.com",
    databaseURL: "https://psychlearningexperiment.firebaseio.com",
    projectId: "psychlearningexperiment",
    storageBucket: "psychlearningexperiment.appspot.com",
    messagingSenderId: "590552847356"
  };
 let fb = firebase.initializeApp(config);


 export default fb;