<template>
  <connect-button></connect-button>
  <Home />
  <!-- <Toast /> -->
</template>

<script>
import Home from "./views/Home.vue"
// import "./services/toast"
import ConnectButton from './components/ConnectButton.vue'

export default {
  name: 'App',
  components: {
    ConnectButton,
    Home,
    // Toast
  },
}
</script>