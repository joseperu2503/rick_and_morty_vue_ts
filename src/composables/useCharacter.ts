import { http } from "@/http/http.service";
import { ref } from "vue";
import { Character, initCharacter } from "@/interfaces/character.interface.ts";

export function useCharacter() {
  const characters = ref<Character[]>([]);

  const getSomeCharacters = (caracters: string) => {
    http
      .get<Character | Character[]>(`character/${caracters}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          characters.value = response.data;
        } else {
          characters.value = [response.data];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const character = ref<Character>(initCharacter);
  const showCharacter = ref<boolean>(false);

  const getCharacter = (characterId: string) => {
    http
      .get<Character>(`character/${characterId}`)
      .then((response) => {
        character.value = response.data;
        showCharacter.value = true;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    characters,
    getSomeCharacters,
    getCharacter,
    character,
    showCharacter,
  };
}
