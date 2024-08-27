<template>
  <div class="position_info z-10 relative">
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
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-0 m-12 w-[auto] h-[auto]" ref="container">
    <PinchScrollZoom
      ref="zoomer"
      :width="containerWidth"
      :height="containerHeight"
      :scale="scale"
      @scaling="scalingHandler"
    >
      <img src="@/assets/img/introduce/hub_1f.png" :style="{width: containerWidth,height: containerHeight,left: checkMapFold ? '20.85vw' : '22vw'}" style="max-height: 40vh; top: 5vw; position: relative;"/>
      <!-- <div
        class="absolute bg-red-500 text-white"
        style="top: 82.5%; left: 40.25vw; width: 1.3vw; height: 14px; font-size: 0.3vw; display: flex; align-items: center; justify-content: center;"
        :style="{left: checkMapFold ? '39.1vw' : '40.25vw'}"
      >
        우성상사
      </div> -->
      <div 
      v-for="(item, idx) in stores" 
        :key="idx" 
        class="absolute font-normal leading-none text-center storeItem" 
        :class="{ 'active': selectedStore && selectedStore.id === item.id }"
        style="font-size: 0.2vw; display: flex; align-items: center; justify-content: center;" 
        :style="{ 
          top: `${item.top - 2}vw`, 
          left: checkMapFold ? `${item.left - 1.15}vw` : `${item.left}vw`, 
          width: `${item.width}vw`, 
          height: `${item.height}vh`
        }"
        @click="selectStore(item)"
      >
      {{ item.title }}
    </div>
    </PinchScrollZoom>
    <!-- <PinchScrollZoom
      ref="zoomer"
      :width="300"
      :height="400"
      :scale="scale"
      @scaling="scalingHandler"
      style="border: 1px solid black;overflow: hidden;"
    >
      <img src="https://picsum.photos/600/1000" width="300" height="400" />
    </PinchScrollZoom> -->
  </div>
  <div class="facility z-10">
			<div class="inner">
				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_1.svg" alt="엘레베이터" class="w-fit" />
					</div>
					<p class="name">엘레베이터</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_2.svg" alt="화장실" class="w-fit" />
					</div>
					<p class="name">화장실</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_3.svg" alt="장애인화장실" class="w-fit" />
					</div>
					<p class="name">장애인화장실</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_4.svg" alt="은행/ATM" class="w-fit" />
					</div>
					<p class="name">은행/ATM</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_5.svg" alt="업무지원센터" class="w-fit" />
					</div>
					<p class="name">업무지원센터</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_6.svg" alt="비상구" class="w-fit" />
					</div>
					<p class="name">비상구</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_7.svg" alt="고객주차장" class="w-fit" />
					</div>
					<p class="name">고객주차장</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_8.svg" alt="무인정산기" class="w-fit" />
					</div>
					<p class="name">무인정산기</p>
				</div>
			</div>
		</div>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useMparkStore } from '@/store/mpark'
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom';

