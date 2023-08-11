<template>
  <div class="border-b border-rick-green-1 flex max-w-3xl mx-auto">
    <div class=" pr-2 py-2 ">
      <i class="fas fa-search text-rick-green-1"></i>
    </div>
    <input type="text" class="flex-1 bg-transparent px-2 text-rick-white outline-none" :value="currentValue"
      @input="onInput" placeholder="Search" @keydown.enter="onEnter" ref="input" />

  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '', // Valor por defecto para :value
  },
  modelValue: String, // Prop para el valor en v-model
});
const emit = defineEmits(["update:modelValue", 'input']);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement)?.value);
  emit("input", (event.target as HTMLInputElement)?.value);

};

const currentValue = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : props.value;
})

const input = ref<HTMLElement | null>(null)

const onEnter = () => {
  input.value?.blur()
}
</script>
