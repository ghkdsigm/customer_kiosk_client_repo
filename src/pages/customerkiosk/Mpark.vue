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
      <img src="@/assets/img/introduce/hub_1f.png" :style="`width:${containerWidth}; height:${containerHeight}`"style="max-height: 40vh; top:7vw; left: 23vw; position: relative;" />
      <div
        class="absolute bg-red-500 text-white"
        style="top: 82.5%; left: 48.3%; width: 1.3vw; height: 14px; font-size: 0.3vw; display: flex; align-items: center; justify-content: center;"
      >
        우성상사
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
    const containerWidth = ref(1500);
    const containerHeight = ref(500);

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

    return {
      titleEN,
			floorTitle,
      zoomer,
      container,
      containerWidth,
      containerHeight,
      scale,
      scalingHandler,
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
</style>
