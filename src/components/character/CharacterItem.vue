<template>
  <div
    @click="goCharacter()"
    class="relative cursor-pointer hover:scale-110 transition-all max-w-xs"
  >
    <img :src="character.image" class="rounded-2xl w-full" />
    <div
      class="absolute bg-gradient-to-t from-black bottom-0 h-3/5 w-full px-4 flex items-end pb-4 rounded-2xl"
    >
      <h2 class="text-2xl text-white">{{ character.name }}</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { Character } from "@/interfaces/character.interface.ts";

const router = useRouter();

const props = defineProps<{ character: Character }>();
const { character } = toRefs(props);

const goCharacter = () => {
  router.push({
    name: "character",
    params: { characterId: character.value.id },
  });
};
</script>
