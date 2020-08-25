import { ref, watch } from 'vue'
import firebase from 'firebase/app'
import './firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()
const selectedProjects = ref<Array<string>>([])
let userId: string | undefined

firebase.auth().onAuthStateChanged(function (user: any) {
  if (user) {
    userId = user.uid
    db.collection('users').doc(user.uid).get().then(function (doc: any) {
      if (doc.exists) {
        selectedProjects.value = doc.data().selectedProjects
      } else {
        console.error('No UserData for user ', user.uid)
      }
    })
  } else {
    console.log('no User')
    userId = undefined
    selectedProjects.value = []
  }
})

function toggleProject (projectId: string) {
  // I should maybe chec if it is an existing projectId
  const index = selectedProjects.value.indexOf(projectId)
  if (index > -1) {
    selectedProjects.value.splice(index, 1)
  } else {
    selectedProjects.value.push(projectId)
  }
}

watch(selectedProjects, () => {
  if (userId) {
    db.collection('users').doc(userId).update({
      selectedProjects: selectedProjects.value
    })
  }
}, { deep: true })

export default function () {
  return { selectedProjects, toggleProject }
}
