
<template>
  <main>
    <div id="projects-wrapper">
      <h1>Projektwahl</h1>
      <Project
      v-for="project in projects"
      :key="project.caption"
      :selected="selectedProjects.includes(project.id)"
      :project="project"
      @click="() => {toggleProject(project.id)}"
      >
      </Project>
    </div>
    <ProjectCart></ProjectCart>
  </main>

</template>

<style lang="sass">

main
  display: flex
  color: var(--color3)
  font-size: 1.2em
  #projects-wrapper
    box-sizing: border-box
    display: flex
    width: 100%
    max-width: 80vw
    flex-direction: column
    align-items: center

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
    const { toggleProject, selectedProjects } = useUser()
    const { projects } = useProjects()

    return { toggleProject, selectedProjects, projects }
  }
})

</script>
