import apiRequest from "../../../api/apiRequest.js";
import { refreshToken } from "./authActions.js"; // Import your API request module

const setupInterceptors = (store) => {
  apiRequest.interceptors.request.use((config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `JWT ${access}`;
    }
    return config;
  });

  apiRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        // Refresh the access token
        const refreshTokenValue = localStorage.getItem("refresh");
        if (refreshTokenValue) {
          try {
            const response = await store.dispatch(
              refreshToken({ refresh: refreshTokenValue })
            );
            const newAccessToken = response.payload.data.access;

            localStorage.setItem("access", newAccessToken);

            error.config.headers.Authorization = `JWT ${newAccessToken}`;

            return apiRequest(error.config);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
