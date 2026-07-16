import axiosInstance from "./axiosInstance";

export const applyJob = (jobId) => {
    return axiosInstance.post("/applications", {
        jobId
    });
};

export const getMyApplications = () => {
    return axiosInstance.get("/applications/my");
};

export const getApplicants = (jobId) => {
    return axiosInstance.get(`/applications/job/${jobId}`);
};

export const updateApplicationStatus = (applicationId, status) => {
    return axiosInstance.put(
        `/applications/${applicationId}/status`,
        { status }
    );
};

export const downloadResume = (filename) => {
    return axiosInstance.get(`/resume/${filename}`, {
        responseType: "blob"
    });
};