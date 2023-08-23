import { rickAndMortyApi } from "@/api/rickAndMortyApi";
import { ref } from "vue";
import { Character } from "@/interfaces/character.interface.ts";

export function useSomeCharacters() {
  const characters = ref<Character[]>([]);

  const getSomeCharacters = (someCharacters: string) => {
    rickAndMortyApi
      .get<Character | Character[]>(`character/${someCharacters}`)
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

  return {
    characters,
    getSomeCharacters,
  };
}
