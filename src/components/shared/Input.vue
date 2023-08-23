<template>
  <div class="relative">
    <label class="block mb-0.5 text-sm font-medium text-rick-white">{{ label }}</label>
    <div class="flex relative items-center">
      <input :value="modelValue" @input="input" :type="type == 'password' ? showPassword ? 'text' : 'password' : type"
        class="h-10 bg-transparent outline-none text-rick-white text-sm block w-full p-2.5" :class="[
          error ? 'border-red-400 border-b focus:border-red-500 ' : 'border-b border-gray-300 focus:border-rick-green-1 transition-all',
          { 'pr-10': type == 'password' }
        ]" :placeholder="placeholder" :name="name" />
      <Icon v-if="showPassword && type == 'password'" icon="mdi:eye-outline"
        class="absolute right-2.5 text-rick-white cursor-pointer" @click="togglePassword" />
      <Icon v-if="!showPassword && type == 'password'" icon="mdi:eye-off-outline"
        class="absolute right-2.5 text-rick-white cursor-pointer" @click="togglePassword" />
    </div>
    <span v-if="error" className='text-red-400 text-xs absolute'>{{ error[0] }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue';

defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
  error: Array,
  name: String
})
const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const emit = defineEmits(['update:modelValue'])

const input = (event: any) => {
  emit('update:modelValue', event.target.value)
}

</script>
