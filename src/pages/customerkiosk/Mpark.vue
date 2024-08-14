<template>
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
  <div
    class="overflow-hidden relative w-full h-[54vh] border">
    <PinchScrollZoom
      ref="zoomer"
      within
      :width="1500"
      :height="500"
      :content-width="1500"
      :content-height="500"
      :scale="scale"
      @scaling="scalingHandler"
      style="overflow: hidden;"
    >
      <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0Ignd%2FbtsgCkpouTB%2FKK5sC7rKq4RYckg3wXJy2K%2Fimg.png" width="1500" height="500" />
      <div
        class="absolute bg-red-500 text-white"
        style="top: 20%; left: 30%; width: 100px; height: 100px;"
      >
        Some overlay
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
  <div class="facility">
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
import { defineComponent, computed, ref, watch, onMounted, onUnmounted } from 'vue'
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
    // Create a reference for the PinchScrollZoom component
    const zoomer = ref(null);
const container = ref(null);
const containerWidth = ref(300);

    // Define the scale variable
    const scale = ref(2);

    // Define the scaling handler method
    const scalingHandler = (e) => {
      console.log(e);
    };



// Function to update container width
const updateContainerWidth = () => {
  if (container.value) {
    containerWidth.value = container.value.offsetWidth;
  }
};


    // Watch for changes in container width
watch(() => container.value?.offsetWidth, updateContainerWidth);

// Initial setup
onMounted(() => {
  containerWidth.value = 300
  updateContainerWidth(); // Set initial width
  window.addEventListener('resize', updateContainerWidth);
});

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('resize', updateContainerWidth);
});

    // Define the reset function
    const reset = () => {
      if (zoomer.value) {
        zoomer.value.setData({
          scale: 1,
          originX: 0,
          originY: 0,
          translateX: 0,
          translateY: 0        
        });
      }
    };
		return {
			titleEN,
			floorTitle,
      zoomer,
      scale,
      scalingHandler,
      reset,
      container,
      updateContainerWidth
		}
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
