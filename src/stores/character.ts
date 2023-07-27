import { ref } from "vue"
import { defineStore } from 'pinia'
import { Character } from "@/interfaces/character.interface"

export const useCharacterStore = defineStore('character', () => {
    const characters = ref<Character[]>([])
    const nextPageCharacters = ref<string | null>('character?page=1')

    return { characters, nextPageCharacters }
})
