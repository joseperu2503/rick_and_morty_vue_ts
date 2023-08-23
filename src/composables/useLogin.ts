
import { authApi } from '@/http/authApi'
import { useToken } from '@/composables/useToken'
import { ref } from "vue";
import { LoginError, LoginForm } from '@/interfaces/login.interface';
import { useAuth } from './useAuth';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export function useLogin() {
  const tokenService = useToken()
  const auth = useAuth();

  const errors = ref<LoginError>({});

  const loading = ref(false);
  const showPassword = ref(false);

  const loginForm = ref<LoginForm>({
    email: "",
    password: "",
  });

  const remember = ref(true);

  const login = async () => {
    loading.value = true
    try {
      let response = await authApi.post("/login", loginForm.value)
      tokenService.saveToken(response.data.access_token)
      auth.verifyAuth()
      close()
    } catch (error: any) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  const authStore = useAuthStore()
  const { showAuthModal } = storeToRefs(authStore);

  const close = () => {
    showAuthModal.value = false
    loginForm.value = {
      email: "",
      password: "",
    }
    errors.value = {}
  }

  return {
    login,
    errors,
    loading,
    loginForm,
    remember,
    showPassword,
    close,
    showAuthModal
  }
}
