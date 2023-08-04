import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppbarStore = defineStore("appbar", () => {
  const showSideBar = ref<boolean>(false);
  const opacity = ref<number>(0);

  return { showSideBar, opacity };
});
