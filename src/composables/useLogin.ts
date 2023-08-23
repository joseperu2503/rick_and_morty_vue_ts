
import { authApi } from '@/http/authApi'
import { useToken } from '@/composables/useToken'
import { ref } from "vue";
import { LoginErrors, LoginForm, initLoginForm } from '@/interfaces/login.interface';
import { useAuth } from './useAuth';
import { useAuthModal } from './useAuthModal';

export function useLogin() {
  const tokenService = useToken()
  const auth = useAuth();

  const loginErrors = ref<LoginErrors>({});
  const loading = ref(false);
  const showPassword = ref(false);
  const loginForm = ref<LoginForm>({ ...initLoginForm });
  const remember = ref(true);

  const resetLoginForm = () => {
    loginForm.value = { ...initLoginForm }
    loginErrors.value = {}
  }

  const login = async () => {
    loading.value = true
    try {
      let response = await authApi.post("/login", loginForm.value)
      tokenService.saveToken(response.data.access_token)
      auth.verifyAuth()
      console.log('initLoginForm', initLoginForm)
      resetLoginForm()
      closeAuthModal()
    } catch (error: any) {
      if (error.response.status === 422) {
        loginErrors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  const { closeAuthModal } = useAuthModal()

  return {
    login,
    loginErrors,
    loading,
    loginForm,
    remember,
    showPassword,
    resetLoginForm
  }
}
