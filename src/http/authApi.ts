import { useToken } from '@/composables/useToken';
import axios from 'axios';

const apiUrl = process.env.VUE_AUTH_API_URL
const token = useToken()

const authApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

authApi.interceptors.request.use((request) => {
  token.isValidToken()
  request.headers['Authorization'] = `Bearer ${token.getToken()}`
  return request;
});

export {authApi, apiUrl};
