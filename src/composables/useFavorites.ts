import { authApi } from "@/api/authApi";
import { useCharacterStore } from "@/stores/character";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

export function useFavorites(characterId?: number) {
  const characterStore = useCharacterStore();
  const { favoriteCharacters } = storeToRefs(characterStore);

  const getFavoriteCharacters = async () => {
    let response = await authApi.get<{ character_id: number }[]>('/get-favorite-characters')
    favoriteCharacters.value = response.data.map((c) => c.character_id)
  }

  const addFavoriteCharacter = async () => {
    await authApi.post(`/add-favorite-character`, {
      characterId
    })
    getFavoriteCharacters()
  }

  const removeFavoriteCharacter = async () => {
    await authApi.post(`/remove-favorite-character`, {
      characterId
    })
    getFavoriteCharacters()
  }

  const isFavorite = computed(() => {
    if (!characterId) return false;
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
