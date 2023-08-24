import { authApi } from "@/api/authApi";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
import { computed } from 'vue';
import { useAuthModal } from "@/composables/useAuthModal";
import { useAuth } from "@/composables/useAuth";

export function useFavorites(characterId?: number) {
  const characterStore = useCharacterStore();
  const { favoriteCharacters } = storeToRefs(characterStore);
  const { verifyAuth } = useAuth()
  const { openAuthModal } = useAuthModal()

  const getFavoriteCharacters = async () => {
    const isAuth = verifyAuth()
    if (isAuth) {
      let response = await authApi.get<{ character_id: number }[]>('/get-favorite-characters')
      favoriteCharacters.value = response.data.map((c) => c.character_id)
    }
  }

  const addFavoriteCharacter = async () => {
    const isAuth = verifyAuth()
    if (isAuth) {
      await authApi.post(`/add-favorite-character`, {
        characterId
      })
      getFavoriteCharacters()
    } else {
      openAuthModal()
    }
  }

  const removeFavoriteCharacter = async () => {
    const isAuth = verifyAuth()
    if (isAuth) {
      await authApi.post(`/remove-favorite-character`, {
        characterId
      })
      getFavoriteCharacters()
    } else {
      openAuthModal()
    }
  }

  const isFavorite = computed(() => {
    if (!characterId) {
      return false;
    }
    return favoriteCharacters.value.includes(characterId)
  })

  return {
    getFavoriteCharacters,
    addFavoriteCharacter,
    removeFavoriteCharacter,
    favoriteCharacters,
    isFavorite
  }
}
