import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!newPassword || !confirmPassword) {

            toast.warning("Please fill all fields.");

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.warning("Passwords do not match.");

            return;

        }

        if (newPassword.length < 5) {

            toast.warning("Password must be at least 5 characters.");

            return;

        }

        try {

            setLoading(true);

            const response = await resetPassword(
                email,
                newPassword
            );

            toast.success(response.data);

            setTimeout(() => {

                navigate("/login");

            }, 1000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Password reset failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

    <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
    >

        <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{ maxWidth: "500px", width: "100%" }}
        >

            <div
                className="text-center text-white py-4"
                style={{
                    background: "linear-gradient(135deg,#16a34a,#15803d)"
                }}
            >

                <h2 className="fw-bold mb-2">

                    Reset Password

                </h2>

                <p className="mb-0 opacity-75">

                    Create a strong new password for your account.

                </p>

            </div>

            <div className="card-body p-4">

                <div className="alert alert-info rounded-3">

                    <strong>Account</strong>

                    <br />

                    <span className="fw-semibold">

                        {email}

                    </span>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            New Password

                        </label>

                        <input
                            type="password"
                            className="form-control rounded-3"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            Confirm Password

                        </label>

                        <input
                            type="password"
                            className="form-control rounded-3"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="alert alert-light border rounded-3">

                        <small className="text-muted">

                            Password must be at least <strong>5 characters</strong> long.

                        </small>

                    </div>

                    <div className="d-grid">

                        <button
                            type="submit"
                            className="btn btn-success btn-lg rounded-3"
                            disabled={loading}
                        >

                            {

                                loading

                                    ?

                                    "Updating Password..."

                                    :

                                    "Reset Password"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

);

}

export default ResetPassword;