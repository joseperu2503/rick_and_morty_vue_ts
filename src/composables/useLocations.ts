import { http } from "@/http/http.service";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { GetAllLocartionsInterface } from "@/interfaces/location.interface.ts";
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";

export function useLocations() {
  const locationStore = useLocationStore();

  const { locations, page, numPages, search } = storeToRefs(locationStore);
  const loadMore = ref(true);

  const getAllLocations = () => {
    loadMore.value = false;
    let currentSearch: string = search.value;
    http
      .get<GetAllLocartionsInterface>(
        `location?page=${page.value}&name=${currentSearch}`
      )
      .then((response) => {
        if (search.value == currentSearch) {
          if (page.value == 1) {
            locations.value = [];
          }
          locations.value.push(...response.data.results);
          numPages.value = response.data.info.pages;
          page.value++;
          loadMore.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
        if (search.value == currentSearch) {
          locations.value = [];
        }
      });
  };

  const loadMoreLocations = () => {
    if (page.value <= numPages.value && verifyBottom() && loadMore.value) {
      getAllLocations();
    }
  };

  if (search.value != "") {
    search.value = "";
    page.value = 1;
    locations.value = [];
  }
  if (locations.value.length == 0) {
    getAllLocations();
  }

  watch(search, () => {
    page.value = 1;
    getAllLocations();
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

    body?.addEventListener("scroll", loadMoreLocations);
  });

  onBeforeUnmount(() => {
    document
      .getElementById("body")
      ?.removeEventListener("scroll", loadMoreLocations);
  });

  return {
    getAllLocations,
    locations,
    search,
  };
}
