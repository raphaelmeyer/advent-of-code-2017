<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationView from './views/NavigationView.vue';
</script>

<template>
  <header>
    <h1>Advent of Code 2017</h1>
    <NavigationView />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
