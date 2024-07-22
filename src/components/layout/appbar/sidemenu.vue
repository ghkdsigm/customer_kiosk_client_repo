<template>
    <div class="min-h-0 flex-1 flex overflow-hidden sideArea">
        <div class="secondTab flex-shrink-0 overflow-y-auto w-32" v-if="checkSubMenu && selectedMenu !== null">
            <ul>
                <li v-for="(item, idx) in selectedMenu.subMenu" :key="idx">
                    <div class="secondTabItems 2xl:w-[6vw] 2xl:h-[6vw] w-[3.8vw] h-[3.8vw] rounded-full flex justify-center items-center" :class="{ 'bg-[#0C7E60] text-white': selectedSecondIndex === idx }" @click="selectSecondMenu(idx)">
                        {{ item.title }}
                    </div>
                </li>
            </ul>
        </div>
        <div aria-label="Sidebar" class="firstTab lg:block flex-shrink-0 overflow-y-auto w-44">
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
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useMparkStore } from '@/store/mpark'

export default defineComponent({
    name: 'CommonLayoutAppbarSidemenu',
    props: {
        sideItems: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const router = useRouter();
        const images = import.meta.glob('@/assets/img/side/*.png', { eager: true });
        const checkSubMenu = computed(() => props.sideItems.find(v=>v.subMenu.length !== 0))
        const selectedMenu = ref(null)
        const selectedIndex = ref(null);
        const selectedSecondIndex = ref(null);
        const menuSelected = ref(false)
        const newTitle = ref('')
        const mparkStore = useMparkStore()


        const selectMenu = (idx) => {
            if (idx !== undefined && idx !== null) {
                selectedIndex.value = idx;
                selectedMenu.value = props.sideItems[idx];
                selectedSecondIndex.value = 0
                newTitle.value = selectedMenu.value.subMenu[0].title
                updateFloorTitle(newTitle.value)
            }
            
            console.log('idx', selectedMenu.value);
        }

        const selectSecondMenu = (idx) => {
            if (idx !== undefined && idx !== null) {
                selectedSecondIndex.value = idx;
                newTitle.value = selectedMenu.value.subMenu[selectedSecondIndex.value].title
                updateFloorTitle(newTitle.value)
            }
        }

        watch(selectedMenu, (newVal) => {
            if (newVal !== null) {
                menuSelected.value = true;                
                emit('menu-selected', menuSelected.value);
            }
        });

        
        const getImageSrc = (img) => {
            const fileName = `/src/assets/img/side/${img}.png`;
            return images[fileName]?.default || images[fileName];
        }

        const moveToIntro = () => {
            router.push({ name: 'intro' });
        }

        const updateFloorTitle = (val) => {
            mparkStore.setFloorTitle(val)
        }


        
        return {
            router,
            getImageSrc,
            checkSubMenu,
            selectedMenu,
            selectedIndex,
            selectedSecondIndex,
            selectSecondMenu,
            selectMenu,
            moveToIntro,
            updateFloorTitle,
            newTitle
        }
    }
})
</script>

<style scoped>
.sideArea {
    top: 0;
    position: absolute;
    right: 0;
    height: calc(100% - 8rem);
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
    grid-template-rows: repeat(3, 1fr); /* 3개의 행을 균등하게 분배 */
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
