import { http } from "@/http/http.service";
import { ref, watch } from "vue";
import { Location, initLocation } from "@/interfaces/location.interface.ts";

import { Character } from "@/interfaces/character.interface.ts";

import { useCharacter } from "@/composables/useCharacter";

export function useLocation() {
  const location = ref<Location>(initLocation);
  const residents = ref<Character[]>();

  const { characters, getSomeCharacters } = useCharacter();

  const getLocation = (locationId: string) => {
    http
      .get<Location>(`location/${locationId}`)
      .then((response) => {
        location.value = response.data;

        let residentsId: string[] = [];

        location.value.residents.map((url) => {
          const parts = url.split("/");
          const id = parts[parts.length - 1];
          residentsId.push(id);
        });
        // console.log('residentsId',this.residentsId)
        if (residentsId.length > 0) {
          let someCharacters = residentsId.join(",");
          getSomeCharacters(someCharacters);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  watch(characters, () => {
    residents.value = characters.value;
  });

  return {
    getLocation,
    location,
    residents,
  };
}
