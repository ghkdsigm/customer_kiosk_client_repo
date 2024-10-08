<template>
	<!-- Intro -->
	<div v-if="!isTower" class="wrapper h-screen">
		<div class="bg absolute top-[0%] left-[50%]" />

		<div class="inner">
			<div class="logo flex flex-col justify-center mb-[6vh]">
				<img src="../../assets/img/logo_white.svg" class="h-[3vh] mb-[2vh]" />
				<p class="text-center">
					전시차량 <br />
					무인 입출고 시스템
				</p>
			</div>

			<div class="gate flex flex-row justify-between">
				<div class="item flex flex-col justify-center" @click="goInoutPage('in')">
					<p class="text-[4vh] font-bold">입고</p>
					<p class="text-[3vh] mb-[2vh]">Incoming</p>
					<img src="../../assets/img/icn/arrow_circle.svg" class="h-[4vh]" />
				</div>
				<div class="item flex flex-col justify-center" @click="goInoutPage('out')">
					<p class="text-[4vh] font-bold">출고</p>
					<p class="text-[3vh] text-[#555] mb-[2vh]">Outcoming</p>
					<img src="../../assets/img/icn/arrow_circle_black.svg" class="h-[4vh]" />
				</div>
			</div>
		</div>

		<div class="bottom_deco flex flex-row">
			<div class="left" />
			<div class="right" />
		</div>
	</div>
</template>

<script setup>
import { useInoutKioskStore } from '@/store/inoutKiosk'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const inoutStore = useInoutKioskStore()
const queryFloorInfo = route.query

// 입고/출고 버튼 클릭
const goInoutPage = inout => {
	Object.assign(floorInfo, { inout: inout })
	inoutStore.actFloorCode(floorInfo)
	router.push({ name: 'inoutkioskkeypad' })
}
if (queryFloorInfo.floor) inoutStore.actFloorCode(queryFloorInfo)
const floorInfo = inoutStore.getFloorInfo

// 타워4층일 경우 바로 입출고 화면으로
console.log('floorInfo', floorInfo)

const isTower = floorInfo.floor === 'T4F' || floorInfo.floor === 'T3F'

if (isTower) router.push({ name: 'inoutkioskkeypad' })
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative !important;
	background-color: #1f2733;
	width: 1082px;
	margin: 0 auto;
	.bg {
		width: 734px;
		height: 409px;
		background: linear-gradient(180deg, #c324c7 0%, #66fbfb 100%);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		opacity: 0.7;
		transform: translateX(-50%);
		filter: blur(300px);
		border-radius: 727px;
	}

	.inner {
		width: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.bottom_deco {
		width: 100%;
		height: 2vh;
		position: absolute;
		bottom: 0;
		left: 0;
		.left {
			width: 30%;
			height: 2vh;
			margin-right: -4%;
			background-color: #00694d;
			opacity: 0.5;
			border-radius: 0px 25px 25px 0px;
		}
		.right {
			width: 80%;
			height: 2vh;
			background-color: #00ad50;
			border-radius: 25px 0px 0px 25px;
		}
	}
}

.logo {
	p {
		font-size: 4.2vh;
		font-weight: 700;
		color: #fff;
		line-height: 1.2;
	}
}

.gate {
	.item {
		width: 48%;
		height: 33vh;
		border-radius: 8px;
		align-items: center;
		cursor: pointer;

		&:nth-child(1) {
			background-color: #00ad50;
			color: #fff;
		}
		&:nth-child(2) {
			background-color: #fff;
			color: #262626;
		}
	}
}
</style>
