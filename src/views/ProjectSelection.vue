
<template>
  <main>
    <div id="projects-wrapper">
      <h1>Projektwahl</h1>
      <Project v-for="project in projects" :key="project.caption" :selected="selectedProjects.includes(project.id)" :project="project"></Project>
    </div>
    <ProjectCart :projects="selectedProjects"></ProjectCart>
  </main>

</template>

<style lang="sass">

main
  display: flex
  color: var(--color3)
  font-size: 1.2em
  #projects-wrapper
    display: flex
    flex-direction: column
    align-items: center
    flex-grow: 1
    background: var(--color2)
    padding: 1em
    padding-right: 2em
    > h1
      justify-self: left
      font-size: 3em

</style>

<script>
import { defineComponent } from 'vue'
import useUser from '@/compositions/useUsers'
import useProjects from '@/compositions/useProjects'
import Project from '@/components/Project'
import ProjectCart from '@/components/ProjectCart'

export default defineComponent({
  components: {
    Project,
    ProjectCart
  },
  setup () {
    const { selectedProjects } = useUser()
    const { projects } = useProjects()

    return { selectedProjects, projects }
  }
})

</script>
