import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://e-commerce-server-rho-coral.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to every request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/users/login', data),
  register: (data) => api.post('/users', data),
  getProfile: () => api.get('/users/profile'),
};

export const productAPI = {
  getProducts: () => api.get('/Products'),
  getProduct: (id) => api.get(`/Products/${id}`),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (id) => api.post(`/cart/${id}`, { quantity: 1 }),
  decrementFromCart: (id) => api.post(`/decrementFromCart/${id}`),
  deleteFromCart: (id) => api.delete(`/cart/${id}`),
  createOrder: () => api.post('/createOrder'),
};

export const orderAPI = {
  getUserOrder: () => api.get('/userOrder'),
};

export default api;
