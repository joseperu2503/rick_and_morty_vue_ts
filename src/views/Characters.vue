<template>
  <div class="max-w-7xl mx-auto">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-fit mx-auto"
    >
      <CharacterItem
        v-for="item in characters"
        :key="item.id"
        :character="item"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import CharacterItem from "@/components/character/CharacterItem.vue";
import { useCharacter } from "@/composables/useCharacter";

const { characters, getAllCharacters } = useCharacter();

getAllCharacters();
</script>
