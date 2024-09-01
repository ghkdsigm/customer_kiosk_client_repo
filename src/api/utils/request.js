import axios from 'axios';
import config from '@/api/config';

const request = axios.create({
    baseURL: config.API_BASE_URL,
    //timeout: config.TIMEOUT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',

        // cache setting
        'Cache-Control': 'no-cache',
        // 'Access-Control-Max-Age': 3600,

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,

        // Authorization: `Bearer ${this.accessToken}`,
    },
});

// // 요청 인터셉터
// request.interceptors.request.use(
//     (config) => {
//         // 토큰 추가 등의 작업 수행
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // 응답 인터셉터
// request.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default request;
