import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/authService";

function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!otp.trim()) {

            alert("Please enter the OTP.");

            return;

        }

        try {

            setLoading(true);

            const response = await verifyOtp(email, otp);

            alert(response.data);

            navigate("/reset-password", {
                state: {
                    email: email
                }
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Invalid or expired OTP."
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
                    Verify OTP
                </h2>

                <div className="alert alert-info">

                    OTP sent to

                    <strong>
                        {" "}
                        {email}
                    </strong>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Enter 6-Digit OTP

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
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
                                ? "Verifying..."
                                : "Verify OTP"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default VerifyOtp;