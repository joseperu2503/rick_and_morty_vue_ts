import { ref } from "vue";
import { defineStore } from "pinia";
import { Location } from "@/interfaces/location.interface";

export const useLocationStore = defineStore("location", () => {
  const locations = ref<Location[]>([]);
  const page = ref<number>(1);
  const numPages = ref<number>(2);
  const search = ref("");

  return { locations, page, numPages, search };
});
