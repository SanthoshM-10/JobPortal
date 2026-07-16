import axiosInstance from "./axiosInstance";

export const register = (userData) => {
    return axiosInstance.post("/auth/register", userData);
};

export const login = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
};

export const forgotPassword = (email) => {
    return axiosInstance.post("/auth/forgot-password", {
        email
    });
};

export const verifyOtp = (email, otp) => {
    return axiosInstance.post("/auth/verify-otp", {
        email,
        otp
    });
};

export const resetPassword = (email, newPassword) => {
    return axiosInstance.post("/auth/reset-password", {
        email,
        newPassword
    });
};