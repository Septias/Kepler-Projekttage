
<template>
  <div>
    <div style="color:black">
      {{selectedProjects}}
    </div>
    <draggable id="project-cart" v-model="selectedProjects">
      <ProjectCartItem v-for="(project, index) in selectedProjects" :key="project.id" :caption="project.caption" :index="index"></ProjectCartItem>
    </draggable>
  </div>
</template>

<style lang="sass">
#project-cart
  height: 100vh
  background: var(--color1)
  width: 30vw

@media screen and (max-width: 600px)
  #project-cart
    width: 15vw

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectCartItem from '@/components/ProjectCartItem'
import draggable from 'vuedraggable'

export default defineComponent({
  components: {
    draggable,
    ProjectCartItem
  },
  props: {
    projects: Array
  },
  setup (props) {
    const { projects } = useProjects()

    const selectedProjects = computed(() => {
      if (props.projects) {
        return props.projects.map(projectId => projects.value.find(project => projectId === project.id))
      }
      return []
    })

    return { selectedProjects }
  }
})
</script>
