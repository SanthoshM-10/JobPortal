import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authService";
import { toast } from "react-toastify";

function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!otp.trim()) {

        toast.warning("Please enter the OTP.");

        return;

    }

    try {

        setLoading(true);

        const response = await verifyOtp(email, otp);

        toast.success(response.data);

        setTimeout(() => {

            navigate("/reset-password", {
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
            "Invalid or expired OTP."
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

                    Verify OTP

                </h2>

                <p className="mb-0 opacity-75">

                    Enter the One-Time Password sent to your email.

                </p>

            </div>

            <div className="card-body p-4">

                <div className="alert alert-info rounded-3">

                    <strong>OTP sent to</strong>

                    <br />

                    <span className="fw-semibold">

                        {email}

                    </span>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">

                            6-Digit OTP

                        </label>

                        <input
                            type="text"
                            className="form-control rounded-3 text-center"
                            style={{
                                fontSize: "1.3rem",
                                letterSpacing: "8px",
                                fontWeight: "600"
                            }}
                            placeholder="123456"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
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

                                    "Verifying..."

                                    :

                                    "Verify OTP"

                            }

                        </button>

                    </div>

                </form>

                <div className="text-center mt-4">

                    <small className="text-muted">

                        Please enter the OTP exactly as received in your email.

                    </small>

                </div>

            </div>

        </div>

    </div>

);

}

export default VerifyOtp;