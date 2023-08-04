import { ref } from "vue";
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", () => {
  const body = ref<HTMLElement | null>(null);

  return { body };
});
