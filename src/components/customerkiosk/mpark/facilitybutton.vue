<template>
	<div class="mx-6 btn_item" :class="{ active }" @click="$emit('click')">
		<div class="mb-[8px] icon">
			<img :src="imageSrc('facility', icon)" :alt="label" class="w-fit" />
		</div>
		<p class="name text-[0.85vw]">{{ label }}</p>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useUtilities } from '@/utils/useUtilities'

export default defineComponent({
	name: 'FacilityButton',
	props: {
		icon: String,
		label: String,
		active: Boolean,
	},
	setup(props, { emit }) {
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const handleClick = () => {
			emit('click')
		}

		return {
			imageSrc,
			handleClick,
		}
	},
})
</script>

<style lang="scss" scoped>
.btn_item {
	display: flex;
	flex-direction: column;
	align-items: center;
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.7vw;
		aspect-ratio: 1/1;
		background-color: rgb(38, 38, 38, 0.8);
		border-radius: 100%;
		img {
			max-width: 1.4vw;
			height: auto;
		}
	}
	.name {
		font-size: 1.3vh;
		color: #555;
	}
}
</style>
