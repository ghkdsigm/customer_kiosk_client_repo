<template>
	<div class="wrapper py-[2.1vh] px-[0.8vw]">
		<span class="num mb-[2.5vh]">{{ getOrderNum(carInfo.ranking) }}</span>
		<div class="car_num py-[3.2vh] mb-[2.5vh]">{{ carInfo.carNo }}</div>
		<div class="car_name mb-[1vh]">
			{{ carInfo.carName }}
		</div>
		<div class="time">{{ carInfo.minuteSecond }}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	carInfo: {
		type: Object,
		default: () => {},
	},
})
const getOrderNum = ranking => {
	return ranking < 10 ? `0${ranking}` : ranking
}
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	border: 1px solid #434a66;
	border-radius: 8px;
	overflow: hidden;
	background-color: #fff;
	min-height: 31.3vh;
}

.num {
	display: inline-block;
	width: 4.5vw;
	padding: 1.3vh;
	font-size: 2vh;
	font-weight: 700;
	color: #9e9e9e;
	border: 1px solid #9e9e9e;
	border-radius: 99px;
	line-height: 1;
}

.car_num {
	border-radius: 8px;
	background-color: #f8f8f8;
	font-size: 3vh;
	font-weight: 700;
	line-height: 1;
}

.car_name {
	font-size: 2.3vh;
	font-weight: 500;
	line-height: 1.2;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.time {
	font-size: 2.3vh;
	font-weight: 500;
	color: #666;
}
</style>
