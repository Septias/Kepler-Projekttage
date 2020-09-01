<template>
  <div id="wrapper" class="flex align-center justify-center">
    <div id="create-project">
      <h1> Erstelle ein Projekt</h1>
      <ProjectForm v-model:project="project" :createButton="true" @submit.prevent="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectForm from '@/components/ProjectForm'
import useUser from '@/compositions/useUser'
import { idFromCaption } from '../helpers'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default defineComponent({
  components: {
    ProjectForm
  },
  async setup () {
    const { createProject } = await useProjects()
    const { associateProject } = await useUser()

    const project = reactive({
      caption: '',
      tldr: '',
      description: '',
      day1Start: '09:00',
      day1End: '13:00',
      day2Start: '09:00',
      day2End: '13:00',
      participantsMin: 5,
      participantsMax: 10,
      gradeMin: 5,
      gradeMax: 12,
      requirements: '',
      costs: '0',
      creator: firebase.auth().currentUser.uid
    })

    async function onSubmit () {
      const id = idFromCaption(project.caption)
      await createProject(project)
      router.push('/project/' + id)
      associateProject(id)
    }
    return { project, onSubmit }
  }
})

</script>

<style lang="sass" scoped>
#create-project
  font-size: 1.6em
  width: 100%
  color: var(--color3)
  box-sizing: border-box
  padding: 1.5em
  max-width: 800px
  background: var(--color2)

@media screen and (min-width: 800px)
  #create-project
    border-radius: $md
    margin: 2em
</style>
