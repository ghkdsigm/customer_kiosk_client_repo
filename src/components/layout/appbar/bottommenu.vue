<template>
	<div class="w-full h-[10vh] fixed bottom-0 left-0 z-50 bg-primary">
		<div
			class="grid h-full w-full mx-auto"
			:class="bottomItems.length ? `grid-cols-${bottomItems.length}` : 'grid-cols-5'"
		>
			<!-- 메뉴버튼 -->
			<button
				type="button"
				class="inline-flex flex-row items-center justify-center px-5 hover:bg-primaryHover group btn_menu"
				v-for="(item, idx) in bottomItems"
				:class="{
					'bg-primaryHover text-white': selectedIndex === idx && currentPath !== '/customerkiosk',
				}"
				:key="idx"
				@click="moveToPage(item.to, idx)"
			>
				<!-- 아이콘 -->
				<img
					class="w-[2.2vw] h-12 icon"
					:class="{
						'animate-bounce': selectedIndex === idx && currentPath !== '/customerkiosk',
					}"
					:src="item.ico ? imageSrc(item.ico) : '@/assets/img/bottom/person.svg'"
					:alt="item.title"
				/>
				<!-- 메뉴명 -->
				<span class="pl-[0.85vw] menuName">{{ item.title }}</span>
			</button>
		</div>
	</div>
</template>

<script>
import { ref, defineComponent, computed, onMounted, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUtilities } from '@/utils/useUtilities'

export default defineComponent({
	name: 'CommonLayoutAppbarBottommenu',
	props: {
		bottomItems: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const router = useRouter()
		const selectedIndex = ref(null)
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)

		const { getImageSrc } = useUtilities()
		const imageSrc = icon => getImageSrc('bottom', icon)

		const moveToPage = (url, index) => {
			console.log('idx', index)
			if (index !== undefined && index !== null) {
				selectedIndex.value = index
			}
			router.push({ path: url })
		}

		onMounted(()=>{
			props.bottomItems.forEach((v, i) => {
				if (currentPath.value.includes(v.to)) {
					selectedIndex.value = i
				}
			})
			
		})

		return {
			moveToPage,
			selectedIndex,
			currentRoutes,
			currentPath,
			imageSrc,
		}
	},
})
</script>

<style lang="scss" scoped>
.btn_menu {
	border-right: 1px solid #434a66;
	&:last-child {
		border: none !important;
	}
	.menuName {
		font-size: 2vh;
		font-weight: 500;
		color: #fff;
	}
}
</style>
