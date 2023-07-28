<template>
  <div class="max-w-7xl mx-auto">
    <InputSearch v-model="search" />
    <div
      class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto"
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
import { useCharacters } from "@/composables/useCharacters";
import InputSearch from "@/components/shared/InputSearch.vue";

const { characters, search } = useCharacters();
</script>
