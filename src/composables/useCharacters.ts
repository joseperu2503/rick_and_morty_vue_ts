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
    const scrollY = document.getElementById("body")?.scrollTop || 0; // Obtener la posición actual del scroll vertical
    const alturaTotal = document.getElementById("body")?.scrollHeight || 0; // Altura total del contenido de la página
    const alturaVentana = window.innerHeight; // Altura visible del navegador

    // Si la suma de la posición actual del scroll y la altura visible del navegador es mayor o igual a la altura total,
    // entonces hemos alcanzado el tope de abajo
    return scrollY + alturaVentana >= alturaTotal - 500;
  };

  onMounted(() => {
    getAllCharacters();
    document.getElementById("body")?.addEventListener("scroll", getAllCharacters);
  });

  onBeforeUnmount(() => {
    document.getElementById("body")?.removeEventListener("scroll", getAllCharacters);
  });

  return {
    getAllCharacters,
    characters,
  };
}
