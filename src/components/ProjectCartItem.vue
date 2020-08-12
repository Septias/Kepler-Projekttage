<template>
  <div class="project-cart-item">
      <div class="number"> <h2>{{index + 1}}.</h2> </div>
      <div class="caption"> <h3>{{caption}} </h3></div>
  </div>
</template>

<style lang="sass">
.project-cart-item
  display: flex
  margin: 1em
  cursor: pointer
  .number
    flex-grow: 1
    box-sizing: border-box
    border-radius: .3em 0px 0px .3em
    text-align: center
    padding: .6em
    background: var(--color4)
    h2
      margin: 0

  .caption
    width: 100%
    text-align: center
    background: var(--color2)
    border-radius: 0px .3em .3em 0px
    overflow: hidden
    h3
      margin: .3em

@media screen and (max-width: 600px)
  .caption
    max-width: 0px
  .number
    border-radius: .3em !important
    width: 15vw
    height: 15vw
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    index: Number,
    caption: String
  }
})
</script>
