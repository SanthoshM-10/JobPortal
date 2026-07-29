import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER"
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await register(formData);

            toast.success("Registration Successful!");

            setTimeout(() => {

                toast.info("Redirecting to login page...");

                navigate("/login");

            }, 1000);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Registration Failed"
            );

            toast.error(
                err.response?.data?.message ||
                err.response?.data ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container py-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >

            <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden"
                style={{ maxWidth: "650px", width: "100%" }}
            >

                <div
                    className="text-center text-white py-4"
                    style={{
                        background: "linear-gradient(135deg,#2563eb,#1e40af)"
                    }}
                >

                    <h2 className="fw-bold mb-2">
                        Create Account
                    </h2>

                    <p className="mb-0 opacity-75">
                        Join our Job Portal and start your career journey.
                    </p>

                </div>

                <div className="card-body p-4">

                    {

                        error &&

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    }

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    className="form-control rounded-3"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-semibold">

                                    Role

                                </label>

                                <select
                                    className="form-select rounded-3"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >

                                    <option value="JOB_SEEKER">

                                        Job Seeker

                                    </option>

                                    <option value="RECRUITER">

                                        Recruiter

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="d-grid mt-3">

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg rounded-3"
                                disabled={loading}
                            >

                                {

                                    loading

                                        ?

                                        "Creating Account..."

                                        :

                                        "Register"

                                }

                            </button>

                        </div>

                    </form>

                    <div className="text-center mt-4">

                        <span className="text-muted">

                            Already have an account?

                        </span>

                        <Link
                            to="/login"
                            className="ms-2 text-decoration-none fw-semibold"
                        >

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;