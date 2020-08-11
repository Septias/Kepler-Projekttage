import { ref } from 'vue'
import firebase from 'firebase/app'
import '../compositions/firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()
const selectedProjects = ref([])

firebase.auth().onAuthStateChanged(function (user: any) {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc: any) {
      if (doc.exists) {
        selectedProjects.value = doc.data().selectedProjects
      } else {
        console.error('No UserData for user ', user.uid)
      }
    })
  } else {
    console.log('no User')
    selectedProjects.value = []
  }
})

export default function () {
  return { selectedProjects }
}
