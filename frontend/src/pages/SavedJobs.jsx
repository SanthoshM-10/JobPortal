import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getSavedJobs,
    removeSavedJob
} from "../services/savedJobService";
import { toast } from "react-toastify";

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

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load saved jobs."
            );

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
            toast.success("Saved job removed successfully.");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to remove saved job."
            );

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

    <div className="container py-5">

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            <div
                className="text-white p-4"
                style={{
                    background: "linear-gradient(135deg,#dc2626,#ef4444)"
                }}
            >

                <h2 className="fw-bold mb-1">
                    ❤️ My Saved Jobs
                </h2>

                <p className="mb-0 opacity-75">
                    Keep track of the jobs you're interested in.
                </p>

            </div>

            <div className="card-body">

                {

                    savedJobs.length === 0 ?

                    (

                        <div className="alert alert-info text-center">

                            <h4>No Saved Jobs</h4>

                            <p className="mb-0">
                                Save jobs to access them quickly later.
                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="row g-4">

                            {

                                savedJobs.map(job => (

                                    <div
                                        key={job.savedJobId}
                                        className="col-lg-6"
                                    >

                                        <div className="card border-0 shadow-sm rounded-4 h-100">

                                            <div className="card-body p-4 d-flex flex-column">

                                                <div className="mb-3">

                                                    <h4 className="fw-bold text-primary">

                                                        {job.title}

                                                    </h4>

                                                    <h6 className="text-muted">

                                                        {job.company}

                                                    </h6>

                                                </div>

                                                <div className="d-flex flex-wrap gap-2 mb-3">

                                                    <span className="badge bg-light text-dark px-3 py-2">
                                                        📍 {job.location}
                                                    </span>

                                                    <span className="badge bg-success px-3 py-2">
                                                        ₹{Number(job.salary).toLocaleString("en-IN")}
                                                    </span>

                                                    <span className="badge bg-warning text-dark px-3 py-2">
                                                        {job.jobType}
                                                    </span>

                                                    <span className="badge bg-info text-dark px-3 py-2">
                                                        {job.experience} Years
                                                    </span>

                                                </div>

                                                <div className="mb-3">

                                                    <strong className="d-block mb-2">
                                                        Skills
                                                    </strong>

                                                    <div className="d-flex flex-wrap gap-2">

                                                        {

                                                            job.skills
                                                                ?.split(",")
                                                                .map((skill, index) => (

                                                                    <span
                                                                        key={index}
                                                                        className="badge rounded-pill bg-primary"
                                                                    >

                                                                        {skill.trim()}

                                                                    </span>

                                                                ))

                                                        }

                                                    </div>

                                                </div>

                                                <div className="mt-auto">

                                                    <p className="text-muted mb-3">

                                                        <strong>Posted:</strong>{" "}
                                                        {job.postedDate}

                                                    </p>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            to={`/jobs/${job.jobId}`}
                                                            className="btn btn-primary flex-fill"
                                                        >

                                                            View Details

                                                        </Link>

                                                        <button
                                                            className="btn btn-outline-danger flex-fill"
                                                            onClick={() =>
                                                                handleRemove(job.jobId)
                                                            }
                                                        >

                                                            Remove

                                                        </button>

                                                    </div>

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

export default SavedJobs;