
import { useToken } from '@/composables/useToken'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export function useAuth() {
  const tokenService = useToken()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const verifyAuth = () => {
    const isValidToken = tokenService.isValidToken()
    if (isValidToken) {
      const decodeToken = tokenService.decodeToken()
      if (decodeToken) {
        user.value = {
          name: decodeToken.name,
          id: decodeToken.id,
          email: decodeToken.email
        }
      }
    } else {
      user.value = null;
    }
  }

  return {
    verifyAuth
  }
}
