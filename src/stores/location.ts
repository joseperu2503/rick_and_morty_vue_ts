import { ref } from "vue";
import { defineStore } from "pinia";
import { Location } from "@/interfaces/location.interface";

export const useLocationStore = defineStore("location", () => {
  const locations = ref<Location[]>([]);
  const nextPageLocations = ref<string | null>("location?page=1");

  return { locations, nextPageLocations };
});
