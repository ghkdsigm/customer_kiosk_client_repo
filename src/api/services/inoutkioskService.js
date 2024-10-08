import request from '@/api/utils/request'

const baseUrl = '/inout-kiosk/inout-kiosk'
// 입고차량조회
const getInCarList = ({ locationType, carNo }) => {
	return request.get(`${baseUrl}/in-carlist?locationType=${locationType}&carNo=${carNo}`)
}
// 출고차량조회
const getOutCarList = ({ locationType, carNo }) => {
	return request.get(`${baseUrl}/out-carlist?locationType=${locationType}&carNo=${carNo}`)
}
// 인증번호조회
const getAuthNoinfo = ({ shopNo, authNo }) => {
	return request.get(`${baseUrl}/inoutcar-authnoinfo?shopNo=${shopNo}&authNo=${authNo}`)
}
// 차량 입고
const carIn = carInfo => {
	return request.post(`${baseUrl}/car-enter`, carInfo)
}
// 차량 출고
const carOut = carInfo => {
	return request.post(`${baseUrl}/car-exit`, carInfo)
}

export default {
	getInCarList,
	getOutCarList,
	getAuthNoinfo,
	carIn,
	carOut,
}
