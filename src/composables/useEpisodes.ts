import { http } from "@/http/http.service";
import { ref, watch } from "vue";
import { GetAllEpisodesInterface } from "@/interfaces/episode.interface.ts";
import { useEpisodeStore } from "@/stores/episode";
import { storeToRefs } from "pinia";
import { useScroll } from "@/composables/useScroll";

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
    if (page.value <= numPages.value && loadMore.value) {
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

  useScroll(loadMoreEpisodes)

  return {
    getAllEpisodes,
    episodes,
    search,
  };
}
