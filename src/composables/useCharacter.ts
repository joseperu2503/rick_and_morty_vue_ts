import { http } from "@/http/http.service";
import { ref } from "vue";
import { Character, initCharacter } from "@/interfaces/character.interface.ts";
import { useSomeEpisodes } from "@/composables/useSomeEpisodes";
import { useScroll } from "@/composables/useScroll";

export function useCharacter() {

  const character = ref<Character>(initCharacter);
  const showCharacter = ref<boolean>(false);
  const { episodes, getSomeEpisodes } = useSomeEpisodes();

  const getCharacter = (characterId: string) => {
    http
      .get<Character>(`character/${characterId}`)
      .then((response) => {
        character.value = response.data;
        showCharacter.value = true;

        let episodesId: string[] = [];

        character.value.episode.map((url) => {
          const parts = url.split("/");
          const id = parts[parts.length - 1];
          episodesId.push(id);
        });

        if (episodesId.length > 0) {
          let someEpisodes = episodesId.join(",");
          getSomeEpisodes(someEpisodes);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useScroll()

  return {
    getCharacter,
    character,
    showCharacter,
    episodes
  };
}
