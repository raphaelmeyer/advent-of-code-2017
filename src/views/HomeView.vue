<script setup lang="ts"></script>

<template>
  <div class="icons">🎅 🎄 ⛄ 🦌</div>
  <div class="link">
    <a href="https://adventofcode.com/2017">🔗 Puzzles</a>
  </div>
</template>

<style scoped>
.icons {
  font-size: xx-large;
}

.link {
  margin: 1em 0 0 0;
  font-size: large;
}
.link > a {
  color: var(--color-link);
  font-weight: bold;
}

.link > a:hover {
  color: var(--color-selected);
}
</style>
