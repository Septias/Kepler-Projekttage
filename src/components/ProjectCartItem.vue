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
  .number
    border-radius: .3em 0px 0px .3em
    text-align: center
    padding: .6em
    background: var(--color4)

  .caption
    min-width: 250px
    text-align: center
    width: 150px
    background: var(--color2)
    border-radius: 0px .3em .3em 0px

@media screen and (max-width: 600px)
  .caption
    max-width: 0px
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
