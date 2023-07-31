<template>
  <div
    class="backdrop-blur-sm bg-black/60 hover:bg-black/30 shadow-sm shadow-rick-green-1 rounded-lg py-4 px-4 flex flex-col justify-between transition-all cursor-pointer"
  >
    <div class="text-white flex justify-end mb-4">
      {{ episode.episode }}
    </div>
    <div
      class="text-white text-base sm:text-lg md:text-xl"
    >
      {{ episode.name }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { Episode } from "@/interfaces/episode.interface";
import { toRefs } from "vue";

const props = defineProps<{ episode: Episode }>();
const { episode } = toRefs(props);


</script>

<style scoped>

</style>
