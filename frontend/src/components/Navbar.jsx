import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMyProfile } from "../services/profileService";
import {
    getMyProfileImage,
    getProfileImage
} from "../services/ProfileImageService";

import { toast } from "react-toastify";

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

                const imageResponse = await getProfileImage(response.data);

                const blob = new Blob([imageResponse.data]);

                const url = URL.createObjectURL(blob);

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

        toast.success("Logged out successfully!");

        setTimeout(() => {

            navigate("/login");

        }, 1000);

    };

    return (

        <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">

            <div className="container">

                <Link
                    className="navbar-brand brand-logo fw-bold"
                    to="/"
                >
                    💼 JobPortal
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

                    <div className="navbar-nav ms-auto align-items-center gap-2">

                        <Link
                            className="nav-link custom-link"
                            to="/"
                        >
                            Home
                        </Link>

                        {

                            !token ?

                                <>

                                    <Link
                                        className="nav-link custom-link"
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        className="nav-link custom-link"
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
                                                className="nav-link custom-link"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>

                                            <Link
                                                className="nav-link custom-link"
                                                to="/add-job"
                                            >
                                                Add Job
                                            </Link>

                                            <Link
                                                className="nav-link custom-link"
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
                                                className="nav-link custom-link"
                                                to="/my-applications"
                                            >
                                                My Applications
                                            </Link>

                                            <Link
                                                className="nav-link custom-link"
                                                to="/saved-jobs"
                                            >
                                                ❤️ Saved Jobs
                                            </Link>

                                            <Link
                                                className="nav-link custom-link"
                                                to="/upload-resume"
                                            >
                                                Upload Resume
                                            </Link>

                                        </>

                                    }

                                    {
                                        role === "ADMIN" &&
                                        <Link
    className="nav-link custom-link"
    to="/add-job"
>
    Add Job
</Link>

}

<Link
    className="nav-link custom-link"
    to="/profile"
>
    My Profile
</Link>

<div className="dropdown ms-3">

    <button
        className="btn profile-btn dropdown-toggle d-flex align-items-center"
        data-bs-toggle="dropdown"
    >

        <img
            src={
                imageUrl ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            width="42"
            height="42"
            className="rounded-circle me-2"
            style={{
                objectFit: "cover",
                border: "2px solid white"
            }}
        />

        <span className="fw-semibold">

            {

                profile
                    ? profile.name
                    : "User"

            }

        </span>

    </button>

    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4">

        <li>

            <Link
                className="dropdown-item"
                to="/profile"
            >
                👤 My Profile
            </Link>

        </li>

        {

            role === "JOB_SEEKER" &&

            <li>

                <Link
                    className="dropdown-item"
                    to="/upload-resume"
                >
                    📄 Upload Resume
                </Link>

            </li>

        }

        {

            role === "RECRUITER" &&

            <li>

                <Link
                    className="dropdown-item"
                    to="/dashboard"
                >
                    📊 Dashboard
                </Link>

            </li>

        }

        <li>
            <hr className="dropdown-divider" />
        </li>

        <li>

            <button
                className="dropdown-item text-danger fw-semibold"
                onClick={handleLogout}
            >
                🚪 Logout
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