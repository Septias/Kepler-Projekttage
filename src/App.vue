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
  font-size: .9em

@media screen and (max-width: 600px)
  #app
    font-size: 2.1vw

body
  margin: 0px

:root
  --color1: #182237
  --color2-lighten: #0f1522
  --color2: #0f1522
  --color3: #fff
  --color4: #C82F2F
  --color5: #FFF

</style>
