import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'YOUR_BACKEND_BASE_URL',
});

export const attachAccessToken = (accessToken: string): void => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export default instance;
