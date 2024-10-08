<template>
	<div class="wrapper">
		<div class="profile bg-white p-[1.6vw]">
			<span class="num mb-[3.5vh]">{{ getOrderNum(empInfo.ranking) }}</span>
			<p class="name mb-[1vh]">{{ empInfo.checkEmpName }}</p>
			<p class="assigned mb-[3.5vh]">엔지니어</p>
			<div class="photo my-0 mx-auto">
				<img :src="getImageUrl(empInfo.imageUrl)" />
			</div>
		</div>

		<div class="car_info bg-[#F8F8F8] pt-[6vh] px-[2vw] min-h-[24vh]">
			<div class="car_num mb-[1vh]">{{ empInfo.carNo }}</div>
			<div class="car_name">{{ empInfo.carName }}</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	empInfo: {
		type: Object,
		default: () => {},
	},
})
const getOrderNum = ranking => {
	return ranking < 10 ? `0${ranking}` : ranking
}
const getImageUrl = url => {
	return url || new URL('../../assets/img/no_img.jpg', import.meta.url).href
}
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	border: 1px solid #434a66;
	border-radius: 8px;
	overflow: hidden;
}

.num {
	display: inline-block;
	width: 5.5vw;
	padding: 1.3vh;
	font-size: 2vh;
	font-weight: 700;
	color: #9e9e9e;
	border: 1px solid #9e9e9e;
	border-radius: 99px;
	line-height: 1;
}

.name {
	font-size: 3vh;
	font-weight: 700;
	line-height: 1;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.assigned {
	font-size: 2vh;
	line-height: 1;
}

.photo {
	width: 8vw;
	border-radius: 100%;
	aspect-ratio: 1/1;
	overflow: hidden;
}

.car_num {
	font-size: 3vh;
	font-weight: 700;
	line-height: 1;
}

.car_name {
	font-size: 3vh;
	line-height: 1;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
