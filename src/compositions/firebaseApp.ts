import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCgosI3TLSk2aCrffd9keYEJQjNp7h37SY',
  authDomain: 'projekttage-f6c38.firebaseapp.com',
  databaseURL: 'https://projekttage-f6c38.firebaseio.com',
  projectId: 'projekttage-f6c38',
  storageBucket: 'projekttage-f6c38.appspot.com',
  messagingSenderId: '967934034676',
  appId: '1:967934034676:web:20137db52310f97dd694a1'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
