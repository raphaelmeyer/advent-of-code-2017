import { defineStore } from 'pinia';

export const useAocStore = defineStore('aoc', {
  state: () => {
    return { sessionCookie: '' };
  },
});
