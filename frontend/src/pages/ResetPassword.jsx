import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

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

            alert("Please fill all fields.");

            return;

        }

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        if (newPassword.length < 5) {

            alert("Password must be at least 5 characters.");

            return;

        }

        try {

            setLoading(true);

            const response = await resetPassword(
                email,
                newPassword
            );

            alert(response.data);

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Password reset failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "500px" }}
            >

                <h2 className="text-center mb-4">
                    Reset Password
                </h2>

                <div className="alert alert-info">

                    Reset password for

                    <strong>
                        {" "}
                        {email}
                    </strong>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {

                            loading
                                ? "Updating Password..."
                                : "Reset Password"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;