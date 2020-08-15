<template>
  <div id="wrapper" class="flex align-center justify-center">
    <div id="create-project">
      <h1> Erstelle ein Projekt</h1>
      <form id="create-project-form" @submit.prevent="() => {createProject(formData)}">
        <label >Projektname</label>
        <input type="text" v-model="formData.caption">
        <label>Kurzbeschreibung für das Projekt</label>
        <textarea v-model="formData.tldr"></textarea>

        <label>Teilnehmer</label>
        <section class="form-group">
          <div class="form-input-line">
            <label>Von</label>
            <input type="number" min="0" max="40" v-model="formData.participantsMin">
            <label>Bis</label>
            <input type="number" min="0" max="40" v-model="formData.participantsMax">
          </div>
        </section>

        <label>Klassenstufen</label>
        <section class="form-group">
          <div class="form-input-line">
            <label>Von</label>
            <input type="number" min="5" max="12" v-model="formData.gradeMin">
            <label>Bis</label>
            <input type="number" min="6" max="12" v-model="formData.gradeMax">
          </div>
        </section>

        <label>Zeiten</label>
        <section class="form-group">
          <label class="label-small">Tag 1</label>
          <div class="form-input-line">
            <label>Von</label>
            <input type="time" v-model="formData.day1Start">
            <label>Bis</label>
            <input type="time" v-model="formData.day1End">
          </div>
          <label class="label-small">Tag 2</label>
          <div class="form-input-line">
            <label>Von</label>
            <input type="time" v-model="formData.day2Start">
            <label>Bis</label>
            <input type="time" v-model="formData.day2End">
          </div>
        </section>

        <label>Bedarf für das Projekt</label>
        <textarea v-model="formData.requirements"></textarea>
        <label>Kosten pro Schüler</label>
        <input type="number" min="0" max="10" v-model="formData.costs">
        <label>Projektbeschreibung</label>
        <div contenteditable="true" class="wy" type="text" @input="inputlul"></div>
        <div class="formbuttons">
          <button> Löschen </button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import useProjects from '@/compositions/useProjects'

export default defineComponent({
  setup () {
    const { createProject } = useProjects()

    const formData = reactive({
      caption: '',
      tldr: '',
      description: '',
      day1Start: '09:00',
      day1End: '13:00',
      day2Start: '09:00',
      day2End: '13:00',
      participantsMin: 5,
      participantsMax: 10,
      gradeMin: 5,
      gradeMax: 12,
      requirements: '',
      costs: '0'
    })
    function inputlul (el) {
      formData.description = el.target.innerHTML
    }

    return { formData, createProject, inputlul }
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

#create-project
  font-size: 1.6em
  width: 100%
  color: var(--color3)
  box-sizing: border-box
  padding: 1.5em
  max-width: 800px
  background: var(--color2)
  form
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

.wy
  min-height: 100px
  @extend %input-shared

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
