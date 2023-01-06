<script setup lang="ts">
import { puzzles } from '@/data/puzzles';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink
        v-for="puzzle in puzzles"
        :key="puzzle.day"
        :to="{ path: `/day/${puzzle.day}` }"
      >
        Day {{ puzzle.day }}</RouterLink
      >
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
}

nav a {
  color: var(--color-text);
  font-weight: bold;
  margin: 0 1em 0 0;
}

nav a:hover {
  color: var(--color-selected);
}

nav a.router-link-exact-active {
  text-shadow: 0 0 5px var(--color-text);
}

nav a.router-link-exact-active:hover {
  text-shadow: 0 0 5px var(--color-selected);
}
</style>
