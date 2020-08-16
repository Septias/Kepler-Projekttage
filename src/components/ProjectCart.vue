
<template>
  <div id="project-cart">
    <draggable v-if="selectedProjects.length > 0" v-model="selectedProjects">
      <ProjectCartItem
      v-for="(projectid, index) in selectedProjects"
      :key="projectid"
      :index="index"
      :projectId="projectid"></ProjectCartItem>
    </draggable>
    <div id="intro" v-else>
      <p>Klicke auf ein Projekt um es auszuwählen</p>
      <p>Oder</p>
      <div><router-link to="/create-project">Erstelle ein Projekt</router-link></div>
    </div>
  </div>
</template>

<style lang="sass">

#intro
  text-align: center

  :nth-child(1)
    color: var(--color4)

  div a
    background: var(--color4)
    border: 0
    border-radius: 1em
    padding: 1em
    width: 100%
    color: white
    cursor: pointer
    text-decoration: 0

#project-cart
  min-height: 100%
  background: var(--color1)
  width: 30vw
  &.open
  >div
    box-sizing: border-box
    position: sticky
    padding: 1em
    top: 0

@media screen and (max-width: 600px)
  #project-cart
    min-width: 20vw
    width: auto

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import ProjectCartItem from '@/components/ProjectCartItem'
import draggable from 'vuedraggable'
import useUser from '@/compositions/useUser'

export default defineComponent({
  components: {
    draggable,
    ProjectCartItem
  },
  setup () {
    const { selectedProjects } = useUser()
    return { selectedProjects }
  }
})
</script>
