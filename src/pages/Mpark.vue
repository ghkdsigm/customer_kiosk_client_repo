<template>
  <div>
    <h1 class="mainTit">{{ floorTitle }}</h1>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';
import { useMparkStore } from '@/store/mpark'

export default defineComponent({
name: 'PageMpark',
setup() {
    const { titleEN } = useTitleEN();
    const mparkStore = useMparkStore()
    const floorTitle = computed(() => mparkStore.floorTitle)

    return {
      titleEN,
      floorTitle
    };
  }
});
</script>

<style>

</style>