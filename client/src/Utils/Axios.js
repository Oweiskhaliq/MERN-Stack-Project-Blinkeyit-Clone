import axios from "axios";
import SummaryApi, { baseURL } from "../common/summaryApi";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR (REFRESH)
================================ */
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios({
          ...SummaryApi.refreshToken,
          baseURL,
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        });

        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
