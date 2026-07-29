import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.warning("Please enter your email.");

            return;

        }

        try {

            setLoading(true);

            const response = await forgotPassword(email);

            toast.success(response.data);

            setTimeout(() => {

            navigate("/verify-otp", {
                state: {
                    email
                }
            });

        }, 1000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to send OTP."
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
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >

                <h2 className="fw-bold mb-2">

                    Forgot Password

                </h2>

                <p className="mb-0 opacity-75">

                    Enter your registered email to receive a verification OTP.

                </p>

            </div>

            <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            Email Address

                        </label>

                        <input
                            type="email"
                            className="form-control rounded-3"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="d-grid">

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg rounded-3"
                            disabled={loading}
                        >

                            {

                                loading

                                    ?

                                    "Sending OTP..."

                                    :

                                    "Send OTP"

                            }

                        </button>

                    </div>

                </form>

                <div className="text-center mt-4">

                    <small className="text-muted">

                        We'll send a One-Time Password (OTP) to your email.

                    </small>

                </div>

            </div>

        </div>

    </div>

);

}

export default ForgotPassword;