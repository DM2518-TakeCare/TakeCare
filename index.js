import { registerRootComponent } from 'expo';

import App from './App';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAnnBLjqu6wkSpmnfIdD5Gje8UHi5c-qRo",
  authDomain: "takecare-2904e.firebaseapp.com",
  databaseURL: "https://takecare-2904e.firebaseio.com",
  projectId: "takecare-2904e",
  storageBucket: "takecare-2904e.appspot.com",
  messagingSenderId: "259111521812",
  appId: "1:259111521812:web:948e92bda9a39e51c3e101",
  measurementId: "G-JZ8J0V0786"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
