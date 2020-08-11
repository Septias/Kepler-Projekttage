
<template>
  <div id="project-cart">
    <ProjectCartItem v-for="(project, index) in selectedProjects" :key="project.id" :caption="project.caption" :index="index"></ProjectCartItem>
  </div>
</template>

<style lang="sass">
#project-cart
  height: 100vh
  background: var(--color1)
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectCartItem from '@/components/ProjectCartItem'

export default defineComponent({
  components: {
    ProjectCartItem
  },
  props: {
    projects: Array
  },
  setup (props) {
    const { projects } = useProjects()

    const selectedProjects = computed(() => {
      console.log(props.projects)
      if (props.projects) {
        return props.projects.map(projectId => projects.value.find(project => projectId === project.id))
      }
      return []
    })

    return { selectedProjects }
  }
})
</script>
