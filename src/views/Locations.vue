<template>
  <div class="px-0  pb-24">
    <div class="backdrop-blur-sm bg-white/10 rounded-3xl px-10 pb-8 max-w-4xl mx-auto">
      <div class="flex flex-col">
        <LocationItem v-for="item in locations" :key="item.id" :location="item"/>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import LocationItem from "@/components/location/LocationItem.vue";
import { useLocation } from "@/composables/useLocation";

const { locations, getAllLocations } = useLocation();

getAllLocations();


</script>

