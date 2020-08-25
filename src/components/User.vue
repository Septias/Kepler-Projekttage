
<template>
  <div class="user" :style="{background: backgroundColor}">
    <h2>{{abbreviation}}</h2>
  </div>
</template>

<style lang="sass">
.user
  width: 3em
  height: 3em
  text-align: center
  color: inherit
  display: table-cell
  vertical-align: middle
  border-radius: .5em
  cursor: pointer
  h2
    margin: 0
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const abbreviation = computed(() => {
      return props.userId[1] + props.userId[5]
    })
    const backgroundColor = computed(() => {
      if (props.userId === 'nj5jKjId3Bajv1IgOVXFvACbXaM2') {
        return 'hsl(100, 50%, 50%)'
      }

      return props.userId[1].toLowerCase().charCodeAt(0) * props.userId[5].toLowerCase().charCodeAt(0) * 0.625
    })
    return { abbreviation, backgroundColor }
  }
})

</script>
