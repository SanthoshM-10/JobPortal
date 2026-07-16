import axiosInstance from "./axiosInstance";

// Save a job
export const saveJob = (jobId) => {
    return axiosInstance.post(`/saved-jobs/${jobId}`);
};

// Remove saved job
export const removeSavedJob = (jobId) => {
    return axiosInstance.delete(`/saved-jobs/${jobId}`);
};

// Get all saved jobs
export const getSavedJobs = () => {
    return axiosInstance.get("/saved-jobs");
};

// Check whether a job is saved
export const checkSavedJob = (jobId) => {
    return axiosInstance.get(`/saved-jobs/check/${jobId}`);
};