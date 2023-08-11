import { onBeforeUnmount, onMounted } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { storeToRefs } from "pinia";

export function useScroll(callback: () => void = () => {}) {
  const scrollStore = useScrollStore();
  const { body } = storeToRefs(scrollStore);

  onMounted(() => {
    if (body.value) {
      body.value.scrollTop = 0;
    }

    body.value?.addEventListener("scroll", scrollEvent);
  });

  onBeforeUnmount(() => {
    body.value?.removeEventListener("scroll", scrollEvent);
  });

  const scrollEvent = () => {
    if (verifyBottom()) {
      callback();
    }
  }

  const verifyBottom = () => {
    const scrollY = body.value?.scrollTop || 0; // Obtener la posición actual del scroll vertical
    const alturaTotal = body.value?.scrollHeight || 0; // Altura total del contenido de la página
    const alturaVentana = window.innerHeight; // Altura visible del navegador

    // Si la suma de la posición actual del scroll y la altura visible del navegador es mayor o igual a la altura total,
    // entonces hemos alcanzado el tope de abajo
    return scrollY + alturaVentana >= alturaTotal - 500;
  };
}
