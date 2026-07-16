import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteJob, getJobById } from "../services/jobService";
import { toast } from "react-toastify";

function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {

        try {

            const response = await getJobById(id);

            setJob(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch job details.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await deleteJob(id);

            toast.success("Job deleted successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete job.");

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

    if (!job) {

        return (

            <div className="container mt-5 text-center">

                <h3>Job not found.</h3>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h2 className="mb-0">
                        {job.title}
                    </h2>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <p>
                                <strong>Company:</strong> {job.company}
                            </p>

                            <p>
                                <strong>Location:</strong> {job.location}
                            </p>

                            <p>
                                <strong>Salary:</strong>{" "}
                                ₹{Number(job.salary).toLocaleString("en-IN")}
                            </p>

                            <p>
                                <strong>Experience:</strong>{" "}
                                {job.experience} Years
                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>
                                <strong>Job Type:</strong> {job.jobType}
                            </p>

                            <p>
                                <strong>Posted Date:</strong>{" "}
                                {job.postedDate
                                    ? new Date(job.postedDate).toLocaleDateString()
                                    : "N/A"}
                            </p>

                        </div>

                    </div>

                    <hr />

                    <h5>Description</h5>

                    <p>{job.description}</p>

                    <h5>Skills Required</h5>

                    <div className="mb-4">

                        {job.skills
                            ? job.skills.split(",").map((skill, index) => (

                                <span
                                    key={index}
                                    className="badge bg-secondary me-2 mb-2"
                                >
                                    {skill.trim()}
                                </span>

                            ))
                            : "N/A"}

                    </div>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>

                        {(role === "RECRUITER" || role === "ADMIN") && (

                            <Link
                                to={`/edit-job/${job.id}`}
                                className="btn btn-warning"
                            >
                                Edit Job
                            </Link>

                        )}

                        {role === "ADMIN" && (

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete Job
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;