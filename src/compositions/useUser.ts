import { ref, watch } from 'vue'
import firebase from 'firebase/app'
import './firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()
const selectedProjects = ref<Array<string>>([])
const user = ref()
type DocumentSnapshot = firebase.firestore.DocumentSnapshot

export const authPromise = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(function (authUser: any) {
    if (authUser) {
      db.collection('users').doc(authUser.uid).get().then(function (doc: DocumentSnapshot) {
        if (doc.exists) {
          user.value = doc.data()
          user.value.uid = doc.id
          selectedProjects.value = user.value.selectedProjects
          resolve(user)
        } else {
          db.collection('users').doc(authUser.uid).set({
            selectedProjects: [],
            project: null
          })
          user.value = { project: null, selectedProjects: null }
          resolve(user)
        }
      })
    } else {
      selectedProjects.value = []
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
  db.collection('users').doc(user.value.uid).update({
    project: projectid,
    selectedProjects: []
  })
  selectedProjects.value = []
}

watch(selectedProjects, () => {
  if (user.value) {
    db.collection('users').doc(user.value.uid).update({
      selectedProjects: selectedProjects.value
    })
  }
}, { deep: true })

function removeProject () {
  db.collection('users').doc(user.value.uid).update({
    project: null
  })
}

export default async function () {
  await authPromise
  return { user, selectedProjects, toggleProject, associateProject, removeProject }
}
