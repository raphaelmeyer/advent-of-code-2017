<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationView from './views/NavigationView.vue';
</script>

<template>
  <header>
    <h1>
      <span class="snow">❄️</span>
      <RouterLink to="/">
        <span class="title"> Advent of Code 2017 </span>
      </RouterLink>
      <span class="snow">❄️</span>
    </h1>
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

.title {
  color: var(--color-title);
}

.snow {
  display: inline-block;
  animation: rotate-snow 4s linear infinite;
}

@keyframes rotate-snow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
