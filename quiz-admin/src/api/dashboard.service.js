import axiosInstance from "./axiosinstance";

export const getDashboardStats = async (type) => {
  return axiosInstance
    .get(`/dashboard/${type}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getLatestUsers = async () => {
  return axiosInstance
    .get("/dashboard/latest/users/5")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const getDashboardGraph = async () => {
  return axiosInstance
    .get(`/dashboard/home/graph`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
