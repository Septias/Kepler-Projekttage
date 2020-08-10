<template>
  <h1> Erstelle ein Projekt</h1>
  <form id="create-project-form">
    <label for="name">Projektname</label>
    <input type="text" id="name">
    <label for="kurzbeschreibung">Kurzbeschreibung für das Projekt</label>
    <textarea type="text" id="kurzbeschreibung"></textarea>
  </form>
</template>

<style lang="sass">
#create-project-form
  display: flex
  flex-direction: column
  margin: 0 1em
  input[type=text]
    padding: 1em
    margin-bottom: 1em
    border: 0
    box-shadow:0 0 15px 4px rgba(0,0,0,0.1)
    border-radius: .8em
  textarea
      resize: none
      padding:15px
      border-radius:15px
      border:0
      box-shadow:4px 4px 10px rgba(0,0,0,0.06)
  label
    font-size: 1.3em
    color: $main-color
</style>
