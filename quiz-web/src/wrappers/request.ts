import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiBaseUrl } from '../../env.config';
import { REQUEST_METHODS } from '../constants/enum';
import { ILoginResponse } from '../types/user.type';

const baseURL: string = apiBaseUrl;
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});
const getAuthHeaders = () => {
  let headers = {};
  const userString = localStorage.getItem('user');

  if (!userString) return headers;
  const user: ILoginResponse = JSON.parse(userString);
  headers = {
    Authorization: `Bearer ${user.tokens.access.token}`,
  };
  return headers;
};

const request = async (
  options: AxiosRequestConfig,
  pathParams: { [key: string]: string } = {}
): Promise<AxiosResponse> => {
  const { url } = options;

  let onlineUrl = url;

  // mapping url upon path params if there is url parameters more than
  // one than it will replace with orignal value
  if (Object.keys(pathParams).length) {
    onlineUrl = url
      ?.split('/')
      .map((el) => {
        let str = el;
        Object.keys(pathParams).forEach((key) => {
          if (el.includes(`{${key}}`)) {
            str = el.replace(`{${key}}`, pathParams[key]);
          }
          return key;
        });
        return str;
      })
      .join('/');
  }

  const authHeaders = getAuthHeaders();
  const config = {
    method: options.method,
    url: `${baseURL}/${onlineUrl}`,
    headers: {
      ...axiosInstance.defaults.headers.common,
      ...options.headers,
      ...authHeaders,
    },
    data: options.data,
  };

  return axiosInstance(config);
};

export const get = async (url: string, config?: AxiosRequestConfig, pathParams = {}): Promise<AxiosResponse> => {
  const response = await request(
    {
      url,
      method: REQUEST_METHODS.GET,
      ...config,
      withCredentials: true,
    },
    pathParams
  );
  return response as AxiosResponse;
};

export const post = async (
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  pathParams = {}
): Promise<AxiosResponse> => {
  const response = await request(
    {
      url,
      method: REQUEST_METHODS.POST,
      data,
      ...config,
    },
    pathParams
  );
  return response as AxiosResponse;
};

export const put = async (
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  pathParams = {}
): Promise<AxiosResponse> => {
  const response = await request(
    {
      url,
      method: REQUEST_METHODS.PUT,
      data,
      ...config,
    },
    pathParams
  );
  return response as AxiosResponse;
};

export const del = async (url: string, config?: AxiosRequestConfig, pathParams = {}): Promise<AxiosResponse> => {
  const response = await request(
    {
      url,
      method: REQUEST_METHODS.DELETE,
      ...config,
    },
    pathParams
  );
  return response as AxiosResponse;
};

export const patch = async (
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  pathParams = {}
): Promise<AxiosResponse> => {
  const response = await request(
    {
      url,
      method: REQUEST_METHODS.PATCH,
      data,
      ...config,
    },
    pathParams
  );
  return response as AxiosResponse;
};

// Axios Request Interceptor
axiosInstance.interceptors.request.use(async function (config) {
  const userString = localStorage.getItem('user');
  if ((config && config.url && config.url.includes('login')) || !userString) {
    return config;
  }
  if (!userString) return config;
  const user: ILoginResponse = JSON.parse(userString);
  if (user.tokens.access.token) {
    config.headers.Authorization = `Bearer ${user.tokens.access.token}`;
  }
  return config;
});

const getRefreshToken = () => {
  return axiosInstance
    .post('/auth/refresh-tokens')
    .then((res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Axios Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    const isRetry = originalRequest._retry;
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest.url.includes('login') &&
      !isRetry &&
      !originalRequest.url.includes('refresh')
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      await getRefreshToken();
      return axiosInstance(originalRequest);
    }
    if (error && error.response && error.response.status === 401 && isRetry) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error.response.data);
    }
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default {
  get,
  post,
  put,
  del,
  patch,
};
