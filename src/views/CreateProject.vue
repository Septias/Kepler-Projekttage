<template>
  <div id="wrapper" class="flex align-center justify-center">
    <div id="create-project">
      <h1> Erstelle ein Projekt</h1>
      <ProjectForm v-model:project="project" @submit.prevent="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectForm from '@/components/ProjectForm'
import useUser from '@/compositions/useUser'

export default defineComponent({
  components: {
    ProjectForm
  },
  setup () {
    const { createProject } = useProjects()
    const { associateProject } = useUser()

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
      costs: '0'
    })

    function onSubmit () {
      associateProject(project)
      createProject(project)
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
