<template>
  <button :disabled="props.disabled || loading" class="px-4 flex items-center rounded-md justify-center " :class="{
    'bg-rick-green-1 hover:bg-rick-green-2 text-white disabled:bg-gray-500 active:bg-rick-green-1': type == 'solid',
    'border-2 border-rick-green-1 hover:bg-rick-green-1 text-rick-white hover:text-white disabled:text-indigo-300 disabled:border-gray-300 disabled:hover:bg-white active:bg-rick-green-2 active:text-white': type == 'outline',
    'h-7': props.size == 'small',
    'h-8 font-normal ': props.size == 'normal',
    'h-11 font-medium': props.size == 'large',
  }">
    <span class="flex items-center">
      <div class="relative flex items-center">
        <div class="absolute right-full -translate-x-1" v-if="loading">
          <Icon icon="ph:spinner-bold" class="animate-spin"/>
        </div>
        <slot></slot>
      </div>
    </span>
  </button>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'solid' | 'outline'>,
    required: false,
    default: 'solid'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'normal' | 'large'>,
    default: 'normal'
  },
  loading: {
    type: Boolean,
    default: false
  }
});


</script>
