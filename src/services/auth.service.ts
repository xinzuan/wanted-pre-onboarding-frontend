import axios from "axios";
import { response } from "express";

const API_URL = "https://www.pre-onboarding-selection-task.shop/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "auth/signin", {
        email,
        password
      })
      
      .then(response => {
        console.log(response);
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email: string, password: string) {
    return axios.post(API_URL + "auth/signup", {
      email,
      password
    })
    .then(response => {
        console.log(response);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();