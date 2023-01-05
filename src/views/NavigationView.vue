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
  text-decoration: none;
  color: var(--color-text);
  padding: 0 1em 0 0;
}

/* nav a.router-link-exact-active {
  color: #8800f8;
}

nav a.router-link-exact-active:hover {
  color: #00ff88;
} */
</style>
