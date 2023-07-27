import { http } from "@/http/http.service";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { GetAllLocartionsInterface } from "@/interfaces/location.interface.ts";
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";

export function useLocations() {
  const locationStore = useLocationStore();

  const { locations, nextPageLocations } = storeToRefs(locationStore);
  const loadMore = ref(true);

  const getAllLocations = () => {
    if (nextPageLocations.value && verifyBottom() && loadMore.value) {
      loadMore.value = false;
      http
        .get<GetAllLocartionsInterface>(nextPageLocations.value)
        .then((response) => {
          locations.value.push(...response.data.results);
          nextPageLocations.value = response.data.info.next;
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
    getAllLocations();
    document
      .getElementById("body")
      ?.addEventListener("scroll", getAllLocations);
  });

  onBeforeUnmount(() => {
    document
      .getElementById("body")
      ?.removeEventListener("scroll", getAllLocations);
  });

  return {
    getAllLocations,
    locations,
  };
}
