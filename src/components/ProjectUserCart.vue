
<template>
  <div class="project-user-cart ">
    <h3>{{project.caption}}</h3>
    <div>
      <draggable v-for="user in project.assignedUsers" group="users" :key="user" v-model="users">
        <User :user-id="user"></User>
      </draggable>
    </div>
  </div>
</template>

<style lang="sass">

.project-user-cart
  padding: 1em
  background: var(--color1)
  border-radius: 1em
  flex-basis: 20%
  box-sizing: border-box
  flex-grow: 1

  div
    border: 1px dashed gray
    border-radius: 1em
    min-height: 120px
  h3
    border-bottom: 1px solid var(--color4)
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '@/compositions/useProjects'
import draggable from 'vuedraggable'
import User from '@/components/User'

export default defineComponent({
  components: {
    draggable,
    User
  },
  props: {
    project: Object as unknown as PropType<Project>
  }
})

</script>
