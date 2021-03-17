import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCe0f40DywIW0K07qFE9Y8i3OuIkDHoe94",
    authDomain: "findingohana-6ac58.firebaseapp.com",
    projectId: "findingohana-6ac58",
    storageBucket: "findingohana-6ac58.appspot.com",
    messagingSenderId: "392784623225",
    appId: "1:392784623225:web:53bfce5092a69336ee86a8",
    measurementId: "G-DJM91HPBMT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;