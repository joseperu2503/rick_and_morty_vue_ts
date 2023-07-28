import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const showSideBar = ref<boolean>(false);

  return { showSideBar };
});
