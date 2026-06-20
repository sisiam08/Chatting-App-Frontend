import { appConfig } from "@/src/env.config";
import axios from "axios";
// import { cookies } from "next/headers";

const API_URL = appConfig.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

const axiosInstance = async () => {
  // const cookieStore = await cookies();
  // const cookie = cookieStore
  //   .getAll()
  //   .map((cookie) => `${cookie.name}=${cookie.value}`)
  //   .join("; ");

  const instance = axios.create({
    baseURL: API_URL,
    // timeout: 30000,
    // withCredentials: true,
    // headers: {
    //   "Content-Type": "application/json",
    //   cookie: cookie,
    //  },
  });
  return instance;
};

const httpGet = async (endpoint: string, params?: any) => {
  try {
    // const instance = await axiosInstance();
    // const response = await instance.get(endpoint, { params });

    const response = await axios.get(`${API_URL}/${endpoint}`, { params });
    console.log("response data", response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

const httpPost = async (endpoint: string, data?: any, params?: any) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(endpoint, data, { params });
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

const httpPatch = async (endpoint: string, data?: any, params?: any) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch(endpoint, data, { params });
    return response.data;
  } catch (error) {
    console.error(`Error patching data to ${endpoint}:`, error);
    throw error;
  }
};

const httpDelete = async (endpoint: string, params?: any) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}:`, error);
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  delete: httpDelete,
};
