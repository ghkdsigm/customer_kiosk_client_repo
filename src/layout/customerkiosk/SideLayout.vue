<template>
  <div class="w-full h-full absolute overflow-hidden">
    <!--Main Section-->
    <div class="relative screenArea"  :class="[{ 'secondMenu': checkSide === true && currentPath !== '/customerkiosk/searchcar' && currentPath !== '/customerkiosk/searchcarnumber'},{ 'bg-[#EBEFF2]' : currentPath === '/customerkiosk/searchcar' || currentPath === '/customerkiosk/searchcarnumber'}]">      
        <div class="mx-auto h-full 2xl:p-22 p-12">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
        </div>            
    </div>
    <!--//Main Section-->
    <!--Side Menu-->
    <SideMenu :sideItems="sideItems" @menu-selected="handleMenuSelected"/>   
    <!--//Side Menu-->
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
//import router from '../router'
import SideMenu from '@/components/layout/appbar/sidemenu.vue'
import { useRoute } from 'vue-router';

export default {    
  components: {   
    SideMenu,
  },
  props:{
    // bottomItems: {
    //   type:Array,
    //   default:(()=>[])
    // }
  },
  setup(){
    const currentRoutes = useRoute()
    const currentPath = computed(() => currentRoutes.path);
    //const routes = ref([])      

    //Side전용
    const sideItems = ref([
      {
        img: 'hub',
        title: '허브 안내',
        subtit: 'HUB',
        to: '',
        subMenu: [
          {
            title: '1F', 
            to: '',
          },
          {
            title: '2F', 
            to: '',
          },
          {
            title: '3F', 
            to: '',
          },
          {
            title: '4F', 
            to: '',
          },
          {
            title: '5F', 
            to: '',
          },
          {
            title: '6F', 
            to: '',
          },
          {
            title: '7F', 
            to: '',
          },
          {
            title: '8F', 
            to: '',
          },
          {
            title: '9F', 
            to: '',
          },
        ],
        color: '#0C7E60',
        state: true
      },
      {
        img: 'tower',
        title: '타워 안내',
        subtit: 'TOWER',        
        to: '',
        subMenu: [
          {
            title: '1F', 
            to: '',
          },
          {
            title: '2F', 
            to: '',
          },
          {
            title: '단치전체', 
            to: '',
          },
        ],
        color: '#ffffff',
        state: true
      },
      {
        img: 'land',
        title: '랜드 안내',
        subtit: 'LAND',        
        to: '',
        subMenu: [
          {
            title: '1F', 
            to: '',
          },
          {
            title: '2F', 
            to: '',
          },
          {
            title: '3F', 
            to: '',
          },
        ],
        color: '#ffffff',
        state: true
      },
    ])

    const checkSide = ref(false)
    // onBeforeMount(()=>{
    //   routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
    // });

    const handleMenuSelected = (menuSelected) => {
      console.log('Menu selected:', menuSelected);
      if(menuSelected){
        checkSide.value = true
      } else {
        checkSide.value = false
      }
      // Do something when menu is selected
    };

    onMounted(() => {
    })
    // onBeforeUpdate(() => {
    // })
    // onUpdated(() => {
    // })
    // onBeforeUnmount(() => {
    // })
    // onUnmounted(() => {
    // })

    return {
      // routes,
      // router,  
      sideItems,
      handleMenuSelected,
      checkSide,
      currentPath  
    }
  },    
}
</script>

<style scoped>
  .screenArea { 
    height:calc(100% - 8rem);
    width: calc(100% - 11rem);
  }  
  .screenArea.secondMenu {
    width: calc(100% - 305px) !important;
  }
  </style>