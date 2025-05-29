import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const updateProduct = (id, data) => api.patch(`/products/${id}`, data);
export const createProduct = (data) => api.post("/products", data);

export const createOrder = (data) => api.post("/order", data);
export const getOrderByUser = (userId) => api.get(`/order/${userId}`);
export const getAllOrders = () => api.get("/order");
export const updateOrderStatus = (orderId, data) => api.patch(`/order/${orderId}`, data);
export default api;