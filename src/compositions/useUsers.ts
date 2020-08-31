import firebase from 'firebase/app'
import './firebaseApp'
import 'firebase/firestore'
import { ref } from 'vue'

const db = firebase.firestore()
const users = ref<Array<string>>([])

let loaded = false
export default function () {
  if (!loaded) {
    loaded = true
    return new Promise((resolve) => {
      db.collection('users').get().then(function (querySnapshot: firebase.firestore.QuerySnapshot) {
        querySnapshot.forEach(function (doc) {
          users.value.push(doc.id)
        })
        console.log(users)
        resolve({ users })
      })
    })
  } else {
    return Promise.resolve({ users })
  }
}
