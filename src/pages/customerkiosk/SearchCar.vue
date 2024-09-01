<template>
	<div class="flex flex-col h-full">
		<h1 class="tit">{{ titleEN }}</h1>

		<div class="inner">
			<p class="phrase">
				구입차량을 <strong>검색</strong>하여 <br />
				<strong>차량정보 위치</strong>까지 확인하실 수 있습니다.
			</p>

			<div class="channel">
				<div class="item left" @click="router.push('/customerkiosk/searchcarmanufacturer')">
					<div class="rep">
						<img src="/src/assets/img/carSearch/rep01.png" alt="제조사이미지" />
					</div>
					<p class="tit">제조사별 검색</p>
					<p class="desc">제조사를 선택하여 차량을 <br />검색 하실 수 있습니다.</p>
					<div class="icon">
						<img src="/src/assets/img/carSearch/arrow_circle_right.svg" alt="바로가기" />
					</div>
				</div>

				<div class="item right" @click="router.push('/customerkiosk/searchcarnumber')">
					<div class="rep">
						<img src="/src/assets/img/carSearch/rep02.png" alt="차량번호이미지" />
					</div>
					<p class="tit">차량번호 검색</p>
					<p class="desc">차량번호를 선택하여 차량을 <br />검색 하실 수 있습니다.</p>
					<div class="icon">
						<img src="/src/assets/img/carSearch/arrow_circle_right.svg" alt="바로가기" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'CustomerkioskSearchCar',
	setup() {
		const { titleEN } = useTitleEN()
		const router = useRouter()
		return {
			titleEN,
			router,
		}
	},
})
</script>

<style lang="scss" scoped>
.inner {
	width: 100%;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);

	.phrase {
		margin-bottom: 6vh;
		font-size: 3vh;
		text-align: center;
		line-height: 1.2;
	}

	.channel {
		display: flex;
		width: 43%;
		margin: 0 auto;
		justify-content: space-between;
		.item {
			width: 18vw;
			position: relative;
			cursor: pointer;
			color: #fff;
			text-align: center;
			border-radius: 8px;
			.rep {
				width: 22vw;
				position: absolute;
				top: 4vh;
				left: 50%;
				transform: translateX(-50%);
				img {
					width: 100%;
				}
			}
			.tit {
				margin-top: 16vh;
				margin-bottom: 3vh;
				font-size: 4vh;
				line-height: 1;
			}
			.desc {
				margin-bottom: 3vh;
				font-size: 2vh;
				font-weight: 100;
			}
			.icon {
				display: flex;
				justify-content: center;
				margin-bottom: 7vh;
				img {
					max-width: 5vw;
				}
			}
			&.left {
				background-color: #00b0b9;
			}
			&.right {
				background-color: #1d3c6a;
			}
		}
	}
}
</style>
