
import { useToken } from '@/composables/useToken'
import { useAuth } from './useAuth';

export function useLogout() {
  const { removeToken } = useToken()
  const { verifyAuth } = useAuth();

  const logout = () => {
    removeToken()
    verifyAuth()
  }

  return {
    logout,
  }
}
