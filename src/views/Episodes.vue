<template>
  <div class="max-w-5xl mx-auto">
    <InputSearch v-model="search" />
    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <EpisodeItem v-for="item in episodes" :key="item.id" :episode="item" />
    </div>
    <div v-if="episodes.length == 0 && search != ''"
      class="text-rick-white  flex items-center justify-center text-lg font-semibold py-10">
      No results found.</div>
  </div>
</template>

<script setup lang="ts">
import { useEpisodes } from "@/composables/useEpisodes";
import InputSearch from "@/components/shared/InputSearch.vue";
import EpisodeItem from "@/components/episode/EpisodeItem.vue";

const { episodes, search } = useEpisodes();
</script>

<style scoped></style>
