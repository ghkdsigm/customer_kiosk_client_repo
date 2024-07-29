import request from '@/api/utils/request';

const getUserProfile = () => {
    return request.get('/user/profile');
};

const updateUserProfile = (profileData) => {
    return request.put('/user/profile', profileData);
};

export default {
    getUserProfile,
    updateUserProfile,
};