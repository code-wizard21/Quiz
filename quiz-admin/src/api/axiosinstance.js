import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://localhost:4000/v1";
// TODO: remove /api form server
//axiosInstance.defaults.baseURL = "https://api.quizmobb.com/v1";

http: axiosInstance.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosInstance.interceptors.request.use(async function (config) {
  if (config && config.url.includes("login")) {
    return config;
  }
  const access_token = await localStorage.getItem("access_token");
  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.url.includes("login") &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-tokens")
    ) {
      originalRequest._retry = true;
      const refreshToken = await localStorage.getItem("refresh_token");
      await refreshTokens({
        refreshToken,
      });
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error.response.data);
  }
);

const refreshTokens = async (payload) => {
  return axiosInstance
    .post("/auth/refresh-tokens", payload)
    .then(async (res) => {
      const access = res.data.access.token;
      const refresh = res.data.refresh.token;
      await localStorage.setItem("access_token", access);
      await localStorage.setItem("refresh_token", refresh);
      return true;
    })
    .catch((err) => {
      return new Error(err);
    });
};

export default axiosInstance;
