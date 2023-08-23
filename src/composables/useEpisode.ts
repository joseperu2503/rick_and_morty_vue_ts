import { rickAndMortyApi } from "@/api/rickAndMortyApi";
import { ref } from "vue";
import { Episode, initEpisode } from "@/interfaces/episode.interface.ts";
import { useSomeCharacters } from "@/composables/useSomeCharacters";

export function useEpisode() {

  const episode = ref<Episode>(initEpisode);
  const showEpisode = ref<boolean>(false);
  const { characters, getSomeCharacters } = useSomeCharacters();

  const getEpisode = (episodeId: string) => {
    rickAndMortyApi
      .get<Episode>(`episode/${episodeId}`)
      .then((response) => {
        episode.value = response.data;
        showEpisode.value = true;

        let charactersId: string[] = [];

        episode.value.characters.map((url) => {
          const parts = url.split("/");
          const id = parts[parts.length - 1];
          charactersId.push(id);
        });

        if (charactersId.length > 0) {
          let someCharaters = charactersId.join(",");
          getSomeCharacters(someCharaters);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getEpisode,
    episode,
    showEpisode,
    characters
  };
}
