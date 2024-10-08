import request from '@/api/utils/request'

const baseUrl = '/customer-kiosk/customer-kiosk'
//엠파크안내
const getContrackList = code => {
	// 건물별 호실 및 계약 업체정보
	return request.get(`${baseUrl}/office-contractlist?buildCode=${code}`)
}

//매장안내
const getCompanyList = code => {
	//업체 리스트
	return request.get(`${baseUrl}/company-list`, { params: { buildCode: code.buildCode, companyGbn: code.companyGbn } })
}

//구입차량검색
const getCommonCodeList = code => {
	//공통코드
	return request.get(`${baseUrl}/common-codelist?commonCode=${code}`)
}
const getCarCodeList = params => {
	//차량코드
	return request.get(`${baseUrl}/car-codelist`, { params })
}
const getCarList = params => {
	//광고차량 리스트
	return request.get(`${baseUrl}/car-list`, { params })
}
const getCarDetailInfo = val => {
	//광고차량 리스트 세부
	return request.get(`${baseUrl}/car-detailinfo?demoNo=${val}`)
}

//종사원조회
const getEmployeeList = employee => {
	//종사원 리스트
	return request.get(`${baseUrl}/employee-list?keyWord=${employee}`)
}
const getShopList = shop => {
	//상사 리스트
	return request.get(`${baseUrl}/shop-list?keyWord=${shop}`)
}

//한국일보
const getNews = () => {
	//한국일보 기사
	return request.get(`${baseUrl}/news-list`)
}

//스크린보호기
const getScreenSaver = () => {
	// 영상
	return request.get(`${baseUrl}/video-list`)
}

export default {
	getContrackList,
	getCompanyList,
	getCommonCodeList,
	getCarCodeList,
	getCarList,
	getCarDetailInfo,
	getEmployeeList,
	getShopList,
	getNews,
	getScreenSaver,
}
