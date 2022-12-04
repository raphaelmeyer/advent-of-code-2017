<script setup lang="ts">
import { ref } from 'vue';

const resultPartOne = ref('');
const resultPartTwo = ref('');

function run() {
  resultPartOne.value = '...';
  //
}
</script>

<template>
  <h1>Day 1: Calorie Counting</h1>
  <div>
    <p>Part 1</p>
    <p>{{ resultPartOne }}</p>
    <p>Part 2</p>
    <p>{{ resultPartTwo }}</p>
  </div>
  <div>
    <button @click="run">Run</button>
  </div>
</template>
