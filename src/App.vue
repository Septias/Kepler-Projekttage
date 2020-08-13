<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="sass">
#app
  font-family: 'Lato', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-size: clamp(8px, 2.1vw, .9em)

body
  margin: 0px

:root
  --color1: #182237
  --color1-lighten: #1d2b46
  --color2: #0f1522
  --color3: #fff
  --color4: #C82F2F
  --color5: #FFF

  background: var(--color2)
</style>
