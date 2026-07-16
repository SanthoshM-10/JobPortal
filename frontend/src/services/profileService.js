import axiosInstance from "./axiosInstance";

export const getMyProfile = () => {
    return axiosInstance.get("/profile/me");
};

export const updateProfile = (profile) => {
    return axiosInstance.put("/profile/me", profile);
};