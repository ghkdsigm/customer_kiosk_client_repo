import request from '@/api/utils/request';

const login = (credentials) => {
    return request.post('/auth/login', credentials);
};

const logout = () => {
    return request.post('/auth/logout');
};

export default {
    login,
    logout,
};