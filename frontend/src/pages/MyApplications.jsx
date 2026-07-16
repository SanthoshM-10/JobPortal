import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

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

        <div className="container mt-4">

            <h2 className="mb-4">
                My Applications
            </h2>

            {

                applications.length === 0 ?

                    (

                        <div className="alert alert-info">

                            You haven't applied for any jobs yet.

                        </div>

                    )

                    :

                    (

                        <div className="row">

                            {

                                applications.map(application => (

                                    <div
                                        key={application.applicationId}
                                        className="col-lg-6 mb-4"
                                    >

                                        <div className="card shadow-sm">

                                            <div className="card-body">

                                                <h4>
                                                    {application.jobTitle}
                                                </h4>

                                                <h6 className="text-primary">
                                                    {application.company}
                                                </h6>

                                                <hr />

                                                <p>
                                                    <strong>Status:</strong>

                                                    <span
                                                        className="badge bg-success ms-2"
                                                    >
                                                        {application.status}
                                                    </span>

                                                </p>

                                                <p>
                                                    <strong>Applied Date:</strong>{" "}
                                                    {application.appliedDate}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default MyApplications;