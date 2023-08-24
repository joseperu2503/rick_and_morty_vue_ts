// import { useAuth } from '@/composables/useAuth';
import { useToken } from '@/composables/useToken';
import axios from 'axios';

const apiUrl = process.env.AUTH_API_URL
const { getToken } = useToken()

const authApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

authApi.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${getToken()}`
  return request;
});

// authApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Server responded with a status code other than 2xx
//       if (error.response.status === 401) {
//         // Authentication error (Unauthorized)
//         console.error("Authentication error:", error.response.data);
//         const { verifyAuth } = useAuth();
//         verifyAuth()
//         // Perform your desired action to handle the 401 error here
//       } else {
//         console.error("Response error:", error.response.data);
//       }
//     } else if (error.request) {
//       console.error("No response received from server:", error.request);
//     } else {
//       console.error("Request configuration error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export { authApi };
