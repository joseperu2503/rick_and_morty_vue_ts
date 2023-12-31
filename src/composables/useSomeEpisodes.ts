import { rickAndMortyApi } from "@/api/rickAndMortyApi";
import { ref } from "vue";
import { Episode } from "@/interfaces/episode.interface.ts";

export function useSomeEpisodes() {
  const episodes = ref<Episode[]>([]);

  const getSomeEpisodes = (someEpisodes: string) => {
    rickAndMortyApi
      .get<Episode | Episode[]>(`episode/${someEpisodes}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          episodes.value = response.data;
        } else {
          episodes.value = [response.data];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    episodes,
    getSomeEpisodes,
  };
}
