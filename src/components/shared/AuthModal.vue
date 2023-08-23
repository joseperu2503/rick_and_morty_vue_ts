<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10 flex items-center justify-center transition-opacity"
    :class="[showAuthModal ? 'opacity-100 scale-100' : 'opacity-0 scale-0']">
  </div>
  <div class="fixed top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-center transition-all "
    :class="[showAuthModal ? 'scale-100' : 'scale-0']">
    <div ref="target"
      class="w-full max-w-md backdrop-blur-sm bg-black/80 rounded-xl p-8 transition-all shadow-sm shadow-rick-green-1"
      :class="[showAuthModal ? 'scale-100' : 'scale-0']">
      <h2 class="text-xl font-semibold text-rick-white">Iniciar Sesion</h2>
      <form action="" class="flex flex-col gap-6 mt-6">
        <Input v-model="loginForm.email" placeholder="Email" name="email" :error="errors.email" />
        <Input v-model="loginForm.password" placeholder="Contraseña" type="password" :error="errors.password" />
      </form>
      <Button class="w-full mt-10" @click="login" size="large">Iniciar sesión</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from './Input.vue';
import Button from './Button.vue';
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue';
import { useLogin } from '@/composables/useLogin'

const target = ref(null)

const { login, loginForm, errors, close, showAuthModal } = useLogin()

onClickOutside(target, close)
</script>
