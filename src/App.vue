<template>
  <Home />
</template>

<script>
import Home from "./views/Home.vue"

export default {
  name: 'App',
  components: {
    Home,
  },
  mounted() {
  },
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>