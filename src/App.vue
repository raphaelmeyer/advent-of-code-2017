<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationView from './views/NavigationView.vue';
</script>

<template>
  <header>
    <h1>❄ Advent of Code 2017 ❄️</h1>
    <NavigationView class="navigation" />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navigation {
  margin: 1em 0 1em 0;
}
</style>
