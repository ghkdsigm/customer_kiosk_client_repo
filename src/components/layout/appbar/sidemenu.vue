<template>
    <div>
        <div class="min-h-0 flex-1 flex overflow-hidden sideArea" v-if="currentPath !== '/customerkiosk/searchcar' && currentPath !== '/customerkiosk/searchcarnumber'">
            <!-- 2Depth -->
            <div class="secondTab flex-shrink-0 overflow-y-auto w-[5vw]" v-if="checkSubMenu && selectedMenu !== null">
                <ul>
                    <li v-for="(item, idx) in selectedMenu.subMenu" :key="idx">
                        <div class="secondTabItems 2xl:w-[6vw] 2xl:h-[6vw] w-[3.8vw] h-[3.8vw] rounded-full flex justify-center items-center" :class="{ 'bg-[#0C7E60] text-white': selectedSecondIndex === idx }" @click="selectSecondMenu(idx)">
                            {{ item.title }}
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 1Depth -->
            <div aria-label="Sidebar" class="firstTab lg:block flex-shrink-0 overflow-y-auto w-[9vw]">
                <p class="w-full h-[120px] flex bg-white">
                    <img src="@/assets/img/side_logo.svg" alt="mpark" class="w-fit m-auto hover:cursor-pointer" @click="moveToIntro">
                </p>
                <div class="sideMenutItem relative w-full grid grid-rows-3 h-full bg-[#F8F8F8]">
                    <div class="itemWrap flex justify-center items-center text-gray-400 hover:text-red-700 flex-col hover:bg-[#169171] hover:text-white text-gray-900 h-full hover:cursor-pointer" v-for="(item, idx) in sideItems" :class="{ 'bg-[#0C7E60] text-white': selectedIndex === idx }" :key="idx" @click="selectMenu(idx)">
                        <div>
                            <p class="relative text-xs font-medium top-[4vh]">{{ item.subtit }}</p>
                            <p class="relative text-2xl font-medium top-[4vh]">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-h-0 flex-1 flex overflow-hidden sideArea" v-else>
            <!-- 구입차량조회메뉴 -->
            <!-- 1Depth -->
            <div aria-label="SidebarCarSearch" class="firstTab lg:block flex-shrink-0 overflow-y-auto w-[9vw]">
                <p class="w-full h-[120px] flex bg-white">
                    <img src="@/assets/img/side_logo.svg" alt="mpark" class="w-fit m-auto hover:cursor-pointer" @click="moveToIntro">
                </p>
                <div class="sideMenutItem02 relative w-full grid grid-rows-2 h-full bg-[#F8F8F8]">
                    <div class="itemWrap flex justify-center items-center text-gray-400 hover:text-red-700 flex-col hover:bg-[#169171] hover:text-white text-gray-900 h-full hover:cursor-pointer" v-for="(item, idx) in searchCarMenu" :class="{ 'bg-[#0C7E60] text-white': selectedCarIndex === idx }" :key="idx" @click="selectMenuCarSearch(idx)">
                        <div class="text-center">
                            <p class="text-xs font-medium">{{ item.subtit }}</p>
                            <p class="font-medium text-2xl">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useMparkStore } from '@/store/mpark'
import { useUtilities } from '@/utils/useUtilities';

