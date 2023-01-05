import { defineStore } from 'pinia';

interface Input {
  day: number;
  input: string;
}

interface State {
  inputs: Input[];
}

export const useAocStore = defineStore('aoc', {
  state: (): State => {
    return {
      inputs: [],
    };
  },
  getters: {
    fetchInput: (state) => {
      return (day: number) => {
        return state.inputs.find((i) => i.day === day)?.input;
      };
    },
  },
  actions: {
    storeInput(day: number, input: string) {
      const item = this.inputs.find((i) => i.day === day);
      if (item !== undefined) {
        item.input = input;
      } else {
        this.inputs.push({ day: day, input: input });
      }
    },
  },
});
