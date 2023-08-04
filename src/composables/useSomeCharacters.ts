import { http } from "@/http/http.service";
import { ref } from "vue";
import { Character } from "@/interfaces/character.interface.ts";

export function useSomeCharacters() {
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

  return {
    characters,
    getSomeCharacters,
  };
}
