
<template>
  <main>
    <div id="projects-wrapper">
      <h1>Projektwahl</h1>
      <Project v-for="project in projects" :key="project.caption" :project="project"></Project>
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
    align-content: center
    flex-grow: 1
    background: var(--color2)
    padding: 1em
    padding-right: 2em
    > h1
      font-size: 3em

</style>

<script>
import { defineComponent, watch } from 'vue'
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
    watch(selectedProjects, () => {
      console.log(selectedProjects)
    })
    return { selectedProjects, projects }
  }
})

</script>
