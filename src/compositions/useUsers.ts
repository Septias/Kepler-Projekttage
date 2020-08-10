import { ref } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from './firebaseApp'

const selectedProjects = ref([])

firebase.auth().onAuthStateChanged(function (user: any) {
  if (user) {
    console.log(user)
    db.collection('entries').doc(user.uid).get().then(function (doc: any) {
      if (doc.exists) {
        selectedProjects.value = doc.data().selectedProjects
      } else {
        console.error('No UserData for user ', user.uid)
      }
    })
  } else {
    selectedProjects.value = []
  }
})

export default function () {
  return { selectedProjects }
}
