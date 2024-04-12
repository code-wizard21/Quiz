
import { wait } from "../utils/wait";
import axiosClient from "./axiosinstance";



class AuthApi {
  async login({ email, password }) {
    await wait(500);

    //login Implementation

    return axiosClient
      .post("/auth/admin/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.tokens.access.token);
        localStorage.setItem("refresh_token", response.data.tokens.refresh.token);
        return response.data.user;
      })
      .catch(() => {
        return Promise.reject(new Error("Please check your email and password"));
      });
  }

  async register({ email, name, password }) {
    axiosClient
      .post("/auth/admin/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  me() {
    return axiosClient
      .get("/auth/me")
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return Promise.reject(new Error("Please check your email and password"));
      });
  }
}

export const authApi = new AuthApi();
