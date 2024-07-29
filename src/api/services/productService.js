import request from '@/api/utils/request';

const getProducts = () => {
    return request.get('/products');
};

const getProductById = (id) => {
    return request.get(`/products/${id}`);
};

export default {
    getProducts,
    getProductById,
};