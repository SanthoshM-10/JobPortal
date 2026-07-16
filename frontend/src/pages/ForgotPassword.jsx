import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            alert("Please enter your email.");

            return;

        }

        try {

            setLoading(true);

            const response = await forgotPassword(email);

            alert(response.data);

            navigate("/verify-otp", {
                state: {
                    email: email
                }
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to send OTP."
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
                    Forgot Password
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {

                            loading
                                ? "Sending OTP..."
                                : "Send OTP"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ForgotPassword;