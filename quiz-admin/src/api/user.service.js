import axiosInstance from "./axiosinstance";

export const getUsers = (page, limit, sort, sort_by, query, filters) => {
  return axiosInstance
    .get(
      `/users?page=${page}&limit=${limit}&sort=${sort}&sort_by=${sort_by}&query=${query}&filters=${filters}`
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const getShadowUsers = (page, limit, sort, sort_by, query, filters) => {
  return axiosInstance
    .get(
      `/users/shadow-users?page=${page}&limit=${limit}&sort=${sort}&sort_by=${sort_by}&query=${query}&filters=${filters}`
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getInvitedUsers = (page, limit, sort, sort_by, query, filters) => {
  return axiosInstance
    .get(
      `/users/unreg/list?page=${page}&limit=${limit}&sort=${sort}&sort_by=${sort_by}&query=${query}&filters=${filters}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
