<template>
  <div class="relative h-[67vh]">
    <div class="position_info">
      <div class="flex items-end mb-[40px]">
        <h1 class="mr-[36px] mainTit">{{ floorTitle }}</h1>
        <span class="position">자동차 매매 전시장1</span>
      </div>

      <ul class="flex list_item">
        <li>
          <span class="color c1"></span>
          <span class="name">매매상사</span>
        </li>
        <li>
          <span class="color c2"></span>
          <span class="name">지원시설</span>
        </li>
        <li>
          <span class="color c3"></span>
          <span class="name">음식점</span>
        </li>
        <li>
          <span class="color c4"></span>
          <span class="name">정비/세차/광택</span>
        </li>
        <li>
          <span class="color c5"></span>
          <span class="name">기타</span>
        </li>
      </ul>
    </div>

    <!-- 핀치줌 영역 -->
    <div
      ref="container"
      class="relative w-full h-[400px] overflow-hidden bg-gray-100"
    >
      <div
        ref="zoomableElement"
        :style="zoomableStyle"
        class="absolute top-0 left-0 w-full h-full"
      >
        <img
          :src="imageSrc"
          alt="Zoomable"
          class="w-full h-auto"
        />
      </div>
    </div>
    <!-- //핀치줌 영역 -->

    <div class="facility">
      <div class="inner">
        <div v-for="(item, index) in facilities" :key="index" class="mx-6 hover:cursor-pointer btn_item">
          <div class="mb-[8px] icon">
            <img :src="item.icon" :alt="item.name" class="w-fit" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';
import { useMparkStore } from '@/store/mpark'
import { useGesture } from '@vueuse/gesture';

export default {
  name: 'PageMpark',
  setup() {
    const { titleEN } = useTitleEN();
    const mparkStore = useMparkStore();
    const floorTitle = computed(() => mparkStore.floorTitle);
    const imageSrc = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6nHAV7qhVnIUZ440C2-q0l1DsnmDP-TPAg&s');
    
    const container = ref(null);
    const zoomableElement = ref(null);
    const zoomableStyle = ref({
      transform: 'scale(1) translate(0px, 0px)',
      transformOrigin: 'center center',
    });

    let currentScale = 1;
    let panPosition = { x: 0, y: 0 };

    useGesture(container, {
      onPinch: ({ offset: [scale], memo }) => {
        if (!memo) memo = currentScale;

        const newScale = Math.min(Math.max(memo * scale, 1), 4); // 최소 1배, 최대 4배
        currentScale = newScale;

        zoomableStyle.value.transform = `scale(${currentScale}) translate(${panPosition.x}px, ${panPosition.y}px)`;
        return memo;
      },
      onDrag: ({ movement: [mx, my], memo }) => {
        if (!memo) memo = { ...panPosition };

        panPosition = {
          x: memo.x + mx,
          y: memo.y + my,
        };

        zoomableStyle.value.transform = `scale(${currentScale}) translate(${panPosition.x}px, ${panPosition.y}px)`;
        return memo;
      },
    });

    // 시설 데이터
    const facilities = ref([
      { name: '엘레베이터', icon: '@/assets/img/facility/icon_1.svg' },
      { name: '화장실', icon: '@/assets/img/facility/icon_2.svg' },
      { name: '장애인화장실', icon: '@/assets/img/facility/icon_3.svg' },
      { name: '은행/ATM', icon: '@/assets/img/facility/icon_4.svg' },
      { name: '업무지원센터', icon: '@/assets/img/facility/icon_5.svg' },
      { name: '비상구', icon: '@/assets/img/facility/icon_6.svg' },
      { name: '고객주차장', icon: '@/assets/img/facility/icon_7.svg' },
      { name: '무인정산기', icon: '@/assets/img/facility/icon_8.svg' },
    ]);

    return {
      titleEN,
      floorTitle,
      imageSrc,
      zoomableElement,
      zoomableStyle,
      facilities
    };
  }
};
</script>

<style lang="scss" scoped>
.position_info {
  h1 {
    font-size: 10vh;
    line-height: 0.8;
  }
  .position {
    font-size: 2.3vh;
    font-weight: 500;
  }
  .list_item {
    li {
      margin-right: 26px;
      .color {
        display: inline-block;
        width: 0.5vw;
        margin-right: 3px;
        aspect-ratio: 1/1;
        content: '';
        &.c1 {
          background-color: #aed6b3;
        }
        &.c2 {
          background-color: #c2e9ed;
        }
        &.c3 {
          background-color: #f1cdde;
        }
        &.c4 {
          background-color: #83c0bd;
        }
        &.c5 {
          background-color: #7492ac;
        }
      }
    }
  }
}

.facility {
  position: fixed;
  left: 45%;
  bottom: 15vh;
  transform: translateX(-50%);
  .inner {
    display: flex;
    flex-wrap: wrap;
  }
  .btn_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.7vw;
      aspect-ratio: 1/1;
      background-color: rgb(38, 38, 38, 0.8);
      border-radius: 100%;
      img {
        max-width: 1.4vw;
        height: auto;
      }
    }
    .name {
      font-size: 1.3vh;
      color: #555;
    }
  }
}

.touch-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
