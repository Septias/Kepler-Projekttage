
<template>
  <div>ge wow {{test}}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const test = ref('ja')
    return { test }
  }
})

</script>
