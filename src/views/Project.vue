
<template>
  <div id="projectwrapper">
    <ProjectForm v-if="creator" :project="project" :deleteButton="true" @deleted="onDeleted"></ProjectForm>
  </div>
</template>

<style lang="sass">
#projectwrapper
  display: flex
  min-height: 100vh
  font-size: 1.5em
  justify-content: center
  align-items: center
  padding: 2em
  form
    margin: 1em
    padding: 1em
    border: 4px solid var(--color4)
    border-radius: 1em
    max-width: 1000px
    width: 100%
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useUser from '@/compositions/useUser'
import useProjects from '@/compositions/useProjects'
import ProjectForm from '@/components/ProjectForm'
import router from '@/router'

export default defineComponent({
  props: {
    projectid: {
      type: String,
      required: true
    }
  },
  components: {
    ProjectForm
  },
  async setup (props) {
    const { user } = await useUser()
    const { allProjects } = await useProjects()
    const project = computed(() => allProjects.value.find((project) => project.id === props.projectid))
    const creator = computed(() => project.value.creator === user.value.uid)
    function onDeleted () {
      router.push('/')
    }
    return { creator, project, onDeleted }
  }
})

</script>
