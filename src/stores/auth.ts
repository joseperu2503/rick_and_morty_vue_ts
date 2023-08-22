import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const showAuthModal = ref<boolean>(false);

  return { showAuthModal };
});
