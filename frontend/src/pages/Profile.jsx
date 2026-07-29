import { useEffect, useState } from "react";
import {
    getMyProfile,
    updateProfile
} from "../services/profileService";

import {
    uploadProfileImage,
    getMyProfileImage,
    getProfileImage
} from "../services/ProfileImageService";
import { toast } from "react-toastify";
import { viewResume } from "../services/resumeService";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        skills: "",
        education: "",
        experience: "",
        linkedin: "",
        github: "",
        resumeUrl: ""
    });

    const [editing, setEditing] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const [imageName, setImageName] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {

        loadProfile();

        loadProfileImage();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getMyProfile();

            setProfile(response.data);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load profile."
            );
        }

    };

    const loadProfileImage = async () => {

    try {

        const response = await getMyProfileImage();

        if (response.data) {

            const imageResponse = await getProfileImage(response.data);

            const blob = new Blob([imageResponse.data]);

            const url = URL.createObjectURL(blob);

            setImageUrl(url);

        } else {

            setImageUrl("");

        }

    } catch (error) {

        console.log("No profile image found");

        setImageUrl("");

    }

};

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await updateProfile(profile);

            toast.success("Profile updated successfully.");

            setEditing(false);

            loadProfile();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update profile."
            );

        }

    };

    const handleImageUpload = async () => {

        if (!selectedImage) {

            toast.warning("Please select an image.");

            return;

        }

        try {

            await uploadProfileImage(selectedImage);

            toast.success("Profile image uploaded successfully.");

            setSelectedImage(null);

            setImageName("");

            setImageUrl("");

            await loadProfileImage();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Image upload failed."
            );

        }

    };

    const handleViewResume = async () => {

    try {

        const response = await viewResume(profile.resumeUrl);

        const file = new Blob([response.data], {
            type: "application/pdf"
        });

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL, "_blank");

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Failed to open resume."
        );

    }

};

    return (

        <div className="container profile-page py-5">

            <div className="card profile-card border-0">

                <div className="card-body p-5">

                    <div className="text-center">

                        {
                            imageName ?

                            (
                                <img
    src={imageUrl}
    alt="Profile"
    style={{
        width: "180px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "50%",
        border: "5px solid white",
        boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        display: "block",
        margin: "0 auto 15px",
        transition: "transform 0.3s ease"
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
    }}
/>
                            )

                            :

                            (
                               <img
    src="https://via.placeholder.com/180?text=Profile"
    alt="Profile"
    style={{
        width: "180px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "50%",
        border: "5px solid white",
        boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        display: "block",
        margin: "0 auto 15px"
    }}
/>
                            )
                        }

                        <h2 className="fw-bold mt-4">

                            {profile.name || "My Profile"}

                        </h2>

                        <p className="text-muted">

                            {profile.email}

                        </p>

                                                <div className="mt-4">

                            {selectedImage && (

                                <div className="alert alert-success py-2">

                                    Selected Image :
                                    <strong> {selectedImage.name}</strong>

                                </div>

                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="form-control profile-input"
                                onChange={(e) =>
                                    setSelectedImage(e.target.files[0])
                                }
                            />

                            <button
                                className="btn btn-primary rounded-pill px-4 mt-3"
                                onClick={handleImageUpload}
                            >
                                Upload Profile Picture
                            </button>

                        </div>

                    </div>

                    <hr className="my-5" />

                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                        <div>

                            <h3 className="fw-bold mb-1">

                                Personal Information

                            </h3>

                            <p className="text-muted mb-0">

                                Update your profile details.

                            </p>

                        </div>

                        <button
                            className="btn btn-outline-primary rounded-pill px-4"
                            onClick={() => setEditing(!editing)}
                        >
                            {editing ? "Cancel" : "Edit Profile"}
                        </button>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Name

                            </label>

                            <input
                                className="form-control profile-input"
                                name="name"
                                value={profile.name || ""}
                                disabled
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Email

                            </label>

                            <input
                                className="form-control profile-input"
                                name="email"
                                value={profile.email || ""}
                                disabled
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Phone

                            </label>

                            <input
                                className="form-control profile-input"
                                name="phone"
                                value={profile.phone || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Location

                            </label>

                            <input
                                className="form-control profile-input"
                                name="location"
                                value={profile.location || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 mb-4">

                            <label className="form-label fw-semibold">

                                Skills

                            </label>

                            <textarea
                                rows="3"
                                className="form-control profile-input"
                                name="skills"
                                value={profile.skills || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Education

                            </label>

                            <input
                                className="form-control profile-input"
                                name="education"
                                value={profile.education || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                Experience

                            </label>

                            <input
                                className="form-control profile-input"
                                name="experience"
                                value={profile.experience || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                LinkedIn

                            </label>

                            <input
                                className="form-control profile-input"
                                name="linkedin"
                                value={profile.linkedin || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                            {profile.linkedin && (

                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-primary mt-3 rounded-pill"
                                >
                                    Open LinkedIn
                                </a>

                            )}

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">

                                GitHub

                            </label>

                            <input
                                className="form-control profile-input"
                                name="github"
                                value={profile.github || ""}
                                disabled={!editing}
                                onChange={handleChange}
                            />

                            {profile.github && (

                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-dark mt-3 rounded-pill"
                                >
                                    Open GitHub
                                </a>

                            )}

                        </div>

                        <div className="col-12 mb-4">

                            <label className="form-label fw-semibold">

                                Resume

                            </label>

                            {profile.resumeUrl ? (

                                <div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={handleViewResume}
                                    >
                                        View Resume
                                    </button>

                                </div>

                            ) : (

                                <span className="text-danger">

                                    No Resume Uploaded

                                </span>

                            )}

                        </div>

                    </div>

                    {editing && (

                        <div className="text-end">

                            <button
                                className="btn btn-success rounded-pill px-5"
                                onClick={saveProfile}
                            >
                                Save Changes
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Profile;