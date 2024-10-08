import { defineStore } from 'pinia'
import customerkioskService from '@/api/services/customerkioskService'

export const useCustomerKioskStore = defineStore('customerkiosk', {
	state: () => ({
		danjiTitle: '',
		floorTitle: '',
		keboardUse: true,
		contractlist: [],
		news: [],
		employeesList: [],
		shopList: [],
		carList: [],
		carDetailInfo: null,
		screensaver: [],
		carcode: [],
		carCodeType: 'maker', // 초기 단계는 'maker'
		makerCode: null, // 메이커 코드
		modelCode: null, // 모델 코드
		gradeCode: null, // 모델 코드
		modelDetailCode: null, // 모델 세부 코드
		models: {
			maker: null,
			model: null,
			modelDetail: null,
			grade: null,
		},
		isLoading: {
			maker: false,
			model: false,
			modelDetail: false,
			grade: false,
		},
		commoncode: null,
		companyList: [],
	}),
	getters: {},
	actions: {
		checkFloorTitle() {
			return this.floorTitle
		},
		setDanjiTitle(newTitle) {
			this.danjiTitle = newTitle
		},
		setFloorTitle(newTitle) {
			this.floorTitle = newTitle
		},
		setKeyBoardUse(toggle) {
			this.keboardUse = toggle
		},

		async fetchCompanyList(code) {
			try {
				const res = await customerkioskService.getCompanyList(code)
				this.companyList = res?.data?.data || []
				return this.companyList
			} catch (error) {
				console.error('Failed to fetch companyList:', error)
				//return null
			}
		},

		async fetchCommonCodeList(code) {
			try {
				const res = await customerkioskService.getCommonCodeList(code)
				this.commoncode = res?.data?.data || []
				return this.commoncode
			} catch (error) {
				console.error('Failed to fetch carDetailInfo:', error)
				//return null
			}
		},

		async fetchCarCodeList(code) {
			console.log('code', code)
			try {
				const res = await customerkioskService.getCarCodeList(code)
				this.carcode = res?.data?.data || []
				return this.carcode
			} catch (error) {
				console.error('Failed to fetch carDetailInfo:', error)
				//return null
			}
		},

		async fetchContractList(contractinfo) {
			try {
				const res = await customerkioskService.getContrackList(contractinfo)
				this.contractlist = res?.data || []
				return this.contractlist
			} catch (error) {
				console.error('Failed to fetch contractlist:', error)
				//return null
			}
		},

		async fetchCarDetailInfo(carinfo) {
			try {
				const res = await customerkioskService.getCarDetailInfo(carinfo)
				this.carDetailInfo = res?.data?.data || []
				return this.carDetailInfo
			} catch (error) {
				console.error('Failed to fetch carDetailInfo:', error)
				//return null
			}
		},

		async fetchCarList(carinfo) {
			try {
				const res = await customerkioskService.getCarList(carinfo)
				this.carList = res?.data?.data || []
				if (this.carList.length > 0) {
					this.carList.forEach(item => {
						const demoNoPrefix = item.demoNo.substr(0, 7)
						item.imageUrl = `https://image.m-park.co.kr/mpark/AttEdit/CarPhoto/Middle/${demoNoPrefix}/${item.demoNo}R1.jpg`
					})
				}
				return this.carList
			} catch (error) {
				console.error('Failed to fetch carlist:', error)
				//return null
			}
		},

		resetCarList() {
			this.carList = []
		},

		async fetchEmployee(employee) {
			try {
				const res = await customerkioskService.getEmployeeList(employee)
				this.employeesList = res?.data || []
				return this.employeesList
			} catch (error) {
				console.error('Failed to fetch employee:', error)
				//return null
			}
		},

		async fetchShop(employee) {
			try {
				const res = await customerkioskService.getShopList(employee)
				this.shopList = res?.data || []
				return this.shopList
			} catch (error) {
				console.error('Failed to fetch shop list:', error)
				//return null
			}
		},

		resetEmployeeShop(val) {
			if (val === 'employee') {
				return (this.employeesList = [])
			}
			return (this.shopList = [])
		},

		async fetchNews() {
			try {
				const res = await customerkioskService.getNews()
				this.news = res?.data || []
				//return this.news
			} catch (error) {
				console.error('Failed to fetch news:', error)
				//return null
			}
		},

		async fetchScreenSaver() {
			try {
				const res = await customerkioskService.getScreenSaver()
				this.screensaver = res?.data?.data || []
				//return this.news
			} catch (error) {
				console.error('Failed to fetch screensaver:', error)
				//return null
			}
		},

		//구입차량검색 제조사별
		async updateCarCode(carCodeType, code) {
			this.carCodeType = carCodeType

			if (carCodeType === 'model') {
				this.makerCode = code
				this.modelCode = null
				this.modelDetailCode = null
				this.gradeCode = null

				this.models.model = null
				this.models.modelDetail = null
				this.models.grade = null
			} else if (carCodeType === 'modelDetail') {
				this.modelCode = code
				this.modelDetailCode = null
				this.gradeCode = null

				this.models.modelDetail = null
				this.models.grade = null
			} else if (carCodeType === 'grade') {
				this.modelDetailCode = code
				this.gradeCode = null

				this.models.grade = null
			} else if (carCodeType === 'lastopt') {
				this.gradeCode = code
			} else {
				this.carCodeType = 'model'
				this.makerCode = null
				this.modelCode = null
				this.modelDetailCode = null
				this.gradeCode = null

				this.models.model = null
				this.models.modelDetail = null
				this.models.grade = null
			}
			if (carCodeType !== 'lastopt') {
				await this.generateParams()
			}
		},

		async generateParams() {
			const params = {
				carCodeType: this.carCodeType,
			}

			if (this.makerCode) {
				params.makerCode = this.makerCode
			}

			if (this.modelCode) {
				params.modelCode = this.modelCode
			}

			if (this.modelDetailCode) {
				params.modelDetailCode = this.modelDetailCode
			}

			if (this.gradeCode) {
				params.gradeCode = this.gradeCode
			}

			this.isLoading[this.carCodeType] = true

			try {
				const res = await customerkioskService.getCarCodeList(params)

				if (this.carCodeType === 'maker') {
					this.models.maker = res?.data?.data || []
				} else if (this.carCodeType === 'model') {
					this.models.model = res?.data?.data || []
				} else if (this.carCodeType === 'modelDetail') {
					this.models.modelDetail = res?.data?.data || []
				} else {
					this.models.grade = res?.data?.data || []
				}

				return this.models
			} catch (error) {
				return null
			} finally {
				this.isLoading[this.carCodeType] = false
			}
		},
	},
})
