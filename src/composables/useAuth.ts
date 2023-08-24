
import { useToken } from '@/composables/useToken'
import { useAuthStore } from '@/stores/auth'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

export function useAuth() {
  const { validToken, decodeToken } = useToken()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const characterStore = useCharacterStore();
  const { favoriteCharacters } = storeToRefs(characterStore);

  const verifyAuth = () => {
    const isValidToken = validToken()
    if (isValidToken) {
      const decodedToken = decodeToken()
      if (decodedToken) {
        user.value = {
          name: decodedToken.name,
          id: decodedToken.id,
          email: decodedToken.email
        }
      }
    } else {
      user.value = null;
      favoriteCharacters.value = []
    }

    return isValidToken;
  }

  return {
    verifyAuth
  }
}
