import { defineStore } from 'pinia';

interface Input {
  day: number;
  input: string;
}

interface Answer {
  day: number;
  answer: {
    one: string;
    two: string;
  };
}

interface State {
  inputs: Input[];
  answers: Answer[];
}

export const useAocStore = defineStore('aoc', {
  state: (): State => {
    return {
      inputs: [],
      answers: [],
    };
  },
  getters: {
    fetchInput: (state) => {
      return (day: number) => {
        return state.inputs.find((i) => i.day === day)?.input;
      };
    },
    fetchAnswer: (state) => {
      return (day: number) => {
        return state.answers.find((i) => i.day === day)?.answer;
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
    storeAnswer(day: number, answer: { one: string; two: string }) {
      const item = this.answers.find((i) => i.day === day);
      if (item !== undefined) {
        item.answer = answer;
      } else {
        this.answers.push({ day: day, answer: answer });
      }
    },
  },
});
