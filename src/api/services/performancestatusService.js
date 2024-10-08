import request from '@/api/utils/request'

const baseUrl = '/performboard/performboard'
// 단지별 차량 대기상황 조회
const getWaitingCarList = () => {
	return request.get(`${baseUrl}/waiting-carlist`)
}
// 단지별 성능접수 리스트 조회
const getInspectionWaitingCarlist = inspCompanyNo => {
	return request.get(`${baseUrl}/inspectionwaiting-carlist?inspCompanyNo=${inspCompanyNo}`)
}
// 단지별 검사중 차량 리스트 조회
const getInspectionCarlist = inspCompanyNo => {
	return request.get(`${baseUrl}/inspection-carlist?inspCompanyNo=${inspCompanyNo}`)
}
export default {
	getWaitingCarList,
	getInspectionWaitingCarlist,
	getInspectionCarlist,
}
