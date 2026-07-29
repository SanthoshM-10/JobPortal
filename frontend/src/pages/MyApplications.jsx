import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import { toast } from "react-toastify";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const response = await getMyApplications();

            setApplications(response.data);

        } catch (error) {

            console.error("Error fetching applications:", error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load your applications."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status">

                    <span className="visually-hidden">
                        Loading...
                    </span>

                </div>

                <h4 className="mt-3">
                    Loading Applications...
                </h4>

            </div>

        );

    }

    return (

    <div className="container py-5">

        <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
        >

            <div
                className="text-white p-4"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >

                <h2 className="fw-bold mb-1">
                    My Applications
                </h2>

                <p className="mb-0 opacity-75">
                    Track the status of all your job applications.
                </p>

            </div>

            <div className="card-body">

                {

                    applications.length === 0 ?

                    (

                        <div className="alert alert-info text-center">

                            <h4>No Applications Found</h4>

                            <p className="mb-0">
                                You haven't applied for any jobs yet.
                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="row g-4">

                            {

                                applications.map(application => (

                                    <div
                                        key={application.applicationId}
                                        className="col-lg-6"
                                    >

                                        <div className="card border-0 shadow-sm rounded-4 h-100">

                                            <div className="card-body p-4">

                                                <h4 className="fw-bold mb-1">

                                                    {application.jobTitle}

                                                </h4>

                                                <h6 className="text-primary mb-4">

                                                    {application.company}

                                                </h6>

                                                <div className="mb-3">

                                                    <strong>Status</strong>

                                                    <br />

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${
                                                            application.status === "SELECTED"
                                                                ? "bg-success"
                                                                : application.status === "REJECTED"
                                                                ? "bg-danger"
                                                                : application.status === "SHORTLISTED"
                                                                ? "bg-info"
                                                                : application.status === "INTERVIEW"
                                                                ? "bg-primary"
                                                                : "bg-warning text-dark"
                                                        }`}
                                                    >

                                                        {application.status}

                                                    </span>

                                                </div>

                                                <div>

                                                    <strong>Applied Date</strong>

                                                    <p className="text-muted mb-0">

                                                        {application.appliedDate}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    </div>

);

}

export default MyApplications;