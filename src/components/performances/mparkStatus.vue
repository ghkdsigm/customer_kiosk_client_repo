<template>
	<!-- Intro -->
	<div class="wrapper h-screen">
		<div class="inner">
			<div class="logo flex flex-col justify-center mb-[4vh]">
				<img src="../../assets/img/logo_basic.svg" class="h-[3.2vh] mb-[2.3vh]" />
				<p class="text-center">단지별 성능점검장 <span>대기 및 검사현황</span></p>
			</div>

			<div class="flex flex-row justify-between">
				<div v-for="(status, idx) in statusList" :key="idx" class="item">
					<p class="text-center mb-[2vh]">
						엠파크 <strong>{{ status.inspCompanyName }}</strong>
					</p>
					<div class="mb-[2vh]">
						<img :src="getImgUrl(status.inspCompanyName)" class="w-[100%]" />
						<div class="count text-center py-[1.5vh]">
							<p class="mb-[0.8vh]">대기차량</p>
							<p class="num">
								<strong>{{ status.cnt }}</strong> 대
							</p>
						</div>
					</div>
					<div :class="getCircleClass(status.cnt)">
						<div class="flex flex-row justify-center mb-[0.5vh]">
							<span class="circle mx-[0.2vw]"></span>
							<span class="circle mx-[0.2vw]"></span>
							<span class="circle mx-[0.2vw]"></span>
						</div>
						<p>{{ getComment(status.cnt) }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, onMounted, defineEmits } from 'vue'
const emit = defineEmits(['changeSlide'])

const props = defineProps({
	statusList: {
		type: Array,
		default: () => [],
	},
})
const getComment = cnt => {
	if (cnt < 5) return '한가해요'
	else if (cnt < 10) return '적당해요'
	return '붐벼요'
}

const getCircleClass = cnt => {
	if (cnt < 5) return 'state s1 text-center'
	else if (cnt < 10) return 'state s2 text-center'
	return 'state s3 text-center'
}

const engDanjiObj = {
	랜드: 'land',
	타워: 'tower',
	허브: 'hub',
}
const getImgUrl = type => {
	return new URL(`../../assets/img/${engDanjiObj[type]}.png`, import.meta.url).href
}

onMounted(() => {
	setTimeout(() => {
		emit('changeSlide')
	}, 5000)
})
</script>

<style lang="scss" scoped>
.inner {
	width: 50vw;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.logo {
	p {
		font-size: 3.5vh;
		letter-spacing: -0.5px;
		line-height: 1;
		span {
			font-weight: 700;
		}
	}
}

.item {
	width: 32%;
	padding: 3vh 0.8vw;
	font-size: 2.4vh;
	border: 1px solid #434a66;
	border-radius: 8px;
	box-shadow: 10px 15px 40px 0px rgba(0, 0, 0, 0.15);

	.count {
		margin-top: -1px;
		font-size: 1.6vh;
		color: #fff;
		background-color: #434a66;
		line-height: 1;
		.num {
			font-size: 4vh;
			strong {
				color: #1bf9a2;
			}
		}
	}

	.state {
		.circle {
			width: 0.8vw;
			aspect-ratio: 1/1;
			border-radius: 100%;
			background-color: #d4d4d4;
		}
		&.s1 {
			.circle {
				&:nth-child(1) {
					background-color: #0ad786;
				}
			}
		}
		&.s2 {
			.circle {
				&:nth-child(2) {
					background-color: #f0e153;
				}
			}
		}
		&.s3 {
			.circle {
				&:nth-child(3) {
					background-color: #fb4f4f;
				}
			}
		}
	}
}
</style>
