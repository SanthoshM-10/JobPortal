import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../services/jobService";

function MyJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    console.log("MyJobs component rendered");

    const fetchJobs = async () => {

        console.log("fetchJobs() called");

        try {

            console.log("Calling getMyJobs()...");

            const response = await getMyJobs();

            console.log("API Response:", response);
            console.log("Response Data:", response.data);

            setJobs(response.data);

        } catch (error) {

            console.error("Error:", error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="container mt-5 text-center">
                <h4>Loading...</h4>
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