<template>
  <div id="wrapper" class="flex align-center justify-center h-100">
    <div id="create-project">
      <h1> Erstelle ein Projekt</h1>
      <form id="create-project-form">
        <label for="name">Projektname</label>
        <input type="text" id="name">
        <label for="kurzbeschreibung">Kurzbeschreibung für das Projekt</label>
        <textarea type="text" id="kurzbeschreibung"></textarea>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
%input-shared
  font-family: inherit
  font-size: 1.3em
  padding: 1em
  margin-bottom: 1em
  border: 0
  background: var(--color1)
  border-radius: .8em
  color: inherit

@media screen and (min-width: 800px)
  #create-project
    border-radius: $md
    margin: 2em

#wrapper
  background: var(--color2)

#create-project
  width: 100%
  color: #F7F7F7F2
  box-sizing: border-box
  padding: 1.5em
  max-width: 800px
  background: var(--color2)
  form
    display: flex
    flex-direction: column
    input
      @extend %input-shared
    textarea
      @extend %input-shared
      resize: none
    label
      padding-bottom: 4px
      font-size: 1.3em
</style>
