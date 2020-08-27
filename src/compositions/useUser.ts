import { ref, watch } from 'vue'
import firebase from 'firebase/app'
import './firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'

const db = firebase.firestore()
const selectedProjects = ref<Array<string>>([])
let uid: string

export const auth = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(function (user: any) {
    if (user) {
      uid = user.uid
      db.collection('users').doc(user.uid).get().then(function (doc: any) {
        if (doc.exists) {
          selectedProjects.value = doc.data().selectedProjects
          resolve(doc.data())
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
      selectedProjects.value = []
      router.push('/login')
      reject(new Error('No logged in User'))
    }
  })
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

function associateProject (projectid: string) {
  db.collection('users').doc(uid).update({
    project: projectid,
    selectedProjects: []
  })
  selectedProjects.value = []
}

watch(selectedProjects, () => {
  if (uid) {
    db.collection('users').doc(uid).update({
      selectedProjects: selectedProjects.value
    })
  }
}, { deep: true })

export default function () {
  return { selectedProjects, toggleProject, associateProject }
}
