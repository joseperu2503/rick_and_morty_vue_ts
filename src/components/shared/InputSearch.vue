<template>
  <div class="border-b border-rick-green-1 flex max-w-3xl mx-auto">
    <div class=" pr-2 py-2 ">
      <i class="fas fa-search text-rick-green-1"></i>
    </div>
    <input
      type="text"
      class="flex-1 bg-transparent px-2 text-rick-white outline-none"
      :value="modelValue"
      @input="onInput"
      placeholder="Search"
    />

  </div>
</template>
<script lang="ts" setup>
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement)?.value);
};
</script>
