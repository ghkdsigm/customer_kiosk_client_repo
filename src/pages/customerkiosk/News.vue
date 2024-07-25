<template>
  <div class="flex flex-col h-full">
    <h1 class="tit">{{ titleEN }}</h1>
    <HomeNews />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';
import HomeNews from '@/components/home/news/index.vue'

export default defineComponent({
name: 'PageNews',
components: {
    HomeNews,
},
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