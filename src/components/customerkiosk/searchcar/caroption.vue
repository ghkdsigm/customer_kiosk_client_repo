<template>
	<div class="relative h-full w-full flex overflow-hidden justify-between">
		<!-- 리스트 -->
		<div ref="listContainer" class="lists h-full overflow-y-hidden">
			<div v-for="(items, category) in groupedOptions" :key="category" class="">
				<h2 class="text-xl font-semibold text-left bg-[#F1F1F1] py-[1.31vh] px-[1vw] text-[0.85vw] text-[#555555]">
					{{ category }}<span class="pl-[0.2vw]"><b class="text-[#00B0B9]">4</b>개</span>
				</h2>

				<ul class="list-disc flex justify-between px-[1vw] py-[2.9vh] gap-x-[1vw] gap-y-[1.5vw] grid grid-cols-6">
					<li
						v-for="item in items"
						:key="item.code"
						class="list-none text-[0.85vw] font-normal text-[#B4B4B4] text-left gap-[1vw]"
					>
						{{ item.codeName }}
					</li>
				</ul>
			</div>
		</div>

		<!-- 아래/위 버튼 -->
		<div class="relative w-[1.5vw] right-2 bottom-2 flex flex-col space-y-2 justify-end">
			<button @click="scrollUp" class="py-[3.2vh] px-[0.35vw] bg-white border border-[#777777] hover:bg-gray-100">
				<img src="/src/assets/img/icn/chevron_top.svg" aria-hidden />
			</button>
			<button @click="scrollDown" class="py-[3.2vh] px-[0.35vw] bg-white border border-[#777777] hover:bg-gray-100">
				<img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden />
			</button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'CustomerKioskSearchCarCaroption',
	setup() {
		const listContainer = ref(null)

		const options = ref([
			{
				code: '007001',
				etc: '선호사양',
				codeName: '내비게이션(매립)',
			},
			{
				code: '007002',
				etc: '선호사양',
				codeName: '후방카메라',
			},
			{
				code: '007003',
				etc: '선호사양',
				codeName: '썬루프(일반형)',
			},
			{
				code: '007004',
				etc: '선호사양',
				codeName: '파노라마 썬루프',
			},
			{
				code: '007005',
				etc: '선호사양',
				codeName: '버튼시동/스마트키',
			},
			{
				code: '007006',
				etc: '선호사양',
				codeName: '블랙박스',
			},
			{
				code: '007007',
				etc: '선호사양',
				codeName: '4WD(4륜구동)',
			},
			{
				code: '007008',
				etc: '선호사양',
				codeName: '스톱앤고(ISG)',
			},
			{
				code: '007009',
				etc: '기본사양',
				codeName: '전자동 에어컨',
			},
			{
				code: '007010',
				etc: '기본사양',
				codeName: '알루미늄휠',
			},
			{
				code: '007011',
				etc: '기본사양',
				codeName: 'HID/LED 헤드램프',
			},
			{
				code: '007012',
				etc: '기본사양',
				codeName: '가죽시트',
			},
			{
				code: '007013',
				etc: '기본사양',
				codeName: '전동시트',
			},
			{
				code: '007014',
				etc: '기본사양',
				codeName: '열선시트',
			},
			{
				code: '007015',
				etc: '기본사양',
				codeName: '통풍시트',
			},
			{
				code: '007016',
				etc: '기본사양',
				codeName: 'CD/MP3 플레이어',
			},
			{
				code: '007017',
				etc: '안전사양',
				codeName: '에어백(운전석)',
			},
			{
				code: '007018',
				etc: '안전사양',
				codeName: '에어백(동반석)',
			},
			{
				code: '007019',
				etc: '안전사양',
				codeName: '에어백(사이드)',
			},
			{
				code: '007020',
				etc: '안전사양',
				codeName: '에어백(커튼)',
			},
			{
				code: '007021',
				etc: '안전사양',
				codeName: 'ABS',
			},
			{
				code: '007022',
				etc: '안전사양',
				codeName: 'TCS',
			},
			{
				code: '007023',
				etc: '안전사양',
				codeName: 'ESP/VDC',
			},
			{
				code: '007024',
				etc: '안전사양',
				codeName: 'TPMS(타이어공기압)',
			},
			{
				code: '007025',
				etc: '편의사양',
				codeName: '내비게이션(거치)',
			},
			{
				code: '007026',
				etc: '편의사양',
				codeName: 'ECM 룸미러',
			},
			{
				code: '007027',
				etc: '편의사양',
				codeName: '하이패스',
			},
			{
				code: '007028',
				etc: '편의사양',
				codeName: '후방감지센서',
			},
			{
				code: '007029',
				etc: '편의사양',
				codeName: '전방감지센서',
			},
			{
				code: '007030',
				etc: '편의사양',
				codeName: '크루즈컨트롤',
			},
			{
				code: '007031',
				etc: '편의사양',
				codeName: '전자식 파킹브레이크',
			},
			{
				code: '007032',
				etc: '편의사양',
				codeName: 'SPAS(자동주차)',
			},
			{
				code: '007033',
				etc: '기타',
				codeName: '열선핸들',
			},
			{
				code: '007034',
				etc: '기타',
				codeName: '뒷자석 TV',
			},
			{
				code: '007035',
				etc: '기타',
				codeName: '오토 슬라이딩도어',
			},
			{
				code: '007036',
				etc: '기타',
				codeName: '파워 트렁크',
			},
			{
				code: '007037',
				etc: '기타',
				codeName: '사이드스텝',
			},
			{
				code: '007038',
				etc: '기타',
				codeName: 'HUD(헤드업디스플레이)',
			},
			{
				code: '007039',
				etc: '기타',
				codeName: '차선이탈 경보시스템',
			},
			{
				code: '007040',
				etc: '기타',
				codeName: '후측방 경보시스템(BSD)',
			},
			{
				code: '007041',
				etc: '기타',
				codeName: '어라운드뷰',
			},
			{
				code: '007042',
				etc: '기타',
				codeName: '고속도로주행보조',
			},
			{
				code: '007043',
				etc: '기타',
				codeName: '고스트도어',
			},
		])

		// etc 값을 기준으로 데이터 그룹화
		const groupedOptions = ref(
			options.value.reduce((acc, option) => {
				const key = option.etc
				if (!acc[key]) {
					acc[key] = []
				}
				acc[key].push(option)
				return acc
			}, {}),
		)

		const scrollUp = () => {
			listContainer.value.scrollBy({ top: -200, behavior: 'smooth' })
		}

		const scrollDown = () => {
			listContainer.value.scrollBy({ top: 200, behavior: 'smooth' })
		}

		return {
			listContainer,
			options,
			groupedOptions,
			scrollUp,
			scrollDown,
		}
	},
}
</script>

<style scoped>
.lists {
	width: calc(100% - 50px);
}
</style>
