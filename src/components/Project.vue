<template>
  <div class="project" :class="{selected: selected}">
    <div class="header">
      <div class="headlines">
        <h1>
          {{project.caption}}
        </h1>
        <h3>{{project.tldr}}</h3>

      </div>
      <div class="icon"><button @click="expanded = !expanded"><i class="material-icons">{{expanded ? 'expand_less' : 'expand_more'}}</i></button></div>
    </div>

    <div class="text" ref="description" :style="maxHeight">
       <div class="hr"></div>
       <div v-html="project.description"></div>
    </div>
  </div>

</template>

<style lang="sass">

.hr
  border: 1px solid var(--color2)
  margin-bottom: 1em

.text
  max-height: 0
  overflow: hidden
  transition: max-height .2s ease

.project
  max-width: 55em
  width: 100%
  padding: 1em
  margin-bottom: 1.5em
  border-radius: 1em
  background: var(--color1)
  cursor: pointer

  &.selected
    border: 3px solid var(--color4)

  box-sizing: border-box
  .header
    display: flex
    .headlines
      width: 80%
      h1
        margin-top: 0px

    .icon
      display: flex
      justify-content: center
      align-items: center
      float: right
      width: 20%
      button
        cursor: pointer
        width: 3.6em
        height: 3.6em
        color: var(--color4)
        border: 0
        background: var(--color1)
        padding: 0
        border-radius: 50%
        &:hover
          background: var(--color2)

        i
          font-size: 3em

</style>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import { Project } from '@/compositions/useProjects'

export default defineComponent({
  props: {
    project: (Object as unknown) as PropType<Project>,
    selected: Boolean
  },
  computed: {
    maxHeight () {
      if (this.expanded) {
        return { 'max-height': this.$refs.description.scrollHeight + 'px' }
      }
      return { 'max-height': '0px' }
    }
  },
  setup () {
    const expanded = ref(false)
    return { expanded }
  }
})
</script>
