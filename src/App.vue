<template>
  <div id="app">
    <Players />
  </div>
</template>

<script>
import Players from './components/Players.vue'

export default {
  name: 'App',
  components: {
    Players
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.players {
  width: 800px;
  margin: 0 auto;
}
</style>
