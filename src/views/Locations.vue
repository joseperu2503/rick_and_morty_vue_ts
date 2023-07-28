<template>
  <div class="rounded-3xl pb-8 max-w-7xl mx-auto">
    <InputSearch v-model="search" />
    <div
      class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <LocationItem v-for="item in locations" :key="item.id" :location="item" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LocationItem from "@/components/location/LocationItem.vue";
import { useLocations } from "@/composables/useLocations";
import InputSearch from "@/components/shared/InputSearch.vue";

const { locations, search } = useLocations();
</script>
