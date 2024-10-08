import { defineStore } from 'pinia'
import inoutKioskService from '@/api/services/inoutkioskService'

export const useInoutKioskStore = defineStore('inoutkiosk', {
	persist: true,
	state: () => ({
		carList: [],
		authInfo: [],
		floorInfo: {},
		dialogOption: {
			icon: '',
			text: '',
			dialog: false,
		},
		carInfo: {},
		port: null,
	}),
	getters: {
		getCarList: state => {
			return state.carList
		},
		getFloorInfo: state => {
			return state.floorInfo
		},
		getDialogOption: state => {
			return state.dialogOption
		},
		getCarInfo: state => {
			return state.carInfo
		},
	},
	actions: {
		actFloorCode(floorInfo) {
			this.floorInfo = floorInfo
		},
		async actCarList({ locationType, carNo }) {
			try {
				let inout = this.floorInfo.inout
				inout = inout.charAt(0).toUpperCase() + inout.slice(1)
				const res = await inoutKioskService[`get${inout}CarList`]({ locationType, carNo })
				this.carList = res?.data?.data || []
				console.log('carList', { locationType, carNo }, res)
			} catch (error) {
				console.error('Failed to fetch actCarList:', error)
			}
		},
		async actAuthInfo({ shopNo, authNo }) {
			try {
				const res = await inoutKioskService.getAuthNoinfo({ shopNo, authNo })
				return res?.data?.data?.check
			} catch (error) {
				console.error('Failed to fetch actAuthInfo:', error)
			}
		},
		async actCarInOut(carInfo) {
			try {
				let inout = this.floorInfo.inout
				inout = inout.charAt(0).toUpperCase() + inout.slice(1)
				const res = await inoutKioskService[`car${inout}`](carInfo)
				console.log('actCarInOut', res)
				return res?.data
			} catch (error) {
				console.error('Failed to fetch actCarInOut:', error)
				return error?.response?.data
			}
		},

		async connectSerial() {
			try {
				// filter 정보 있으면 추가(없으면 삭제해도 무방)
				const filters = [{ usbVendorId: '', usbProductId: '' }]

				// 기존 연결돼있던 시리얼포트 정보 취득
				this.port = await navigator.serial.getPorts()
				console.log('port', this.port)
				// this.port = [await navigator.serial.requestPort()]
				// if (!this.port[0]?.connected || !this.port[0]?.writable) {
				if (!this.port.length) {
					// 기존 연결된 시리얼포트 없으면 유저가 선택(초기 세팅)
					this.port = [await navigator.serial.requestPort()]
					// if (!this.port[0]?.connected || !this.port[0]?.writable) {
					// await navigator.serial.getPorts().then(async ports => {
					// 	this.port = ports
					// 	await this.port[0].open({ baudRate: 9600 })
					// })
				}
				await this.port[0].open({ baudRate: 9600 })
				console.log('port', this.port[0])
				// if (!this.port) this.port = await navigator.serial.requestPort({ filters })

				// const { usbProductId, usbVendorId } = this.port.getInfo()
				// console.log('usbProductId, usbVendorId', usbProductId, usbVendorId, this.port)
				// port 연결
				return true
			} catch (e) {
				console.log(e)
				return false
			}
		},

		async requestSerial(text) {
			console.log('open start')
			try {
				const writer = this.port[0].writable.getWriter()
				// TODO data 뭘로보낼지
				const data = new TextEncoder().encode(text + '\r\n')
				// console.log('encode data:', data)S

				// const data = new Uint8Array([text])
				console.log('encode data:', data)
				writer.write(data)
				// 송신 후 포트 닫기
				writer.releaseLock()

				return true
			} catch (e) {
				console.log(e)
				return false
			}
		},

		async openGate() {
			await this.connectSerial()
			// 차단기 올림
			const isOpen = await this.requestSerial('#011101')
			console.log('isOpen', isOpen)
			if (!isOpen)
				// 차단기 오픈 실패
				return (this.dialogOption = {
					icon: 'success',
					text: `차단기에 문제가<br /> 발생했습니다.`,
					dialog: true,
				})

			const preText = this.floorInfo.inout === 'in' ? '입고' : '출고'
			this.dialogOption = {
				icon: 'success',
				text: `${preText}등록이<br /> 완료되었습니다.`,
				dialog: true,
				action: () => {
					this.$router.push('/inoutkiosk')
				},
			}

			// 차단기 내림
			await setTimeout(async () => {
				await this.requestSerial('#011100')
			}, 3000)
		},
	},
})
