import { defineStore } from 'pinia'
import performancestatusService from '@/api/services/performancestatusService'

export const useStatusStore = defineStore('performancestatus', {
	state: () => ({
		statusList: [],
		waitingCarList: [],
		inspectionList: [],
	}),
	getters: {
		getStatusList: state => {
			return state.statusList
		},
		getWaitingCarList: state => {
			return state.waitingCarList
		},
		getInspectionList: state => {
			return state.inspectionList
		},
	},
	actions: {
		async actStatusList() {
			try {
				const res = await performancestatusService.getWaitingCarList()
				this.statusList = res?.data?.data || []
			} catch (error) {
				console.error('Failed to fetch statusList:', error)
			}
		},
		async actWaitingCarList(inspCompanyNo) {
			try {
				const res = await performancestatusService.getInspectionWaitingCarlist(inspCompanyNo)
				this.waitingCarList = res?.data?.data || []
				// this.waitingCarList =
				// 	this.waitingCarList.concat(res?.data?.data[0]).map((v, idx) => {
				// 		return {
				// 			...v,
				// 			ranking: idx + 1,
				// 		}
				// 	}) || []
			} catch (error) {
				console.error('Failed to fetch waitingCarList:', error)
			}
		},
		async actInspectionList(inspCompanyNo) {
			try {
				const res = await performancestatusService.getInspectionCarlist(inspCompanyNo)
				this.inspectionList = res?.data?.data || []
				// this.inspectionList =
				// 	JSON.parse(JSON.stringify(this.inspectionList))
				// 		.concat(res?.data?.data)
				// 		.map((v, idx) => {
				// 			return {
				// 				...v,
				// 				ranking: idx + 1,
				// 				// imageUrl: 'https://image.m-park.co.kr/mpark_test/AttEdit/CarPhoto/Large/1121502/1121502338R1.jpeg',
				// 			}
				// 		}) || []
			} catch (error) {
				console.error('Failed to fetch waitingCarList:', error)
			}
		},
	},
})
