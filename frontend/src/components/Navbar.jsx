import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMyProfile } from "../services/profileService";
import {
    getMyProfileImage,
    getProfileImage
} from "../services/profileImageService";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {

        if (token) {

            loadProfile();
            loadProfileImage();

        }

    }, [token]);

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

                const imageResponse =
                    await getProfileImage(response.data);

                const blob =
                    new Blob([imageResponse.data]);

                const url =
                    URL.createObjectURL(blob);

                setImageUrl(url);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Job Portal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <div className="navbar-nav ms-auto align-items-center">

                        <Link
                            className="nav-link"
                            to="/"
                        >
                            Home
                        </Link>
                        

                        {

                            !token ?

                                <>

                                    <Link
                                        className="nav-link"
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </Link>

                                </>

                                :

                                <>

                                    {

                                        role === "RECRUITER" &&

                                        <>

                                            <Link
                                                className="nav-link"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>

                                            <Link
                                                className="nav-link"
                                                to="/add-job"
                                            >
                                                Add Job
                                            </Link>

                                            <Link
                                                className="nav-link"
                                                to="/my-jobs"
                                            >
                                                My Jobs
                                            </Link>

                                        </>

                                    }

                                    

                                    {

                                        role === "JOB_SEEKER" &&

                                        <>

                                            <Link
                                                className="nav-link"
                                                to="/my-applications"
                                            >
                                                My Applications
                                            </Link>

                                            <Link
                                                className="nav-link"
                                                to="/saved-jobs"
                                            >
                                                ❤️ Saved Jobs
                                            </Link>

                                            <Link
                                                className="nav-link"
                                                to="/upload-resume"
                                            >
                                                Upload Resume
                                            </Link>

                                        </>

                                    }

                                    {

                                        role === "ADMIN" &&

                                        <Link
                                            className="nav-link"
                                            to="/add-job"
                                        >
                                            Add Job
                                        </Link>

                                    }

                                    <Link
                                        className="nav-link"
                                        to="/profile"
                                    >
                                        My Profile
                                    </Link>

                                    <div className="dropdown ms-3">

                                        <button
                                            className="btn btn-dark dropdown-toggle d-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                        >

                                            <img
                                                src={
                                                    imageUrl ||
                                                    "https://via.placeholder.com/40"
                                                }
                                                alt="Profile"
                                                width="40"
                                                height="40"
                                                className="rounded-circle me-2"
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                            />

                                            {

                                                profile
                                                    ? profile.name
                                                    : "User"

                                            }

                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">

                                            <li>

                                                <Link
                                                    className="dropdown-item"
                                                    to="/profile"
                                                >
                                                    My Profile
                                                </Link>

                                            </li>

                                            {

                                                role === "JOB_SEEKER" &&

                                                <li>

                                                    <Link
                                                        className="dropdown-item"
                                                        to="/upload-resume"
                                                    >
                                                        Upload Resume
                                                    </Link>

                                                </li>

                                            }

                                            <li>

                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>

                                            </li>

                                        </ul>

                                    </div>

                                </>

                        }

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;