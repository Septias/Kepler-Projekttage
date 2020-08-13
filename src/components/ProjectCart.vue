
<template>
  <div ref="project-cart" @click="$refs['project-cart'].focus()">
    <draggable id="project-cart" v-model="selectedProjects">
      <ProjectCartItem
      v-for="(projectid, index) in selectedProjects"
      :key="projectid"
      :index="index"
      :projectId="projectid"></ProjectCartItem>
    </draggable>
  </div>
</template>

<style lang="sass">
#project-cart
  height: 100vh
  background: var(--color1)
  width: 30vw
  padding: 1em
  &.open

@media screen and (max-width: 600px)
  #project-cart
    width: 10vw

</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProjectCartItem from '@/components/ProjectCartItem'
import draggable from 'vuedraggable'
import useUsers from '@/compositions/useUsers'

export default defineComponent({
  components: {
    draggable,
    ProjectCartItem
  },
  setup () {
    const { selectedProjects } = useUsers()
    return { selectedProjects }
  }
})
</script>
