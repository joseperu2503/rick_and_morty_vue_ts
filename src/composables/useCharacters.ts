import { http } from "@/http/http.service";
import { GetAllCharactersInterface } from "@/interfaces/character.interface.ts";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useScroll } from "@/composables/useScroll";

export function useCharacters() {
  const characterStore = useCharacterStore();

  const { characters, page, numPages, search } = storeToRefs(characterStore);
  const loadMore = ref(true);

  const getAllCharacters = () => {
    loadMore.value = false;
    let currentSearch: string = search.value;
    http
      .get<GetAllCharactersInterface>(
        `character?page=${page.value}&name=${currentSearch}`
      )
      .then((response) => {
        if (search.value == currentSearch) {
          if (page.value == 1) {
            characters.value = [];
          }
          characters.value.push(...response.data.results);
          numPages.value = response.data.info.pages;
          page.value++;
          loadMore.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
        if (search.value == currentSearch) {
          characters.value = [];
        }
      });
  };

  const loadMoreCharacters = () => {
    if (page.value <= numPages.value && loadMore.value) {
      getAllCharacters();
    }
  };

  if (search.value != "") {
    search.value = "";
    page.value = 1;
    characters.value = [];
  }
  if (characters.value.length == 0) {
    getAllCharacters();
  }

  watch(search, () => {
    page.value = 1;
    getAllCharacters();
  });

  useScroll(loadMoreCharacters)

  return {
    getAllCharacters,
    characters,
    search,
  };
}
