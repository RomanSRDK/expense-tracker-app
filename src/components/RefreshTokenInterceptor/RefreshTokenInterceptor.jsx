import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { instance, refreshUser } from "../../redux/auth/operations";

const RefreshTokenInterceptor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => {
        // console.log("Response success:", response.config.url);
        return response;
      },
      async (error) => {
        // console.log(
        //   "Response error:",
        //   error.config?.url,
        //   error.response?.status
        // );
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (originalRequest.url.includes("/auth/refresh")) {
            return Promise.reject(error);
          }

          try {
            const result = await dispatch(refreshUser()).unwrap();
            // Оновлюємо заголовок оригінального запиту
            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

            // Повторюємо оригінальний запит
            return instance(originalRequest);
          } catch (refreshError) {
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
