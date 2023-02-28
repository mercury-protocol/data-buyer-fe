<template>
  <Home />
</template>

<script>
import Home from "./views/Home.vue"
import { createScript } from './utils.js' // import a utility function to create script element


export default {
  name: 'App',
  components: {
    Home,
  },
  mounted() {
    createScript('https://public.cypherd.io/js/onboardingsdk.jss', 'onboardingsdk').then(() => {
      // The onboardingsdk script has been loaded
      // You can now use the onboardingsdk global variable
    }).catch((error) => {
      // There was an error loading the onboardingsdk script
      console.error(error)
    });
  },
}
</script>

