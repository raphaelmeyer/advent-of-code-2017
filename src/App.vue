<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <h1>Advent of Code 2022</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/day01">Day 1</RouterLink>
        <RouterLink to="/day02">Day 2</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header > div {
  display: block;
}

nav {
  display: flex;
  flex-direction: row;
}

nav a {
  text-decoration: none;
  color: var(--color-text);
}

/* nav a.router-link-exact-active {
  color: #8800f8;
}

nav a.router-link-exact-active:hover {
  color: #00ff88;
} */
</style>
