<template>
    <div class="">
        <!--메인섹션-->
        <div class="relative py-6 sm:py-10">      
            <div class="container mx-auto">
                <router-view v-slot="{ Component }">
                    <transition name="route" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </router-view>
            </div>            
        </div>
        <!--하단메뉴-->
        <div class="">
            <Footer />   
        </div>
    </div>
  </template>
  
  <script>
import { ref,onBeforeMount,onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../router'
import Footer from '@/components/layout/home/footer.vue';

export default {  
  components:{
    Footer
  }, 
  setup(){
    const routes = ref([])
    onBeforeMount(()=>{
      //routes.value = router.options.routes
      routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
    });
    onMounted(()=>{
      
    });

    return {
      routes,
      router, 
    }
  },  
  methods:{
    
  },
  
}
</script>

<style>

</style>