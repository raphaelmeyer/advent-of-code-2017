<script setup lang="ts">
import { useAocStore } from '@/stores/aoc-store';
import { computed, ref } from 'vue';

const aocStore = useAocStore();
const aocCookie = ref('');

function onSetCookie() {
  aocStore.sessionCookie = aocCookie.value;
  aocCookie.value = '';
}

const cookiePreview = computed(() => {
  const cookie = aocStore.sessionCookie;
  if (cookie.length === 0) {
    return 'No session cookie stored.';
  }
  if (cookie.length < 20) {
    return cookie.substring(0, 1) + '...';
  }
  return cookie.substring(0, 10) + '...' + cookie.substring(cookie.length - 2);
});
</script>

<template>
  <div>
    <form @submit.prevent="onSetCookie">
      <input v-model="aocCookie" placeholder="Session Cookie" />
      <button>Set</button>
    </form>
  </div>
  <div>{{ cookiePreview }}</div>
</template>
