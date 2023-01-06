<script setup lang="ts">
import { useAocStore } from '@/stores/aoc-store';
import { ref, watch, computed, watchEffect } from 'vue';
import { puzzles } from '@/data/puzzles';
import { useRoute } from 'vue-router';

const store = useAocStore();
const route = useRoute();

const resultPartOne = ref('❓');
const resultPartTwo = ref('❓');

const solve = ref(false);
const selectedDay = ref<number>();

const puzzle = computed(() => {
  return puzzles.find((p) => p.day === selectedDay.value);
});

watchEffect(() => {
  selectedDay.value = Number(route.params.day);
});

watch(solve, () => {
  if (solve.value && puzzle.value) {
    const input = store.fetchInput(puzzle.value.day);
    if (input) {
      const solver = new puzzle.value.solver(input);
      resultPartOne.value = solver.partOne();
      resultPartTwo.value = solver.partTwo();
    }
    solve.value = false;
  }
});

function selectInput(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.item(0);
  if (file && puzzle.value) {
    const day = puzzle.value.day;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        store.storeInput(day, e.target.result as string);
      }
    };
    reader.readAsText(file);
  }
  (event.target as HTMLInputElement).value = '';
}
</script>

<template>
  <h2>Day {{ puzzle?.day }}: {{ puzzle?.name }}</h2>
  <div>
    <p>Part One</p>
    <p>{{ resultPartOne }}</p>
    <p>Part Two</p>
    <p>{{ resultPartTwo }}</p>
  </div>
  <div>
    <button @click="solve = true">Solve</button>
    <input type="file" @change="selectInput" />
  </div>
  <div v-if="puzzle?.day">
    {{ store.fetchInput(puzzle.day) }}
  </div>
</template>
