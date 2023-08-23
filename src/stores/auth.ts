import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { User } from "@/interfaces/user.interface";

export const useAuthStore = defineStore("auth", () => {
  const showAuthModal = ref<boolean>(false);
  const user = ref<null | User>(null)
  const nameInitial = computed(() => {
    return user.value ? user.value.name.charAt(0) : null
  })

  return { showAuthModal, user, nameInitial };
});