export default defineComponent({
components:{
  PinchScrollZoom
},
setup() {
    const { titleEN } = useTitleEN()
		const mparkStore = useMparkStore()
		const floorTitle = computed(() => mparkStore.floorTitle)

    const zoomer = ref(null);
    const container = ref(null);
    const containerWidth = ref(1700);
    const containerHeight = ref(500);
    const checkMapFold = ref(false)
    const selectedStore = ref(null);  // 클릭된 매장을 저장

    const scale = ref(2);

    const scalingHandler = (e) => {
      console.log(e);
    };

    const updateContainerDimensions = () => {
      if (container.value) {
        console.log('업데이트 값', container.value.offsetWidth)
        containerWidth.value = container.value.offsetWidth;
        containerHeight.value = container.value.offsetHeight;
      }
    };

    watch(
      () => [container.value?.offsetWidth, container.value?.offsetHeight],
      updateContainerDimensions      
    );

    watch(
      () => floorTitle.value, async (newval) => {
        if(newval) {
          console.log('newval', newval)
          checkMapFold.value = true
          await nextTick();
          updateContainerDimensions();
        }
      }
    )

    onMounted(() => {
      updateContainerDimensions();
      window.addEventListener('resize', updateContainerDimensions);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateContainerDimensions);
    });

    const stores = ref([
      {
        id: 'f1_a1',
        title: '엠파크 매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.5,
        height: 0.5,
        left: 36,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a2',
        title: '엠파크테스트카 매매상사2',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.5,
        height: 0.5,
        left: 36.6,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a3',
        title: '엠파크테스트카 매매상사3',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 0.8,
        left: 35.9,
        top: 18.8,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a4',
        title: '엠파크테스트카 매매상사4',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.6,
        height: 1.7,
        left: 37.2,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a5',
        title: '엠파크테스트카 매매상사5',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 1.7,
        left: 37.94,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a6',
        title: '엠파크테스트카 매매상사6',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 1.7,
        left: 38.9,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a7',
        title: '우성상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.3,
        height: 1.3,
        left: 40.2,
        top: 18.5,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a8',
        title: '좋은차와사람들 자동차매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.3,
        height: 1.3,
        left: 41.6,
        top: 18.5,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a9',
        title: '명언에스앤씨',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 1.3,
        left: 43.45,
        top: 18.5,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a10',
        title: '유비쿼터스 매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.3,
        height: 1.3,
        left: 44.5,
        top: 18.5,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a11',
        title: '유비쿼터스 매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.3,
        height: 1.3,
        left: 45.9,
        top: 18.5,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a12',
        title: '유비쿼터스 매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.9,
        height: 3.3,
        left: 35.8,
        top: 19.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a13',
        title: '유림 매매상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 2.1,
        height: 1.3,
        left: 35.7,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a14',
        title: '드림 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 1.3,
        left: 37.8,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a15',
        title: '드림 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 1.3,
        left: 38.63,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a16',
        title: '드림 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.9,
        height: 1.3,
        left: 39.65,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a17',
        title: '빌드 매매 상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.9,
        height: 1.3,
        left: 41.6,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a18',
        title: '만랩 상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 1.3,
        left: 43.5,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a19',
        title: '바나 매매 상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.96,
        height: 1.3,
        left: 44.5,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a20',
        title: '보노보노 매매 상사',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.96,
        height: 1.3,
        left: 45.5,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a21',
        title: '아이씨엔씨 센터',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.96,
        height: 1.3,
        left: 46.5,
        top: 21.2,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a22',
        title: '큐브 디엔엠 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 2,
        height: 4,
        left: 51,
        top: 18.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a23',
        title: '큐브 디엔엠 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.75,
        height: 1,
        left: 53.1,
        top: 19.7,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a24',
        title: '다이노 모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.5,
        height: 1.2,
        left: 53.1,
        top: 20.6,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a25',
        title: '동화모터스',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 1.2,
        left: 52.7,
        top: 21.1,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a26',
        title: '꿈나라1',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 0.4,
        left: 51.4,
        top: 20.7,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a27',
        title: '꿈나라2',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 0.4,
        left: 51.6,
        top: 21,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a28',
        title: '꿈나라3',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 0.8,
        height: 0.4,
        left: 51.8,
        top: 21.4,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a29',
        title: '꿈나라4',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1.2,
        height: 1.9,
        left: 50.3,
        top: 20.8,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a30',
        title: '꿈나라5',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 2,
        height: 2.3,
        left: 48.3,
        top: 20.6,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a31',
        title: '꿈나라6',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 3,
        height: 2.5,
        left: 53,
        top: 23.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a32',
        title: '꿈나라7',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 0.4,
        left: 55.2,
        top: 24.9,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a33',
        title: '꿈나라7',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 0.4,
        left: 55.4,
        top: 25.3,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a34',
        title: '꿈나라7',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 0.4,
        left: 55.8,
        top: 25.6,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      },
      {
        id: 'f1_a35',
        title: '꿈나라8',
        area: 'Hub',
        location: 'a1',
        tel: '010-2412-3123',
        floor: '1',
        width: 1,
        height: 0.4,
        left: 56,
        top: 25.9,
        publicKey: null//1:엘레베이터, 2:화장실, 3:장애인화장실, 4:은행/atm, 5:업무지원센터, 6:비상구, 7:고객주차장, 8:무인정산기 (공용공간 아니면 Null)   
      }
    ]
  )

    const selectStore = (val) => {
      if(val){
        console.log('상사정보', val)
        selectedStore.value = val;

      }
    }

    return {
      titleEN,
			floorTitle,
      zoomer,
      container,
      containerWidth,
      containerHeight,
      scale,
      scalingHandler,
      checkMapFold,
      stores,
      selectedStore,
      selectStore
    };
	}
})
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

.storeItem {
  position: absolute;
  cursor: pointer;
}

.storeItem.active::after {
  content: "";
  position: absolute;
  top: -2.5vw;
  left: 0;
  width: 100%;
  height: 70px;
  pointer-events: none;
  background-image: url('@/assets/img/map_maker.svg');
  background-size: 0.7vw 0.7vw;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