export default defineComponent({
    name: 'CommonLayoutAppbarSidemenu',
    props: {
        sideItems: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const currentRoutes = useRoute()
        const currentPath = computed(() => currentRoutes.path);
        const router = useRouter();
        const checkSubMenu = computed(() => props.sideItems.find(v=>v.subMenu.length !== 0))
        const selectedMenu = ref(null)
        const selectedIndex = ref(null);
        const selectedCarIndex = ref(null);
        const selectedSecondIndex = ref(null);
        const menuSelected = ref(false)
        const newTitle = ref('')
        const mparkStore = useMparkStore()

        const { formatStringWithNewlines } = useUtilities();

        const searchCarMenu = ref([
            {
                title:'제조사별 검색',
                subtit:'MANUFACTURER'
            },
            {
                title:'차량번호 검색',
                subtit:'NUMBER'
            },
        ]);

        //장소선택
        const selectMenu = (idx) => {
            if (idx !== undefined && idx !== null) {
                selectedIndex.value = idx;
                selectedMenu.value = props.sideItems[idx];
                selectedSecondIndex.value = 0
                newTitle.value = selectedMenu.value.subMenu[0].title
                //MPARK 층별 타이틀 상태관리
                updateFloorTitle(newTitle.value)
            }
            
            console.log('idx', selectedMenu.value);
        }

        //차조회방법선택
        const selectMenuCarSearch = (idx) => {
            if (idx !== undefined && idx !== null) {
                selectedCarIndex.value = idx;
                if(idx === 0){
                    router.push({ name: 'searchcar' });
                } else {
                    router.push({ name: 'searchcarnumber' });
                }
            }
        }

        //층별선택
        const selectSecondMenu = idx => {
            if (idx !== undefined && idx !== null) {
                selectedSecondIndex.value = idx;
                selectedMenu.value ? newTitle.value = selectedMenu.value.subMenu[selectedSecondIndex.value].title : null
                //MPARK 층별 타이틀 상태관리
                updateFloorTitle(newTitle.value)
            }
        }

        watch(selectedMenu, newVal => {
            if (newVal !== null) {
                menuSelected.value = true;                
                emit('menu-selected', menuSelected.value);
            }
        });        
       

        const moveToIntro = () => {
            router.push({ name: 'intro' });
        }

        const updateFloorTitle = (val) => {
            mparkStore.setFloorTitle(val)
        }


        
        return {
            currentRoutes,
            currentPath,
            router,
            checkSubMenu,
            selectedMenu,
            selectedIndex,
            selectedCarIndex,
            selectedSecondIndex,
            selectSecondMenu,
            selectMenu,
            moveToIntro,
            updateFloorTitle,
            newTitle,
            searchCarMenu,
            selectMenuCarSearch,
            formatStringWithNewlines
        }
    }
})
</script>

<style scoped>
.sideArea {
    top: 0;
    position: absolute;
    right: 0;
    height: calc(100% - 12vh);
    box-shadow: -4px 0px 15px 0px #00000026;    
}
.secondTab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.secondTab ul li .secondTabItems {
    text-align: center;
    /* width: 3.8vw;
    height: 3.8vw; */
}
.secondTab ul li .secondTabItems.active, .secondTab ul li .secondTabItems:hover {
    background-color: #0C7E60;
    color:#fff;
    cursor:pointer;
}
.sideMenutItem {
    height: calc(100% - 120px);
    display: grid;
    grid-template-rows: repeat(3, 1fr);
}
.sideMenutItem02 {
    height: calc(100% - 120px);
    display: grid;
    grid-template-rows: repeat(2, 1fr);
}
.sideMenutItem .itemWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position:relative;
}
.sideMenutItem .itemWrap:nth-of-type(1)::after {
    content: '';
    width: 100%;
    height: 50%;
    background-image: url('/src/assets/img/side/hub.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    bottom: 0;
}
.sideMenutItem .itemWrap:nth-of-type(2)::after {
    content: '';
    width: 100%;
    height: 50%;
    background-image: url('@/assets/img/side/tower.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    bottom: 0;
}
.sideMenutItem .itemWrap:nth-of-type(3)::after {
    content: '';
    width: 100%;
    height: 50%;
    background-image: url('@/assets/img/side/land.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    bottom: 0;
}
.sideMenutItem .itemWrap > div {
    width:100%;
    height:100%;    
}
@media all and (max-width: 1920px) {
    .sideMenutItem .itemWrap:nth-of-type(1)::after {
        background-position: top;
    }
    .sideMenutItem .itemWrap:nth-of-type(2)::after {
        background-position: top;
    }
    .sideMenutItem .itemWrap:nth-of-type(3)::after {
        background-position: top;
    }
}
</style>
