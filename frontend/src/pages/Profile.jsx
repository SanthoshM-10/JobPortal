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

        }

    };

    const loadProfileImage = async () => {

        try {

            const response = await getMyProfileImage();

            if (response.data) {

                setImageName(response.data);

                const imageResponse =
                    await getProfileImage(response.data);

                const blob = new Blob(
                    [imageResponse.data]
                );

                const url =
                    URL.createObjectURL(blob);

                    setImageUrl(url);

            }

        } catch (error) {

            console.error(error);

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

            alert("Profile updated successfully.");

            setEditing(false);

            loadProfile();

        } catch (error) {

            console.error(error);

            alert("Failed to update profile.");

        }

    };

    const handleImageUpload = async () => {

        if (!selectedImage) {

            alert("Please select an image.");

            return;

        }

        try {

            await uploadProfileImage(selectedImage);

            alert("Profile image uploaded successfully.");

            setSelectedImage(null);

            setImageName("");

            setImageUrl("");

            await loadProfileImage();

        } catch (error) {

            console.error(error);

            alert("Image upload failed.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <div className="text-center mb-4">

                    {

                        imageName ?

                            (

                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="rounded-circle border shadow"
                                    width="180"
                                    height="180"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                />

                            )

                            :

                            (

                                <img
                                    src="https://via.placeholder.com/180?text=Profile"
                                    alt="Profile"
                                    className="rounded-circle border shadow"
                                    width="180"
                                    height="180"
                                />

                            )

                    }

                    <div className="mt-3">

                        {
                            selectedImage && (

                                <div className="mt-2 text-success">

                                    Selected:
                                    <strong>
                                        {" "}
                                        {selectedImage.name}
                                    </strong>

                                </div>

                            )
                        }                       

                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) =>
                                setSelectedImage(e.target.files[0])
                            }
                        />

                        <button
                            className="btn btn-primary mt-3"
                            onClick={handleImageUpload}
                        >
                            Upload Profile Picture
                        </button>

                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>My Profile</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Cancel" : "Edit Profile"}
                    </button>

                </div>

                <div className="row">

    <div className="col-md-6 mb-3">

        <label className="form-label">Name</label>

        <input
            className="form-control"
            name="name"
            value={profile.name || ""}
            disabled
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">Email</label>

        <input
            className="form-control"
            name="email"
            value={profile.email || ""}
            disabled
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">Phone</label>

        <input
            className="form-control"
            name="phone"
            value={profile.phone || ""}
            disabled={!editing}
            onChange={handleChange}
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">Location</label>

        <input
            className="form-control"
            name="location"
            value={profile.location || ""}
            disabled={!editing}
            onChange={handleChange}
        />

    </div>

    <div className="col-md-12 mb-3">

        <label className="form-label">Skills</label>

        <textarea
            className="form-control"
            rows="3"
            name="skills"
            value={profile.skills || ""}
            disabled={!editing}
            onChange={handleChange}
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">Education</label>

        <input
            className="form-control"
            name="education"
            value={profile.education || ""}
            disabled={!editing}
            onChange={handleChange}
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">Experience</label>

        <input
            className="form-control"
            name="experience"
            value={profile.experience || ""}
            disabled={!editing}
            onChange={handleChange}
        />

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">LinkedIn</label>

        <input
            className="form-control"
            name="linkedin"
            value={profile.linkedin || ""}
            disabled={!editing}
            onChange={handleChange}
        />

        {
            profile.linkedin &&

            <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-sm mt-2"
            >
                Open LinkedIn
            </a>
        }

    </div>

    <div className="col-md-6 mb-3">

        <label className="form-label">GitHub</label>

        <input
            className="form-control"
            name="github"
            value={profile.github || ""}
            disabled={!editing}
            onChange={handleChange}
        />

        {
            profile.github &&

            <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark btn-sm mt-2"
            >
                Open GitHub
            </a>
        }

    </div>

    <div className="col-md-12 mb-3">

        <label className="form-label">Resume</label>

        {

            profile.resumeUrl ?

                <a
                    href={`http://localhost:8080/resume/${profile.resumeUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success"
                >
                    View Resume
                </a>

                :

                <span className="text-danger">
                    No Resume Uploaded
                </span>

        }

    </div>

</div>

{
    editing &&

    <div className="text-end">

        <button
            className="btn btn-success"
            onClick={saveProfile}
        >
            Save Changes
        </button>

    </div>
}

                {/* Keep the rest of your existing Profile.jsx exactly as it is */}
                {/* From Name, Email, Phone, Location, Skills, Resume, Save Changes etc. */}

            </div>

        </div>

    );

}

export default Profile;