import { ref, reactive, watch, computed } from 'vue'
import firebase from 'firebase/app'
import '../compositions/firebaseApp'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()

type DocumentReference = firebase.firestore.DocumentReference
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

const timeouts: { [key: string ]: number } = {}

const delayedFields = ['caption', 'tldr', 'description']
const firestoreSyncHandle = {
  set: (project: Project, prop: string, val: any) => {
    if (delayedFields.includes(prop)) {
      clearTimeout(timeouts[prop])
      timeouts[prop] = setTimeout(() => {
        db.collection('projects').doc(project.id).update({
          [prop]: val
        }).catch(() => {
          console.error(`Problem syncing Firstore for ${project.id} with prop: ${prop} and val ${val}`)
        })
      }, 2000)
    } else {
      db.collection('projects').doc(project.id).update({
        [prop]: val
      }).catch(() => {
        console.error(`Problem syncing Firstore for ${project.id} with prop: ${prop} and val ${val}`)
      })
    }
    return Reflect.set(project, prop, val)
  }
}

export class Project {
  public id: string
  public caption: string
  public tldr: string
  public day1Start: string
  public day1End: string
  public day2Start: string
  public day2End: string
  public participantsMin: number
  public participantsMax: number
  public gradeMin: number
  public gradeMax: number
  public requirements: string
  public costs: number
  public description: string
  public visible: boolean
  assignedUsers: object
  constructor (caption: string, tldr: string, description: string, id: string,
    assignedUsers: Array<string>, day1Start: string, day1End: string,
    day2Start: string, day2End: string, participantsMin: number, participantsMax: number,
    gradeMin: number, gradeMax: number, requirements: string, costs: number, visible: boolean) {
    this.caption = caption
    this.tldr = tldr
    this.description = description
    this.id = id
    this.assignedUsers = new Proxy(assignedUsers, {
      set: function (arr: string[], prop: string | number | symbol, val: any) {
        const ref = Reflect.set(arr, prop, val)
        if (prop === 'length') {
          db.collection('projects').doc(id).update({
            assignedUsers: arr
          })
        }
        return ref
      }
    })
    this.day1Start = day1Start
    this.day1End = day1End
    this.day2Start = day2Start
    this.day2End = day2End
    this.participantsMin = participantsMin
    this.participantsMax = participantsMax
    this.gradeMin = gradeMin
    this.gradeMax = gradeMax
    this.requirements = requirements
    this.costs = costs
    this.visible = visible
  }
}

const allProjects = ref<Array<Project>>([])

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
    return new Proxy(new Project(
      data.caption,
      data.tldr,
      data.description,
      snapshot.id,
      data.assignedUsers,
      data.day1Start,
      data.day1End,
      data.day2Start,
      data.day2End,
      data.participantsMin,
      data.participantsMax,
      data.gradeMin,
      data.gradeMax,
      data.requirements,
      data.costs,
      data.visible), firestoreSyncHandle)
  }
}

function createProject (data: any) {
  db.collection('projects').doc(data.caption).set({ ...data, assignedUsers: [], visible: false })
}

function toggleVisibility (project: Project) {
  project.visible = !project.visible
}

function deleteProject (project: Project) {
  db.collection('projects').doc(project.id).delete()
  const index = allProjects.value.indexOf(project)
  allProjects.value.splice(index, 1)
}

const projects = computed(() => {
  return allProjects.value.filter(proj => proj.visible)
})

let loaded = false
export default function () {
  if (!loaded) {
    db.collection('projects').withConverter(postConverter).get().then(function (querySnapshot: firebase.firestore.QuerySnapshot) {
      querySnapshot.forEach(function (doc) {
        const project = reactive(doc.data() as Project)
        allProjects.value.push(project)
      })
    })
    loaded = true
  }
  return { projects, createProject, toggleVisibility, deleteProject, allProjects }
}
