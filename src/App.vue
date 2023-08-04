<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 overflow-y-auto px-8 fondo pt-32 md:pt-40 pb-16 md:pb-36 z-0 bg-[#181c2b]" id="body">
    <AppHeader/>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import AppHeader from '@/components/shared/AppHeader.vue';
import { useBodyScroll } from "@/composables/useBodyScroll";

useBodyScroll()
</script>

<style scoped>
.fondo {
  background: url("@/assets/fondo2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fade-enter-active {
  animation: coming 0.2s;
  animation-delay: 0.1s;
  opacity: 0;
}

.fade-leave-active {
  animation: going 0.2s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-10px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
@/composables/useBodyScroll
