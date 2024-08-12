<template>
  <div>
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
      class="overflow-hidden touch-none"
      ref="zoomContainer"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6nHAV7qhVnIUZ440C2-q0l1DsnmDP-TPAg&s" alt="" class="w-full h-[54vh]"> -->
      <img
        :src="imageSrc"
        alt="Zoomable"
        :style="imageStyle"
        class="w-full h-[54vh]"
      />
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
	</div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent, computed } from 'vue';
import { useTitleEN } from '@/composables/useTitleEN';
import { useMparkStore } from '@/store/mpark'

export default defineComponent({
name: 'PageMpark',
setup() {
    const { titleEN } = useTitleEN();
    const mparkStore = useMparkStore()
    const floorTitle = computed(() => mparkStore.floorTitle)
    const imageSrc = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6nHAV7qhVnIUZ440C2-q0l1DsnmDP-TPAg&s');
    
    const zoomContainer = ref(null);
    const imageStyle = ref({
      transform: 'scale(1)',
      transformOrigin: 'center center',
    });

    let startDistance = 0;
    let currentScale = 1;

    const calculateDistance = (touches) => {
      const [touch1, touch2] = touches;
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (event) => {
      if (event.touches.length === 2) {
        startDistance = calculateDistance(event.touches);
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 2) {
        event.preventDefault();

        const newDistance = calculateDistance(event.touches);
        const scaleChange = newDistance / startDistance;

        currentScale = Math.min(Math.max(currentScale * scaleChange, 1), 4); // 최소 1배, 최대 4배 확대/축소
        imageStyle.value.transform = `scale(${currentScale})`;

        startDistance = newDistance;
      }
    };

    const onTouchEnd = () => {
      if (currentScale < 1) {
        currentScale = 1;
        imageStyle.value.transform = `scale(1)`;
      }
    };

    return {
      titleEN,
      floorTitle,
      imageSrc,
      zoomContainer,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }
});
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

.touch-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
