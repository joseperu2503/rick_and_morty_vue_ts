import { http } from "@/http/http.service";
import { ref } from "vue";
import { Location, initLocation } from "@/interfaces/location.interface.ts";

import { useSomeCharacters } from "@/composables/useSomeCharacters";

export function useLocation() {
  const location = ref<Location>(initLocation);

  const { characters, getSomeCharacters } = useSomeCharacters();

  const getLocation = (locationId: string) => {
    http
      .get<Location>(`location/${locationId}`)
      .then((response) => {
        location.value = response.data;

        let charactersId: string[] = [];

        location.value.residents.map((url) => {
          const parts = url.split("/");
          const id = parts[parts.length - 1];
          charactersId.push(id);
        });

        if (charactersId.length > 0) {
          let someCharacters = charactersId.join(",");
          getSomeCharacters(someCharacters);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getLocation,
    location,
    characters,
  };
}
