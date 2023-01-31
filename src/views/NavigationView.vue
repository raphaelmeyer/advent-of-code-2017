<script setup lang="ts">
import { puzzles } from '@/data/puzzles';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <nav>
      <RouterLink
        v-for="puzzle in puzzles"
        :key="puzzle.day"
        :to="{ path: `/day/${puzzle.day}` }"
      >
        <div class="day">
          <div>Day</div>
          <div>{{ puzzle.day }}</div>
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

nav a {
  color: var(--color-text);
  font-weight: bold;
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

.day {
  width: 3.5em;
  display: flex;
  justify-content: space-between;
}
</style>
