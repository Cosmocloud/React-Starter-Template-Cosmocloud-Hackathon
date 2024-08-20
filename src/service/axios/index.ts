import { currentSession } from "@/service/amplify";
import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

//setting up interceptor for api calls
const axiosRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const session = await currentSession();

  const token = session?.tokens?.idToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    projectId: import.meta.env.VITE_COSMOCLOUD_PROJECT_ID,
    environmentId: import.meta.env.VITE_COSMOCLOUD_ENVIRONMENT_ID,
  },
});

axios.interceptors.request.use(axiosRequestInterceptor, (e) =>
  Promise.reject(e)
);

export const getAxios = () => axios;

export const getError = (response: unknown) => {
  if (!response) {
    return null;
  }
  const errorMessage = (response as AxiosResponse)?.data?.response.message;
  if (typeof errorMessage !== "string") {
    return "Something went wrong!";
  }

  return errorMessage;
};
