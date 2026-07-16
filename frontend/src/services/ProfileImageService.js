import axiosInstance from "./axiosInstance";

export const uploadProfileImage = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return axiosInstance.post(
        "/profile/image/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

};

export const getMyProfileImage = () => {

    return axiosInstance.get("/profile/image/my");

};

export const getProfileImage = (filename) => {

    return axiosInstance.get(
        `/profile/image/${filename}`,
        {
            responseType: "blob"
        }
    );

};