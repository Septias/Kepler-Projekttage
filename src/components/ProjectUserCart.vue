
<template>
  <div class="project-user-cart ">
    <h3>{{project.caption}}</h3>
    <div> </div>
  </div>
</template>

<style lang="sass">

.project-user-cart
  padding: 1em
  background: var(--color1)
  border-radius: 1em
  margin: 1em
  flex-grow: 1
  div
    min-height: 4em
    border: 1px dashed gray
    border-radius: 1em
  h3
    border-bottom: 1px solid var(--color4)
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '@/compositions/useProjects'

export default defineComponent({
  props: {
    project: Object as unknown as PropType<Project>
  }
})

</script>
