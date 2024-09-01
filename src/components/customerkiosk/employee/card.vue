<template>
	<div class="card_store">
		<img src="https://img.etoday.co.kr/pto_db/2020/09/20200915225107_1511263_506_582.jpg" class="max-h-[26vh]" alt="" />
		<div class="cont">
			<p class="name flex items-center text-[1.25vw]">설인아</p>
			<div class="py-[1vh] text-center">
				<div class="my-[1vh]">
					<p class="text-[#9E9E9E] text-[0.85vw]">사원증번호</p>
					<p class="text-[#262626] text-[0.95vw]">IM20-01597</p>
				</div>
				<div class="my-[1vh]">
					<p class="text-[#9E9E9E] text-[0.85vw]">상사약명</p>
					<p class="text-[#262626] text-[0.95vw]">파크모터스</p>
				</div>
			</div>
			<div class="btn_bar">
				<button class="btn_positon text-[0.95vw]">VIew Profile</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerKioskEmployeeCard',
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
			font-weight: 500;
			background: #f8f8f8;
			text-align: center;
			justify-content: center;
		}
		.btn_bar {
			display: flex;
			justify-content: space-between;
			padding: 0 1.4vw 2vh 1.4vw;
			button {
				width: 100%;
				height: 3vh;
				font-size: 1vh;
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
