import { ref } from 'vue'

export function useUtilities() {
	//공백 들여쓰기
	const formatStringWithNewlines = rawString => {
		return rawString.replace(/\n/g, '<br>')
	}

	//공통 이미지 처리
	const getImageSrc = (folder, file) => {
		const images = {
			bottom: import.meta.glob('@/assets/img/bottom/*.svg', { eager: true }),
			side: import.meta.glob('@/assets/img/side/*.svg', { eager: true }),
			news: import.meta.glob('@/assets/img/news/*.png', { eager: true }),
			// 필요 경로들 여기에 추가
		}
		const selectedFolder = images[folder] || {}
		const fileName = `/src/assets/img/${folder}/${file}.svg`

		return selectedFolder[fileName]?.default || selectedFolder[fileName]
	}

	//공통 이미지 처리
	const setImageSrc = (folder, file) => {
		const images = import.meta.glob('@/assets/img/**/*.@(svg|png|jpg)', { eager: true })

		const fileName = `/src/assets/img/${folder}/${file}`

		return (
			images[fileName + '.svg']?.default ||
			images[fileName + '.png']?.default ||
			images[fileName + '.jpg']?.default ||
			images[fileName + '.svg'] ||
			images[fileName + '.png'] ||
			images[fileName + '.jpg']
		)
	}

	//차량검색 차순
	const sortDataByYearAndAmount = (data, part) => {
		return [...data].sort((a, b) => {
			if (part === 'yyyy') {
				// 연식 최신순으로 정렬
				return b[part] - a[part]
			} else if (part === 'hit') {
				// 조회수 높은 순으로 정렬
				return b[part] - a[part]
			} else {
				// 일반적인 오름차순 정렬
				if (a[part] < b[part]) return -1
				if (a[part] > b[part]) return 1
				return 0
			}
		})
	}

	//차량주행거리
	const common_addComma = val => {
		if (!val) return val
		if (typeof val === 'string') return Number(val).toLocaleString()
		return val.toLocaleString()
	}

	return {
		formatStringWithNewlines,
		getImageSrc,
		setImageSrc,
		sortDataByYearAndAmount,
		common_addComma,
	}
}
