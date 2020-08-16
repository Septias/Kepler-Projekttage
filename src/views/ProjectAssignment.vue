
<template>
  <header>
      <h1>Projekt-Zuteilung </h1>
  </header>
  <main>
    <div id="projects">
      <div id="wrapper">
        <ProjectUserCart v-for="project in projects" :key="project.id" :project="project"></ProjectUserCart>
      </div>
    </div>
    <div id="user-cart-wrapper">
      <h2>Offene Nutzer</h2>
      <draggable class="user-cart" v-for="user in openUsers" :key="user" v-model="openUsers" group="users">
        <User :user-id="user"></User>
      </draggable>
    </div>
  </main>

</template>

<style lang="sass">

.user-cart
  border: 1px dashed gray
  width: 100%
  flex-grow: 1
  border-radius: 1em
  padding: 1em

header
    padding: 2em
    background: var(--color1)
    h1
      margin: 0

main
  display: flex
  #projects
    min-width: 75%
    padding: 1em
    #wrapper
      display: grid
      grid-gap: 1em
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  #user-cart-wrapper
    height: 100%
    width: 25%
    padding: 1em
    background: var(--color1)
    display: flex
    flex-direction: column
    position: fixed
    top: 0
    right: 0

</style>

<script lang="ts">
import draggable from 'vuedraggable'
import { defineComponent, computed } from 'vue'
import useProjects from '@/compositions/useProjects'
import ProjectUserCart from '@/components/ProjectUserCart'
import User from '@/components/User'
import useUsers from '@/compositions/useUsers'

export default defineComponent({
  components: {
    ProjectUserCart,
    draggable,
    User
  },
  async setup () {
    const { projects } = await useProjects()
    const { users } = await useUsers()

    const openUsers = computed(() => {
      const unassignedUser = users.value.map((user) => user.uid)
      for (const project of projects.value) {
        for (const user of project.assignedUsers) {
          const index = unassignedUser.indexOf(user)
          if (index > -1) {
            unassignedUser.splice(index, 1)
          }
        }
      }
      return unassignedUser
    })

    return { projects, openUsers }
  }
})

</script>
