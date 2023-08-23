
import { useToken } from '@/composables/useToken'
import { useAuth } from './useAuth';

export function useLogout() {
  const tokenService = useToken()
  const auth = useAuth();

  const logout = () => {
    tokenService.removeToken()
    auth.verifyAuth()
  }

  return {
    logout,
  }
}
