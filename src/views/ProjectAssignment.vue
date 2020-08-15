
<template>
  <header>
      <h1>Projekt-Zuteilung </h1>
  </header>
  <main>
    <div id="projects">
        <ProjectUserCart v-for="project in projects" :key="project.id" :project="project"></ProjectUserCart>
    </div>
    <div id="user-cart">

    </div>
  </main>

</template>

<style lang="sass">
header
    padding: 2em
    background: var(--color1)
    h1
      margin: 0

main
  display: flex
  #projects
    min-width: 80vw
    display: flex
    flex-wrap: wrap
    align-items: flex-start
  #user-cart
    min-height: 100vh
    min-width: 100%
    background: var(--color1)

</style>

<script lang="ts">

import { defineComponent } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectUserCart from '@/components/ProjectUserCart'

export default defineComponent({
  components: {
    ProjectUserCart
  },
  setup () {
    const { projects } = useProjects()
    return { projects }
  }
})

</script>
