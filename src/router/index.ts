import { useAuth } from "@/composables/useAuth";
import { useAuthModal } from "@/composables/useAuthModal";
import { useAppbarStore } from "@/stores/appbar";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("@/views/Characters.vue"),
    },
    {
      path: "/characters/:characterId",
      name: "character",
      component: () => import("@/views/Character.vue"),
    },
    {
      path: "/locations",
      name: "locations",
      component: () => import("@/views/Locations.vue"),
    },
    {
      path: "/locations/:locationId",
      name: "location",
      component: () => import("@/views/Location.vue"),
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('@/views/Episodes.vue')
    },
    {
      path: "/episodes/:episodeId",
      name: "episode",
      component: () => import("@/views/Episode.vue"),
    }
  ],
});

router.beforeEach(async () => {
  const appBar = useAppbarStore();
  const { showSideBar } = storeToRefs(appBar);
  //cierra el sidebar
  showSideBar.value = false;

  const { verifyAuth } = useAuth();
  //verifica si esta autenticado
  verifyAuth()

  const { closeAuthModal } = useAuthModal();
  //cierra el modal de autenticacion
  closeAuthModal()
});

export default router;
