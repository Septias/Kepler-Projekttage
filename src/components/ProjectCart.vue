
<template>
  <div id="project-cart">
    <div>
      <template v-if="selectedProjects.length > 0">
        <draggable  v-model="selectedProjects">
          <ProjectCartItem
          v-for="(projectid, index) in selectedProjects"
          :key="projectid"
          :index="index"
          :projectId="projectid"></ProjectCartItem>
        </draggable>
        <div class="progressbar" :style="{'max-width': progress+'%'}"></div>
        <p v-show="progress > 80" id="success-text">Deine Wahl ist vollständig! <br> Du kannst die Projekte jetz noch neu anordnen, indem du sie an eine andere Stelle ziehst, oder du verlässt die Seite :)</p>

      </template>

      <div id="intro" v-else>
        <p>Klicke auf ein Projekt um es auszuwählen</p>
        <p>Oder</p>
        <router-link to="/create-project">Erstelle ein Projekt</router-link>
      </div>

    </div>
  </div>
</template>

<style lang="sass">

.progressbar
  height: 10px
  max-width: 0px
  background: var(--color4)
  transition: max-width .2s ease
  animation: fullsize .2s

@keyframes fullsize
  from
    width: 0%
  to
    width: 100%

#success-text
  animation: fadein 1s

@keyframes fadein
    from
      opacity: 0
    to
      opacity: 1

#intro
  text-align: center

  :nth-child(1)
    color: var(--color4)
  :nth-child(2)
    margin-bottom: 2em
  a
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
import { defineComponent, computed } from 'vue'
import draggable from 'vuedraggable'
import useUser from '@/compositions/useUser'
import ProjectCartItem from '@/components/ProjectCartItem'

export default defineComponent({
  components: {
    draggable,
    ProjectCartItem
  },
  setup () {
    const { selectedProjects } = useUser()
    const progress = computed(() => {
      return selectedProjects.value.length / 3 * 100
    })

    return { selectedProjects, progress }
  }
})
</script>
