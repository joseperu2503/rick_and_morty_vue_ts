import { ref } from "vue";
import { defineStore } from "pinia";
import { Episode } from "@/interfaces/episode.interface";

export const useEpisodeStore = defineStore("epidosde", () => {
  const episodes = ref<Episode[]>([]);
  const page = ref<number>(1);
  const numPages = ref<number>(2);
  const search = ref("");

  return { episodes, page, numPages, search };
});
