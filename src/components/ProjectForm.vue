<template>
  <form class="create-project-form" @submit.prevent>
    <label >Projektname</label>
    <input type="text"
      :value="project.caption"
      @input="changeProp('caption', $event.target.value)"
    >
    <label>Kurzbeschreibung für das Projekt</label>
    <textarea :value="project.tldr" @input="changeProp('tldr', $event.target.value)" />

    <label>Teilnehmer</label>
    <section class="form-group">
      <div class="form-input-line">
        <label>Von</label>
        <input type="number" min="0" max="40"
          :value="project.participantsMin"
          @input="changeProp('participantsMin', $event.target.value)">
        <label>Bis</label>
        <input type="number" min="0" max="40"
        :value="project.participantsMax"
        @input="changeProp('participantsMax', $event.target.value)">
      </div>
    </section>
    <label>Klassenstufen</label>
    <section class="form-group">
      <div class="form-input-line">
        <label>Von</label>
        <input type="number" min="5" max="12" :value="project.gradeMin" @input="changeProp('gradeMin', $event.target.value)">
        <label>Bis</label>
        <input type="number" min="6" max="12" :value="project.gradeMax" @input="changeProp('gradeMax', $event.target.value)">
      </div>
    </section>

    <label>Zeiten</label>
    <section class="form-group">
      <label class="label-small">Tag 1</label>
      <div class="form-input-line">
        <label>Von</label>
        <input type="time" :value="project.day1Start" @input="changeProp('day1Start', $event.target.value)">
        <label>Bis</label>
        <input type="time" :value="project.day1End" @input="changeProp('day1End', $event.target.value)">
      </div>
      <label class="label-small">Tag 2</label>
      <div class="form-input-line">
        <label>Von</label>
        <input type="time" :value="project.day2Start" @input="changeProp('day2Start', $event.target.value)">
        <label>Bis</label>
        <input type="time" :value="project.day2End" @input="changeProp('day2End', $event.target.value)">
      </div>
    </section>

    <label>Bedarf für das Projekt</label>
    <textarea :value="project.requirements" @input="changeProp('requirements', $event.target.value)"></textarea>
    <label>Kosten pro Schüler</label>
    <input type="number" min="0" max="25" :value="project.costs" @input="changeProp('costs', $event.target.value)">
    <label>Projektbeschreibung</label>
    <textarea :value="project.description" @input="changeProp('description', $event.target.value)" ></textarea>
    <div class="formbuttons">
      <button @click="deleteProject(project)"> Löschen </button>
      <button v-if="approval" @click="toggleVisibility(project)"><i class="material-icons">{{project.visible ? 'visibility' : 'visibility_off'}}</i> </button>
      <button v-else @click="createProject(project)">Speichern</button>
    </div>
  </form>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useProjects, { Project } from '@/compositions/useProjects'

export default defineComponent({
  props: {
    project: Object as unknown as PropType<Project>,
    approval: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props) {
    const { createProject, toggleVisibility, deleteProject } = useProjects()

    function changeProp (key, value) {
      // eslint-disable-next-line vue/no-mutating-props
      props.project[key] = value
    }
    return { changeProp, createProject, toggleVisibility, deleteProject }
  }
})

</script>

<style lang="sass" scoped>
%input-shared
  font-family: inherit
  padding: 1em
  margin-bottom: 1em
  border: 0
  background: var(--color1)
  border-radius: .8em
  color: inherit
  &:hover
    background: var(--color1-lighten)

.create-project-form
  :focus
    border: 3px solid var(--color4)
  display: flex
  flex-direction: column
  input
    @extend %input-shared
  textarea
    @extend %input-shared
    resize: none
  label
    font-weight: 400
    margin-bottom: .2em
  button
    border: none
    border-radius: 1em
    background: var(--color1)
    padding: 1em
    color: inherit
    font-size: .8em
    &:hover
      background: var(--color1-lighten)
  h3
    font-size: .8em

.formbuttons
  display: flex
  justify-content: space-between

.form-group
  margin: .5em 0px

.form-input-line
  display: flex
  align-items: baseline
  input
    min-width: 40px
    flex-grow: 1
  label
    font-size: .7em
    margin: 0 1em

.label-small
  font-size: .8em
  display: block

@media screen and (min-width: 800px)
  #create-project
    border-radius: $md
    margin: 2em
</style>
