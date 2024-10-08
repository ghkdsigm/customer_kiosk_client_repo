<template>
	<div class="card_store">
		<img v-if="item.imageUrl" :src="item.imageUrl" :alt="item?.companyName" />
		<img v-else src="@/assets/img/store/card_default.png" :alt="item?.companyName" />
		<div class="cont">
			<p class="name flex items-center">{{ item?.companyName }}</p>
			<div class="btn_bar">
				<button class="btn_detail" @click="searchStoreDetail(item)">상세보기</button>
				<!-- <button class="btn_positon">위치안내</button> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerKioskStoreCard',
	props: {
		item: {
			type: Object,
			default: null,
		},
	},
	setup(props, { emit }) {
		const searchStoreDetail = e => {
			emit('selectCompany', e)
		}
		return {
			searchStoreDetail,
		}
	},
}
</script>

<style lang="scss" scoped>
.card_store {
	width: 100%;
	height: 100%;
	border: 1px solid #434a66;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	img {
		width: 100%;
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
			font-size: 1.4vh;
			background: #f8f8f8;
			text-align: center;
			justify-content: center;
		}
		.btn_bar {
			display: flex;
			justify-content: space-between;
			padding: 0.85vw;
			button {
				width: 100%;
				height: 3vh;
				font-size: 0.75vw;
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
