import { ref, watch } from 'vue'
import firebase from 'firebase/app'
import './firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'

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
        console.log('Creating user', user.uid)
        db.collection('users').doc(user.uid).set({
          selectedProjects: [],
          project: null
        })
      }
    })
  } else {
    console.log('No active User - redirecting to login page')
    userId = undefined
    selectedProjects.value = []
    router.push('/login')
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
