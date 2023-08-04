<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-2 md:gap-12 lg:24 justify-center">
      <div class="flex items-center justify-center">
        <img :src="character.image"
          class="w-full max-w-xs md:w-72 rounded-md opacity-0 transition-all duration-700 scale-0"
          :class="{ 'opacity-100 scale-100': showCharacter }" />
      </div>

      <div class="mx-auto md:mx-0 w-full max-w-2xl">
        <div class="flex flex-col gap-3 items-center md:items-start justify-between h-full">
          <h1
            class="text-rick-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 lg:mb-0 font-semibold opacity-0 -translate-x-full transition-all duration-300"
            :class="{ 'opacity-100 translate-x-0': showCharacter }">
            {{ character.name }}
          </h1>
          <div
            class="w-full max-w-xl backdrop-blur-sm bg-black/50 shadow-sm shadow-rick-green-1 rounded-lg py-4 px-8 flex flex-col gap-2 justify-between">
            <div class="flex gap-4 justify-between items-center">
              <span class="text-rick-3 text-sm sm:text-base">GENDER</span>
              <span class="text-white text-sm sm:text-base text-right"> {{ character.gender }}</span>
            </div>
            <div class="flex gap-4 justify-between items-center">
              <span class="text-rick-3 text-sm sm:text-base">SPECIE</span>
              <span class="text-white text-sm sm:text-base text-right"> {{ character.species }}</span>
            </div>
            <div class="flex gap-4 justify-between items-center">
              <span class="text-rick-3 text-sm sm:text-base">STATUS</span>
              <span class="text-white text-sm sm:text-base text-right"> {{ character.status }}</span>
            </div>
            <div class="flex gap-4 justify-between items-center">
              <span class="text-rick-3 text-sm sm:text-base">ORIGIN</span>
              <span class="text-white text-sm sm:text-base text-right"> {{ character.origin?.name }}</span>
            </div>
            <div class="flex gap-4 justify-between items-center" @click="goLocation()">
              <span class="text-rick-3 text-sm sm:text-base cursor-pointer hover:underline">LOCATION</span>
              <div class="text-white text-sm sm:text-base text-right cursor-pointer hover:underline">
                {{ character.location?.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="mt-10 md:mt-20">
      <div class="flex justify-center items-center gap-4">
        <div class="bg-gray-500 h-[0.1px] flex-1"></div>
        <div class="text-rick-white flex items-center gap-3 justify-center">
          <Icon icon="solar:tv-line-duotone" class="h-6 md:h-8 w-auto" />
          <div class="text-lg sm:text-xl lg:text-2xl">Episodes</div>
        </div>
        <div class="bg-gray-500 h-[0.1px] flex-1"></div>
      </div>
      <div class="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EpisodeItem v-for="item in episodes" :key="item.id" :episode="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useCharacter } from "@/composables/useCharacter";
import EpisodeItem from "@/components/episode/EpisodeItem.vue";

const route = useRoute();
const router = useRouter();

const characterId: string = route.params.characterId as string;

const { character, getCharacter, showCharacter, episodes } = useCharacter();
getCharacter(characterId);

const getLocationId = () => {
  let array = character.value.location.url.split("/");
  return array[array.length - 1];
};

const goLocation = () => {
  let locationId = getLocationId();
  router.push({
    name: "location",
    params: { locationId: locationId },
  });
};
</script>
