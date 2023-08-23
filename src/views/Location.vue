<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-3xl sm:text-4xl font-semibold md:text-5xl text-white mb-4 text-center md:text-left">
      {{ location.name }}
    </div>
    <div class="flex mb-10 gap-4 items-center justify-center md:justify-start">
      <div class="bg-rick-3 px-2 py-1 rounded-md text-sky-900 text-xs sm:text-base md:text-base font-bold">
        {{ location.dimension }}
      </div>
      <div class="bg-rick-green-2 px-2 py-1 rounded-md text-rick-white text-xs sm:text-base md:text-base font-bold">
        {{ location.type }}
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mx-auto">
      <CharacterItem v-for="item in characters" :key="item.id" :character="item" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import CharacterItem from "@/components/character/CharacterItem.vue";
import { useLocation } from "@/composables/useLocation";
import { useRoute } from "vue-router";

const route = useRoute();

const locationId = route.params.locationId as string;

const { location, getLocation, characters } = useLocation();
getLocation(locationId);

</script>

