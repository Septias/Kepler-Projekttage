
<template>
  <div style="background: var(--color1)">
    <section id="projectswrapper" v-for="project in projects" :key="project.id">
      <div>
         <ProjectForm  :project="project"/>
        <div>
          <div v-if="project.visible"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="sass">

#projectswrapper
  display: flex
  flex-direction: column
  font-size: 1.5em
  justify-content: center
  align-items: center
  padding: 2em
  background: var(--color2)
  >div
    margin: 1em
    padding: 1em
    border: 4px solid var(--color4)
    border-radius: 1em
    max-width: 1000px
    width: 100%

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectForm from '@/components/ProjectForm'

export default defineComponent({
  components: {
    ProjectForm
  },
  setup () {
    const { projects } = useProjects()
    return { projects }
  }
})
</script>
