import { http } from "@/http/http.service";
import { GetAllCharactersInterface } from "@/interfaces/character.interface.ts";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

export function useCharacters() {
  const characterStore = useCharacterStore();

  const { characters, page, numPages, search } = storeToRefs(characterStore);
  const loadMore = ref(true);

  const getAllCharacters = () => {
    loadMore.value = false;
    let currentSearch: string = search.value;
    http
      .get<GetAllCharactersInterface>(
        `character?page=${page.value}&name=${search.value}`
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
    if (page.value <= numPages.value && verifyBottom() && loadMore.value) {
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

  const verifyBottom = () => {
    const scrollY = document.getElementById("body")?.scrollTop || 0; // Obtener la posición actual del scroll vertical
    const alturaTotal = document.getElementById("body")?.scrollHeight || 0; // Altura total del contenido de la página
    const alturaVentana = window.innerHeight; // Altura visible del navegador

    // Si la suma de la posición actual del scroll y la altura visible del navegador es mayor o igual a la altura total,
    // entonces hemos alcanzado el tope de abajo
    return scrollY + alturaVentana >= alturaTotal - 500;
  };

  onMounted(() => {
    let body = document.getElementById("body");
    if (body) {
      body.scrollTop = 0;
    }

    body?.addEventListener("scroll", loadMoreCharacters);
  });

  onBeforeUnmount(() => {
    document
      .getElementById("body")
      ?.removeEventListener("scroll", loadMoreCharacters);
  });

  return {
    getAllCharacters,
    characters,
    search,
  };
}
