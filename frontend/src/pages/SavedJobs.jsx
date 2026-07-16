import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getSavedJobs,
    removeSavedJob
} from "../services/savedJobService";

function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const fetchSavedJobs = async () => {

        try {

            const response = await getSavedJobs();

            setSavedJobs(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load saved jobs.");

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async (jobId) => {

        const confirmRemove = window.confirm(
            "Remove this job from saved jobs?"
        );

        if (!confirmRemove) return;

        try {

            await removeSavedJob(jobId);

            setSavedJobs(
                savedJobs.filter(job => job.jobId !== jobId)
            );

        } catch (error) {

            console.error(error);

            alert("Failed to remove saved job.");

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

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                ❤️ My Saved Jobs
            </h2>

            {

                savedJobs.length === 0 ?

                    (

                        <div className="alert alert-info">

                            No saved jobs found.

                        </div>

                    )

                    :

                    savedJobs.map(job => (

                        <div
                            key={job.savedJobId}
                            className="card shadow-sm mb-4"
                        >

                            <div className="card-body">

                                <h4 className="text-primary">

                                    {job.title}

                                </h4>

                                <h6 className="text-muted">

                                    {job.company}

                                </h6>

                                <hr />

                                <p>

                                    <strong>Location:</strong> {job.location}

                                </p>

                                <p>

                                    <strong>Experience:</strong> {job.experience} Years

                                </p>

                                <p>

                                    <strong>Salary:</strong> ₹{job.salary}

                                </p>

                                <p>

                                    <strong>Job Type:</strong> {job.jobType}

                                </p>

                                <p>

                                    <strong>Skills:</strong> {job.skills}

                                </p>

                                <p>

                                    <strong>Posted Date:</strong> {job.postedDate}

                                </p>

                                <div className="mt-3">

                                    <Link
                                        to={`/jobs/${job.jobId}`}
                                        className="btn btn-primary me-2"
                                    >

                                        View Details

                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleRemove(job.jobId)
                                        }
                                    >

                                        Remove

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

            }

        </div>

    );

}

export default SavedJobs;