<template>
  <div @click="goCharacter()" class="relative cursor-pointer hover:scale-110 transition-all w-full aspect-square"
    :class="{ 'animate-pulse': !imageLoaded && !imageError }">
    <img src="@/assets/avatar_default.jpeg" class="rounded-2xl w-full"
      v-if="imageError || (!imageLoaded && !imageError)" />
    <img :src="character.image" class="rounded-2xl w-full" @load="onImageLoad" @error="onImageError"
      v-show="imageLoaded" />
    <div class="absolute bg-gradient-to-t from-black bottom-0 h-1/5 w-full rounded-b-2xl">
    </div>
    <div class="absolute bg-gradient-to-t from-black bottom-0 opacity-50 h-2/5 w-full rounded-b-2xl">
    </div>
    <div class="absolute bottom-0 h-2/5 w-full px-4 flex items-end pb-2 sm:pb-4 rounded-b-2xl">
      <h2 class="text-lg sm:text-xl md:text-xl text-rick-white leading-none line-clamp-2">
        {{ character.name }}
      </h2>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Character } from "@/interfaces/character.interface.ts";

const router = useRouter();

const props = defineProps<{ character: Character }>();
const { character } = toRefs(props);
const imageLoaded = ref(false);
const imageError = ref(false);

const goCharacter = () => {
  router.push({
    name: "character",
    params: { characterId: character.value.id },
  });
};

const onImageLoad = () => {
  imageLoaded.value = true;
};

const onImageError = () => {
  imageError.value = true;
};
</script>
