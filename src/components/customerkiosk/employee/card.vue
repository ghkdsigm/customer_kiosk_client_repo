<template>
	<div class="card_store" v-if="checkItems === '1'">
		<!-- checkItems: '1'일때 종사원  -->
		<img v-if="item.imageUrl" :src="item.imageUrl" class="max-h-[26vh]" :alt="`${item?.empName} 이미지`" />
		<img v-else src="@/assets/img/emptyThumb.svg" style="width: 7vw; margin: 0 auto" :alt="`${item?.empName} 이미지`" />
		<div class="cont">
			<p class="name flex items-center text-[1.25vw]">{{ item?.empName }}</p>
			<div class="py-[1vh] text-center h-[15.5vh]">
				<div class="my-[1vh]" v-if="item.driveNo">
					<p class="text-[#9E9E9E] text-[0.85vw]">사원증번호</p>
					<p class="text-[#262626] text-[0.95vw]">{{ item.driveNo }}</p>
				</div>
				<div class="my-[1vh]" v-if="item.companyName">
					<p class="text-[#9E9E9E] text-[0.85vw]">상사약명</p>
					<p class="text-[#262626] text-[0.95vw]">{{ item.companyName }}</p>
				</div>
			</div>
			<div class="btn_bar">
				<button class="btn_positon text-[0.75vw]" @click="selectCompany(item)">VIew Profile</button>
			</div>
		</div>
	</div>
	<div class="card_store" v-else>
		<img v-if="item.imageUrl" :src="item.imageUrl" class="max-h-[26vh]" :alt="`${item?.companyName} 이미지`" />
		<img
			v-else
			src="@/assets/img/emptyThumb.svg"
			style="width: 7vw; margin: 0 auto"
			:alt="`${item?.companyName} 이미지`"
		/>
		<div class="cont">
			<p class="name flex items-center text-[1.25vw]">{{ item?.companyName }}</p>
			<div class="py-[1vh] text-center h-[15.5vh]">
				<div class="my-[1vh]" v-if="item.driveNo">
					<p class="text-[#9E9E9E] text-[0.85vw]">사원증번호</p>
					<p class="text-[#262626] text-[0.95vw]">{{ item.driveNo }}</p>
				</div>
				<div class="my-[1vh]" v-if="item.companyName">
					<p class="text-[#9E9E9E] text-[0.85vw]">상사약명</p>
					<p class="text-[#262626] text-[0.95vw]">{{ item.companyName }}</p>
				</div>
			</div>
			<div class="btn_bar">
				<button class="btn_positon text-[0.75vw]" @click="selectCompany(item)">View Profile</button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'CustomerKioskEmployeeCard',
	props: {
		EmployeeCard: {
			type: Number,
			default: 0,
		},
		item: {
			type: Object,
			default: null,
		},
		checkItems: {
			type: String,
			default: '0',
		},
	},
	setup(props, { emit }) {
		const selectCompany = val => {
			emit('selectCompany', val)
		}

		return {
			selectCompany,
		}
	},
})
</script>

<style lang="scss" scoped>
.card_store {
	width: 100%;
	height: 100%;
	border: 1px solid #434a66;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	background: #d9d9d9;
	img {
		width: 100%;
		height: 26vh;
	}
	.cont {
		flex: 1;
		// padding: 0 1vw;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.name {
			flex: 1;
			font-weight: 500;
			background: #f8f8f8;
			text-align: center;
			justify-content: center;
			height: 6vh;
			min-height: 6vh;
		}
		.btn_bar {
			display: flex;
			justify-content: space-between;
			padding: 0 1.4vw 2vh 1.4vw;
			button {
				width: 100%;
				height: 3vh;
				color: #fff;
				border-radius: 4px;
				&.btn_detail {
					background-color: #434a66;
				}
				&.btn_positon {
					background-color: #00b0b9;
				}
			}
		}
	}
}
</style>
