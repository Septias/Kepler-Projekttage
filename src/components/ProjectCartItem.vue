<template>
  <div class="project-cart-item">
      <div class="number"> <h2>{{index + 1}}.</h2> </div>
      <div class="caption"> <h3>{{caption}} </h3></div>
  </div>
</template>

<style lang="sass">
.project-cart-item
  display: flex
  cursor: pointer
  margin-bottom: 1em
  .number
    flex-grow: 1
    box-sizing: border-box
    border-radius: .3em 0px 0px .3em
    text-align: center
    padding: .6em
    background: var(--color4)
    h2
      margin: 0

  .caption
    width: 100%
    text-align: center
    background: var(--color2)
    border-radius: 0px .3em .3em 0px
    overflow: hidden
    h3
      margin: .3em

@media screen and (max-width: 600px)
  .caption
    max-width: 0px
  .number
    border-radius: .3em !important
    width: 10vw
  .project-cart-item
    height: 10vw
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useProjects from '@/compositions/useProjects'

export default defineComponent({
  props: {
    index: Number,
    projectId: String
  },
  setup (props) {
    const { projects } = useProjects()
    const caption = computed(() => {
      return projects.value.find(proj => proj.id === props.projectId).caption
    })
    return { caption }
  }
})
</script>
