import { http } from "@/http/http.service";
import { GetAllCharactersInterface } from "@/interfaces/character.interface.ts";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useCharacters() {
  const characterStore = useCharacterStore();

  const { characters, nextPage } = storeToRefs(characterStore);
  const loadMore = ref(true);

  const getAllCharacters = () => {
    if (nextPage.value && verifyBottom() && loadMore.value) {
      loadMore.value = false;
      http
        .get<GetAllCharactersInterface>(nextPage.value)
        .then((response) => {
          characters.value.push(...response.data.results);
          nextPage.value = response.data.info.next;
          loadMore.value = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyBottom = () => {
    const scrollY = window.scrollY; // Obtener la posición actual del scroll vertical
    const alturaTotal = document.documentElement.scrollHeight; // Altura total del contenido de la página
    const alturaVentana = window.innerHeight; // Altura visible del navegador

    // Si la suma de la posición actual del scroll y la altura visible del navegador es mayor o igual a la altura total,
    // entonces hemos alcanzado el tope de abajo
    return scrollY + alturaVentana >= alturaTotal - 500;
  };

  onMounted(() => {
    getAllCharacters();
    window.addEventListener("scroll", getAllCharacters);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", getAllCharacters);
  });

  return {
    getAllCharacters,
    characters,
  };
}
