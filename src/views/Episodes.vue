<template>
  <div class="max-w-7xl mx-auto">
    <InputSearch v-model="search" />
    <div
      class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <EpisodeItem v-for="item in episodes" :key="item.id" :episode="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEpisodes } from "@/composables/useEpisodes";
import InputSearch from "@/components/shared/InputSearch.vue";
import EpisodeItem from "@/components/episode/EpisodeItem.vue";

const { episodes, search } = useEpisodes();
</script>

<style scoped>

</style>
