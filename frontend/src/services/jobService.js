import axiosInstance from "./axiosInstance";

export const getAllJobs = () => {
    return axiosInstance.get("/jobs");
};

export const createJob = (job) => {
    return axiosInstance.post("/jobs", job);
};

export const getJobById = (id) => {
    return axiosInstance.get(`/jobs/${id}`);
};

export const updateJob = (id, job) => {
    return axiosInstance.put(`/jobs/${id}`, job);
};

export const deleteJob = (id) => {
    return axiosInstance.delete(`/jobs/${id}`);
};

export const searchByCompany = (company) => {
    return axiosInstance.get(`/jobs/company/${company}`);
};

export const searchJobs = (keyword) => {
    return axiosInstance.get(`/jobs/search?keyword=${keyword}`);
};

export const getMyJobs = () => {
    return axiosInstance.get("/jobs/my");
};