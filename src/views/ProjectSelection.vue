
<template>
  <div>ge wow {{test}}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useUser from '@/compositions/useUsers'

export default defineComponent({
  async setup () {
    const users = await useUser()
  }
})

</script>
