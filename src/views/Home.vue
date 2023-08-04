<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 flex flex-col justify-center">
    <Slider :characters="characters" />

    <div class="flex justify-center mt-16">
      <Button @click="enter" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Slider from "@/components/home/Slider.vue";
import Button from "@/components/home/Button.vue";
import { useSomeCharacters } from "@/composables/useSomeCharacters";
import { useRouter } from "vue-router";
const router = useRouter();

const { characters, getSomeCharacters } = useSomeCharacters();

getSomeCharacters("1,2,3,4,5");

const enter = () => {
  router.push({ name: "characters" });
};
</script>
