import { ref } from 'vue'
import firebase from 'firebase/app'
import '../compositions/firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()

type DocumentReference = firebase.firestore.DocumentReference
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export class Project {
  public id: string
  public caption: string
  public tldr: string
  public description: string
  constructor (caption: string, tldr: string, description: string, id: string) {
    this.caption = caption
    this.tldr = tldr
    this.description = description
    this.id = id
  }
}

const projects = ref<Array<Project>>([])

const postConverter = {
  toFirestore: function (project: Project) {
    return {
      caption: project.caption,
      tldr: project.tldr,
      description: project.description
    }
  },
  fromFirestore: function (snapshot: QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) {
    const data = snapshot.data(options)
    return new Project(data.caption, data.tldr, data.description, snapshot.id)
  }
}

function createProject (data: any) {
  db.collection('projects').doc(String(Date.now())).set(data)
}

let loaded = false

export default function () {
  if (!loaded) {
    db.collection('projects').withConverter(postConverter).get().then(function (querySnapshot: firebase.firestore.QuerySnapshot) {
      querySnapshot.forEach(function (doc) {
        projects.value.push(doc.data() as Project)
      })
    })
    loaded = true
  }
  return { projects, createProject }
}
