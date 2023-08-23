<template>
  <div class="relative" ref="target">
    <button @click="toggleMenu" class="h-8 w-8 bg-rick-green-1 flex justify-center items-center rounded-full">
      {{ nameInitial }}
    </button>
    <div class="backdrop-blur-md bg-black/50 absolute right-0 top-full translate-y-2 rounded-md px-6 py-2 pb-4"
      v-if="showMenu">
      <div class="font-semibold text-lg">{{ user?.name }}</div>
      <div class="text-sm text-gray-300 font-light">{{ user?.email }}</div>
      <hr class="mt-4 border-rick-green-3">
      <button class="flex items-center justify-end gap-2 mt-4" @click="logout">
        Logout
        <Icon icon="material-symbols:logout" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useLogout } from '@/composables/useLogout'

const authStore = useAuthStore()
const { nameInitial, user } = storeToRefs(authStore);

const target = ref(null)
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}

onClickOutside(target, closeMenu)

const { logout } = useLogout()

</script>

