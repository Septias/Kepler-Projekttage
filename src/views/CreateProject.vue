<template>
  <div id="wrapper" class="flex align-center justify-center">
    <div id="create-project">
      <h1> Erstelle ein Projekt</h1>
      <form id="create-project-form" @submit.prevent="addProject">
        <label >Projektname</label>
        <input type="text" v-model="formData.caption">
        <label>Kurzbeschreibung für das Projekt</label>
        <textarea v-model="formData.tldr"></textarea>

        <section class="form-group">
          <h2>Teilnehmer</h2>
          <div class="form-input-line">
            <label>Von</label>
            <input type="number" min="0" max="40" v-model="formData.participantsMin">
            <label>Bis</label>
            <input type="number" min="0" max="40" v-model="formData.participantsMax">
          </div>
        </section>

        <section class="form-group">
          <h2>Klassenstufen</h2>
          <div class="form-input-line">
            <label>Von</label>
            <input type="number" min="5" max="12" v-model="formData.gradeMin">
            <label>Bis</label>
            <input type="number" min="6" max="12" v-model="formData.gradeMax">
          </div>
        </section>

        <section class="form-group">
          <h2>Zeiten</h2>
          <h3>Tag 1</h3>
          <div class="form-input-line">
            <label>Von</label>
            <input type="time" v-model="formData.day1Start">
            <label>Bis</label>
            <input type="time" v-model="formData.day1End">
          </div>
          <h3>Tag 2</h3>
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

export default defineComponent({
  setup () {
    function addProject () {
      console.log('ok')
    }

    const formData = reactive({
      caption: '',
      tldr: '',
      description: 'aaa',
      day1Start: '09:00',
      day1End: '13:00',
      day2Start: '09:00',
      day2End: '13:00',
      participantsMin: '5',
      participantsMax: '10',
      gradeMin: '5',
      gradeMax: '12',
      requirements: '',
      costs: '0'
    })
    function inputlul (el) {
      formData.description = el.target.innerHTML
    }

    return { formData, addProject, inputlul }
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
  font-size: inherit
  &:hover
        background: var(--color1-lighten)

#create-project
  font-size: 1.3em
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
      padding-bottom: 4px
      font-weight: 400
    button
      border: none
      border-radius: 1em
      background: var(--color1)
      padding: 1em
      color: inherit
      font-size: 1em
      &:hover
        background: var(--color1-lighten)

.formbuttons
  display: flex
  justify-content: space-between

.wy
  min-height: 100px
  @extend %input-shared

.form-group
  margin: .5em 0
  .form-input-line
    display: flex
    align-items: baseline
    input
      min-width: 40px
      flex-grow: 1
    label
      margin: 0 1em

@media screen and (min-width: 800px)
  #create-project
    border-radius: $md
    margin: 2em
</style>
