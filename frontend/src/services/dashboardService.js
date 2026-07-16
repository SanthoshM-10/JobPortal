import axiosInstance from "./axiosInstance";

export const getDashboard = () => {
    return axiosInstance.get("/dashboard");
};