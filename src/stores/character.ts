import { ref } from "vue";
import { defineStore } from "pinia";
import { Character } from "@/interfaces/character.interface";

export const useCharacterStore = defineStore("character", () => {
  const characters = ref<Character[]>([]);
  const page = ref<number>(1);
  const numPages = ref<number>(2);
  const search = ref("");

  return { characters, page, numPages, search };
});
