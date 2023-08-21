import { http } from "@/http/http.service";
import { ref, watch } from "vue";
import { GetAllLocationsInterface } from "@/interfaces/location.interface.ts";
import { useLocationStore } from "@/stores/location";
import { storeToRefs } from "pinia";
import { useScroll } from "@/composables/useScroll";

export function useLocations() {
  const locationStore = useLocationStore();

  const { locations, page, numPages, search } = storeToRefs(locationStore);
  const loadMore = ref(true);

  const getAllLocations = () => {
    loadMore.value = false;
    let currentSearch: string = search.value;
    http
      .get<GetAllLocationsInterface>(
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
    if (page.value <= numPages.value && loadMore.value) {
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

  useScroll(loadMoreLocations)

  return {
    getAllLocations,
    locations,
    search,
  };
}
