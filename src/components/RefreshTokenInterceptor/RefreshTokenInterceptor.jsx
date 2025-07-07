import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { instance, refreshUser } from "../../redux/auth/operations";

const RefreshTokenInterceptor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(
          "Response error:",
          error.config?.url,
          error.response?.status
        );
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (originalRequest.url.includes("/auth/refresh")) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(error);
          }

          try {
            const result = await dispatch(refreshUser()).unwrap();

            // Check whether a new token has been received
            if (result.accessToken || result.token) {
              const newToken = result.accessToken || result.token;

              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              instance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newToken}`;

              return instance(originalRequest);
            }

            return Promise.reject(new Error("No access token received"));
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            // Перенаправляємо на login
            window.location.href = "/login";

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);

  return null;
};

export default RefreshTokenInterceptor;
