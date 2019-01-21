// firebase import
import * as firebase from 'firebase'
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBDP4tgGOLnIJBIgTT8WmMLzWMYQuuebkY',
  authDomain: 'viclife-ae311.firebaseapp.com',
  databaseURL: 'https://viclife-ae311.firebaseio.com',
  projectId: 'viclife-ae311',
  storageBucket: 'viclife-ae311.appspot.com',
  messagingSenderId: '112934351385'
}
firebase.initializeApp(firebaseConfig)
export default firebase
