<template>
  <div class="w-full h-full absolute overflow-hidden">
    <!--Main Section-->
    <div class="relative screenArea"  :class="[{ 'secondMenu': checkSide === true && currentPath !== '/searchcar' && currentPath !== '/searchcarnumber'},{ 'bg-[#EBEFF2]' : currentPath === '/searchcar' || currentPath === '/searchcarnumber'}]">      
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
    
    <!--Bottom Menu-->
    <BottomMenu :bottomItems="bottomItems" />   
    <!--//Bottom Menu-->
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
//import router from '../router'
import BottomMenu from '@/components/layout/appbar/bottommenu.vue'
import SideMenu from '@/components/layout/appbar/sidemenu.vue'
import { useRoute } from 'vue-router';

export default {    
  components: {   
    BottomMenu,
    SideMenu,
  },
  setup(){
    const currentRoutes = useRoute()
    const currentPath = computed(() => currentRoutes.path);
    //const routes = ref([])  
    //Bottom전용
    const bottomItems = ref([
      {
        ico: 'ico_building',
        title: '엠파크안내',
        to: '/mpark',
        state: true
      },
      {
        ico: 'ico_location',
        title: '매장안내',
        to: '/store',
        state: true
      },
      {
        ico: 'ico_car',
        title: '구입차량검색',
        to: '/searchcar',
        ustatesed: true
      },
      {
        ico: 'ico_person',
        title: '종사원조회',
        to: '/employee',
        state: true
      },
      {
        ico: 'ico_newspaper',
        title: '한국일보',
        to: '/news',
        state: true
      },
    ])

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
      bottomItems,
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