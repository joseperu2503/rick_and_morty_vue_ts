
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

export function useAuthModal() {
  const authStore = useAuthStore()
  const { showAuthModal } = storeToRefs(authStore);

  const closeAuthModal = () => {
    showAuthModal.value = false
  }

  const form = ref<'login' | 'register'>('login')
  const toggleForm = () => {
    form.value = form.value == 'login' ? 'register' : 'login'
  }

  return {
    closeAuthModal,
    form,
    toggleForm,
    showAuthModal
  }
}
