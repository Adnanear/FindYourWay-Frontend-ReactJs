import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default request;

request.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem(
    `${import.meta.env.VITE_LOCAL_STORAGE_PREFIX}_token`,
  );

  return config;
});
