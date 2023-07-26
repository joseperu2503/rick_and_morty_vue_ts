import { ref } from "vue"
import { defineStore } from 'pinia'
import { Character } from "@/interfaces/character.interface"

export const useCharacterStore = defineStore('character', () => {
    const characters = ref<Character[]>([])
    const nextPage = ref<string | null>('character?page=1')

    return { characters, nextPage }
})
