<template>
  <div class="fixed top-0 right-0 left-0 z-10">
    <div
      class="h-32 pb-12 w-full bg-gradient-to-b from-black fixed z-20 top-0 px-8 flex items-center justify-between"
    >
      <div>
        <img
          src="@/assets/logo.png"
          class="h-14 cursor-pointer"
          @click="goHome"
        />
      </div>
      <i
        class="fas fa-bars text-white text-2xl sm:hidden"
        @click="toggleSidebar"
      ></i>
      <nav class="hidden text-white text-xl sm:flex gap-8">
        <router-link active-class="active" to="/" class="neon"
          >Home</router-link
        >
        <router-link active-class="active" to="/characters" class="neon"
          >Characters</router-link
        >
        <router-link active-class="active" to="/locations" class="neon"
          >Locations</router-link
        >
        <!-- <router-link active-class="active" to="/episodes" class="neon">Episodes</router-link> -->
      </nav>
    </div>
    <div
      class="bg-black w-full h-20 fixed top-0 z-10"
      :style="`opacity: ${opacity};`"
    ></div>
    <div
      class="fixed top-0 right-0 left-0 bottom-0 bg-black/70 z-10 backdrop-blur-sm transition-all"
      :class="[sidebar ? 'translate-x-0' : 'translate-x-full']"
    >
      <div
        class="flex h-full flex-col items-center justify-center text-white text-xl sm:flex gap-4"
      >
        <router-link
          active-class="active"
          to="/"
          class="neon"
          @click="toggleSidebar"
          >Home</router-link
        >
        <router-link
          active-class="active"
          to="/characters"
          class="neon"
          @click="toggleSidebar"
          >Characters</router-link
        >
        <router-link
          active-class="active"
          to="/locations"
          class="neon"
          @click="toggleSidebar"
          >Locations</router-link
        >
        <!-- <router-link active-class="active" to="/episodes" class="neon" @click="toggleSidebar">Episodes</router-link> -->
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 bottom-0 left-0 right-0 overflow-y-auto px-8 fondo pt-32 md:pt-40 pb-16 md:pb-36 z-0"
    id="body"
  >
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const sidebar = ref<boolean>(false);
const opacity = ref<number>(0);

const goHome = () => {
  router.push("/");
};

const toggleSidebar = () => {
  sidebar.value = !sidebar.value;
};

onMounted(() => {
  scroll();
  document.getElementById("body")?.addEventListener("scroll", scroll);
});

onBeforeUnmount(() => {
  document.getElementById("body")?.removeEventListener("scroll", scroll);
});

const scroll = () => {
  let scroll = document.getElementById("body")?.scrollTop;
  if (scroll != undefined && scroll <= 180) {
    opacity.value = scroll / 180;
  } else {
    opacity.value = 1;
  }
};
</script>

<style scoped>
.fondo {
  background: url("@/assets/fondo2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.neon {
  transition: 0.2s;
}

.neon:hover {
  transform: scale(105%);
}

.neon.active {
  text-shadow: 0 0 5px #35c9dd, 0 0 8px #35c9dd, 0 0 13px #35c9dd;
}
</style>
