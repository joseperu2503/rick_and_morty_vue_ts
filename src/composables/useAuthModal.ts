
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { useToken } from '@/composables/useToken'
import { useAuth } from '@/composables/useAuth';
import { LoginErrors, LoginForm, initLoginForm } from '@/interfaces/login.interface';
import { authApi } from '@/api/authApi';
import { RegisterErrors, RegisterForm, initRegisterForm } from '@/interfaces/register.interface';
import { useFavorites } from "@/composables/useFavorites";

export function useAuthModal() {
  const authStore = useAuthStore()
  const { showAuthModal } = storeToRefs(authStore);
  const closeAuthModal = () => {
    showAuthModal.value = false
    resetLoginForm()
    resetRegisterForm()
    form.value = 'login'
  }

  const openAuthModal = () => {
    showAuthModal.value = true
    resetLoginForm()
    resetRegisterForm()
    form.value = 'login'
  }

  const form = ref<'login' | 'register'>('login')
  const toggleForm = () => {
    form.value = form.value == 'login' ? 'register' : 'login'
  }

  const { saveToken } = useToken()
  const { verifyAuth } = useAuth();
  const loading = ref(false);

  //logica del login
  const loginErrors = ref<LoginErrors>({});
  const loginForm = ref<LoginForm>({ ...initLoginForm });

  const resetLoginForm = () => {
    loginForm.value = { ...initLoginForm }
    loginErrors.value = {}
  }

  const login = async () => {
    //no defino useFavorites en useAuthModal por que me da error de Maximum call stack size exceeded
    const { getFavoriteCharacters } = useFavorites()

    loading.value = true
    try {
      let response = await authApi.post("/login", loginForm.value)
      saveToken(response.data.access_token)
      verifyAuth()
      closeAuthModal()
      getFavoriteCharacters()
    } catch (error: any) {
      if (error.response?.status === 422) {
        loginErrors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  //logica de register
  const registerErrors = ref<RegisterErrors>({});
  const registerForm = ref<RegisterForm>({ ...initRegisterForm });

  const resetRegisterForm = () => {
    registerForm.value = { ...initRegisterForm }
    registerErrors.value = {}
  }

  const register = async () => {
    loading.value = true
    try {
      await authApi.post("/register", registerForm.value)
      loginForm.value = {
        email: registerForm.value.email,
        password: registerForm.value.password
      }
      login()
    } catch (error: any) {
      if (error.response.status === 422) {
        registerErrors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  return {
    closeAuthModal,
    form,
    toggleForm,
    showAuthModal,
    login,
    loginForm,
    loginErrors,
    register,
    registerForm,
    registerErrors,
    loading,
    openAuthModal
  }
}
