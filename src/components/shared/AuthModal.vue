<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-10 flex items-center justify-center transition-opacity"
    :class="[showAuthModal ? 'opacity-100 scale-100' : 'opacity-0 scale-0']">
  </div>
  <div class="fixed top-0 right-0 left-0 bottom-0 z-20 transition-all px-4 overflow-y-auto py-4"
    :class="[showAuthModal ? 'scale-100' : 'scale-0']">
    <div class="w-full flex justify-center min-h-full items-center">
      <div ref="target"
        class="w-full max-w-md backdrop-blur-sm bg-black/80 rounded-xl p-8 transition-all shadow-sm shadow-rick-green-1"
        :class="[showAuthModal ? 'scale-100' : 'scale-0']">
        <template v-if="form == 'login'">
          <h2 class="text-xl font-semibold text-rick-white">Login</h2>
          <form class="flex flex-col gap-6 mt-6" @keydown.enter="login">
            <Input v-model="loginForm.email" placeholder="Email" name="email" :error="loginErrors.email" />
            <Input v-model="loginForm.password" placeholder="Contraseña" type="password" :error="loginErrors.password" />
          </form>
          <Button class="w-full mt-10" @click="login" size="large" :loading="loading">Login</Button>
          <div class="flex items-center text-sm gap-2 mt-4 justify-center">
            <span class="text-rick-white ">Don't have an account?</span>
            <button :disabled="loading" class="text-rick-green-3 font-semibold hover:underline" @click="toggleForm">Signup
              now</button>
          </div>
        </template>
        <template v-if="form == 'register'">
          <div>
            <h2 class="text-xl font-semibold text-rick-white">Register</h2>
            <form class="flex flex-col gap-6 mt-6">
              <Input v-model="registerForm.name" placeholder="Name" name="name" :error="registerErrors.name" />
              <Input v-model="registerForm.email" placeholder="Email" name="email" :error="registerErrors.email" />
              <Input v-model="registerForm.password" placeholder="Password" type="password"
                :error="registerErrors.password" />
              <Input v-model="registerForm.password_confirmation" placeholder="Confirm Password" type="password"
                :error="registerErrors.password_confirmation" />
            </form>
            <Button class="w-full mt-10" @click="register" size="large" :loading="loading">Sign up</Button>
            <div class="flex items-center text-sm gap-2 mt-4 justify-center">
              <span class="text-rick-white ">Have an account?</span>
              <button :disabled="loading" class="text-rick-green-3 font-semibold hover:underline"
                @click="toggleForm">Login here</button>
            </div>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import Input from './Input.vue';
import Button from './Button.vue';
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue';
import { useAuthModal } from '@/composables/useAuthModal'

const target = ref(null)

const {
  closeAuthModal,
  form,
  toggleForm,
  showAuthModal,
  login,
  loginForm,
  loginErrors,
  register,
  registerForm,
  registerErrors,
  loading
} = useAuthModal()

onClickOutside(target, closeAuthModal)

</script>
