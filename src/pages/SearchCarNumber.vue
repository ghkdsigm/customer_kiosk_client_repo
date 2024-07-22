<template>
  <div>
    <h1 class="tit">{{ titleEN }}</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';

export default defineComponent({
name: 'PageSearchCarNumber',
setup() {
    const { titleEN } = useTitleEN();

    return {
      titleEN
    };
  }
});
</script>

<style>

</style>