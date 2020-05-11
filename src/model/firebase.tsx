import credentials from  "../../credentials.json";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { GeoFirestore } from "geofirestore";

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(credentials.firebase);

const db = firebaseApp.firestore();
export const geoFirestore: GeoFirestore = new GeoFirestore(db);
export default db;