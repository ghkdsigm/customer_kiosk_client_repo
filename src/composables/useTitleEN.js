import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useTitleEN() {
  const route = useRoute();
  const titleEN = computed(() => route.meta?.titleEN);

  return {
    titleEN
  };
}