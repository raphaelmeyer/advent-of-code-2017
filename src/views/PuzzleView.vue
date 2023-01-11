<script setup lang="ts">
import { useAocStore } from '@/stores/aoc-store';
import { ref, watch, computed, watchEffect } from 'vue';
import { puzzles } from '@/data/puzzles';
import { useRoute } from 'vue-router';

const store = useAocStore();
const route = useRoute();

const answer = ref<{ one: string; two: string }>();
const input = ref<string>();

const solve = ref(false);
const selectedDay = ref<number>();

const puzzle = computed(() => {
  return puzzles.find((p) => p.day === selectedDay.value);
});

watchEffect(() => {
  selectedDay.value = Number(route.params.day);
  if (selectedDay.value !== undefined) {
    input.value = store.fetchInput(selectedDay.value);
    answer.value = store.fetchAnswer(selectedDay.value);
  }
});

watch(solve, () => {
  if (solve.value && puzzle.value) {
    if (input.value) {
      answer.value = undefined;
      const solver = new puzzle.value.solver(input.value);
      const one = solver.partOne();
      const two = solver.partTwo();
      answer.value = { one: one, two: two };
      store.storeAnswer(puzzle.value.day, { one: one, two: two });
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
        const inputValue = e.target.result as string;
        input.value = inputValue;
        store.storeInput(day, inputValue);
      }
    };
    reader.readAsText(file);
  }
  (event.target as HTMLInputElement).value = '';
}
</script>

<template>
  <h2>Day {{ puzzle?.day }}: {{ puzzle?.name }}</h2>
  <div class="desc">
    <a :href="`https://adventofcode.com/2017/day/${selectedDay}`"
      >🔗 Description</a
    >
  </div>
  <div class="results">
    <div class="part">
      <div>⭐ Part One</div>
      <div class="result">{{ answer?.one ?? '❓' }}</div>
    </div>
    <div class="part">
      <div>⭐ Part Two</div>
      <div class="result">{{ answer?.two ?? '❓' }}</div>
    </div>
  </div>
  <div class="buttons">
    <label :class="{ disabled: input === undefined }" @click="solve = true"
      >Solve</label
    >
    <label for="select-input">Load input</label>
    <input id="select-input" type="file" @change="selectInput" />
  </div>
  <div v-if="input" class="puzzle-input">
    {{ input }}
  </div>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: row;

  margin: 1em 0 1em 0;
}

.part {
  display: flex;
  flex-direction: column;
  width: 20em;
  margin: 0 2em 1em 0;
}

.result {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: var(--color-element);
  margin: 1em 0 0 0;
  height: 5em;
}

.buttons {
  display: flex;
  flex-direction: row;
}

label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 2em;
  width: 6em;
  background-color: var(--color-text);
  color: var(--color-element);

  margin: 0 1em 0 0;
  padding: 0.2em;

  font-size: 1em;
  font-weight: bold;

  user-select: none;
}

label.disabled {
  color: var(--color-inactive);
}

input[type='file'] {
  opacity: 0;
  width: 0;
}

.puzzle-input {
  background-color: var(--color-element);
  width: 100%;
  margin: 1em 0 1em 0;

  font-family: monospace;

  display: block;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.desc {
  margin: 1em 0 0 0;
}
.desc > a {
  color: var(--color-link);
  font-weight: bold;
}

.desc > a:hover {
  color: var(--color-selected);
}
</style>
