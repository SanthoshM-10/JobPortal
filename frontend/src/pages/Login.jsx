import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

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

        const response = await login(formData);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);

        toast.success("Login Successful!");

        setTimeout(() => {

            navigate("/");

        }, 1000);

    } catch (err) {

        console.error(err);

        const message =
            err.response?.data?.message ||
            err.response?.data ||
            "Invalid Email or Password";

        setError(message);

        toast.error(message);

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="login-page">

            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7">

                    <div className="card login-card border-0">

                        <div className="card-body">

                            <h2 className="text-center fw-bold mb-2">
                                Welcome Back 👋
                            </h2>

                            <p className="text-center text-muted mb-4">
                                Login to continue your job search.
                            </p>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="text-end mb-3">

                                    <Link
                                        to="/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                <button
                                    className="btn btn-primary w-100 login-btn"
                                    type="submit"
                                    disabled={loading}
                                >

                                    {

                                        loading

                                            ?

                                            "Logging in..."

                                            :

                                            "Login →"

                                    }

                            </button>

                            </form>

                            <hr />

                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Don't have an account?
                                </span>

                                {" "}

                                <Link
                                    to="/register"
                                    className="fw-bold text-decoration-none"
                                >
                                    Register Now
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;