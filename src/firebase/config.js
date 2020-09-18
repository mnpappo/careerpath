import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_kACswgesmUjsA4PjieAq9eyg6qLMda0",
    authDomain: "career-path-5183a.firebaseapp.com",
    databaseURL: "https://career-path-5183a.firebaseio.com",
    projectId: "career-path-5183a",
    storageBucket: "career-path-5183a.appspot.com",
    messagingSenderId: "45953807785",
    appId: "1:45953807785:web:8234d2a46364f98fc200b8",
    measurementId: "G-Y0Q8WYW9M4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export  { firebase };
