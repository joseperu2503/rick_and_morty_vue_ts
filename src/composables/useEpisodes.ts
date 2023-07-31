import { http } from "@/http/http.service";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { GetAllEpisodesInterface } from "@/interfaces/episode.interface.ts";
import { useEpisodeStore } from "@/stores/episode";
import { storeToRefs } from "pinia";

export function useEpisodes() {
  const episodeStore = useEpisodeStore();

  const { episodes, page, numPages, search } = storeToRefs(episodeStore);
  const loadMore = ref(true);

  const getAllEpisodes = () => {
    loadMore.value = false;
    let currentSearch: string = search.value;
    http
      .get<GetAllEpisodesInterface>(
        `episode?page=${page.value}&name=${currentSearch}`
      )
      .then((response) => {
        if (search.value == currentSearch) {
          if (page.value == 1) {
            episodes.value = [];
          }
          episodes.value.push(...response.data.results);
          numPages.value = response.data.info.pages;
          page.value++;
          loadMore.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
        if (search.value == currentSearch) {
          episodes.value = [];
        }
      });
  };

  const loadMoreEpisodes = () => {
    if (page.value <= numPages.value && verifyBottom() && loadMore.value) {
      getAllEpisodes();
    }
  };

  if (search.value != "") {
    search.value = "";
    page.value = 1;
    episodes.value = [];
  }
  if (episodes.value.length == 0) {
    getAllEpisodes();
  }

  watch(search, () => {
    page.value = 1;
    getAllEpisodes();
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

    body?.addEventListener("scroll", loadMoreEpisodes);
  });

  onBeforeUnmount(() => {
    document
      .getElementById("body")
      ?.removeEventListener("scroll", loadMoreEpisodes);
  });

  return {
    getAllEpisodes,
    episodes,
    search,
  };
}
