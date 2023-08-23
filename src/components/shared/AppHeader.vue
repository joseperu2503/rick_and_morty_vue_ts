<template>
  <div class="fixed top-0 right-0 left-0 z-10">
    <div class="h-16 w-full bg-gradient-to-b from-black fixed z-20 top-0 px-8 flex items-center justify-between">
      <div>
        <img src="@/assets/logo.png" class="h-10 cursor-pointer" @click="goHome" />
      </div>
      <i class="fas fa-bars text-white text-2xl sm:hidden" @click="toggleSidebar"></i>
      <nav class="hidden text-white text-md sm:flex gap-4 md:gap-8 items-center">
        <router-link active-class="active" :to="link.url" class="neon leading-none" v-for="link in links">
          {{ link.label }}
        </router-link>
        <Button type="outline" @click="showAuthModal = !showAuthModal" v-if="!user">
          Login
        </Button>
        <AuthMenu v-else/>
      </nav>
    </div>
    <div class="bg-black w-full h-16 fixed top-0 z-10" :style="`opacity: ${opacity};`"></div>
    <div class="fixed top-0 right-0 left-0 bottom-0 bg-black/70 z-10 backdrop-blur-sm transition-all"
      :class="[showSideBar ? 'translate-x-0' : 'translate-x-full']">
      <div class="flex h-full flex-col items-center justify-center text-white text-xl sm:flex gap-4">
        <router-link active-class="active" :to="link.url" class="neon" v-for="link in links">
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </div>
  <AuthModal />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppbarStore } from "@/stores/appbar";
import { useScrollStore } from "@/stores/scroll";
import { storeToRefs } from "pinia";
import { useAuthStore } from '@/stores/auth'
import AuthModal from "@/components/shared/AuthModal.vue";
import Button from '@/components/shared/Button.vue';
import AuthMenu from "@/components/shared/AuthMenu.vue";

const links = ref([
  { url: '/', label: 'Home' },
  { url: '/characters', label: 'Characters' },
  { url: '/locations', label: 'Locations' },
  { url: '/episodes', label: 'Episodes' },
])

const router = useRouter();

const appbarStore = useAppbarStore();
const scrollStore = useScrollStore();

const { showSideBar, opacity } = storeToRefs(appbarStore);
const { body } = storeToRefs(scrollStore);

const goHome = () => {
  router.push("/");
};

const toggleSidebar = () => {
  showSideBar.value = !showSideBar.value;
};

onMounted(() => {
  scroll();
  body.value?.addEventListener("scroll", scroll);
});

onBeforeUnmount(() => {
  body.value?.removeEventListener("scroll", scroll);
});

const scroll = () => {
  let scroll = body.value?.scrollTop;
  if (scroll != undefined && scroll <= 180) {
    opacity.value = scroll / 180;
  } else {
    opacity.value = 1;
  }
};


const authStore = useAuthStore()
const { showAuthModal, user } = storeToRefs(authStore);

</script>

<style scoped></style>
