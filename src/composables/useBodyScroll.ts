import { onMounted } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { storeToRefs } from "pinia";

export function useBodyScroll() {
  const scrollStore = useScrollStore();
  const { body } = storeToRefs(scrollStore);

  onMounted(() => {
    body.value = document.getElementById("body");
    console.log(body.value)
  });
}
