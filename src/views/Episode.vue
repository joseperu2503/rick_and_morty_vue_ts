<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-3xl sm:text-4xl font-semibold md:text-5xl text-white mb-4 text-center md:text-left">
      {{ episode.name }}
    </div>
    <div class="flex mb-20 gap-4 items-center justify-center md:justify-start">
      <div class="bg-rick-3 px-2 py-1 rounded-md text-sky-900 text-xs sm:text-base md:text-base font-bold">
        {{ episode.episode }}
      </div>
      <div class="bg-rick-green-2 px-2 py-1 rounded-md text-rick-white text-xs sm:text-base md:text-base font-bold">
        {{ episode.air_date }}
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mx-auto">
      <CharacterItem v-for="item in characters" :key="item.id" :character="item" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import CharacterItem from "@/components/character/CharacterItem.vue";
import { useEpisode } from "@/composables/useEpisode";
import { useRoute } from "vue-router";


const route = useRoute();

const episodeId = route.params.episodeId as string;

const { episode, getEpisode, characters } = useEpisode();
getEpisode(episodeId);

</script>

