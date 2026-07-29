import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../services/jobService";
import { toast } from "react-toastify";

function MyJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);


    const fetchJobs = async () => {


        try {


            const response = await getMyJobs();


            setJobs(response.data);

        } catch (error) {

            console.error("Error:", error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load your jobs."
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
                role="status"
            >

                <span className="visually-hidden">
                    Loading...
                </span>

            </div>

            <h4 className="mt-3">
                Loading Jobs...
            </h4>

        </div>

    );

}

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                My Jobs
            </h2>

            {

                jobs.length === 0 ?

                    (

                        <div className="alert alert-info">

                            You haven't posted any jobs yet.

                        </div>

                    )

                    :

                    (

                        <div className="row">

                            {

                                jobs.map(job => (

                                    <div
                                        key={job.id}
                                        className="col-md-6 mb-4"
                                    >

                                        <div className="card shadow">

                                            <div className="card-body">

                                                <h4>{job.title}</h4>

                                                <h6 className="text-primary">
                                                    {job.company}
                                                </h6>

                                                <p>
                                                    {job.location}
                                                </p>

                                                <Link
                                                    to={`/jobs/${job.id}`}
                                                    className="btn btn-primary me-2"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    to={`/jobs/${job.id}/applicants`}
                                                    className="btn btn-success"
                                                >
                                                    View Applicants
                                                </Link>

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

export default MyJobs;