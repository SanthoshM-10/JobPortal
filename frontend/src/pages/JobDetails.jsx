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

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to fetch job details."
            );

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

            toast.success("Job deleted successfully.");

            setTimeout(() => {

                navigate("/");

            }, 1000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete job."
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

    if (!job) {

        return (

            <div className="container mt-5 text-center">

                <h3>Job not found.</h3>

            </div>

        );

    }

    return (
    <div className="container py-5">

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            <div
                className="text-white p-5"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >
                <h2 className="fw-bold mb-2">{job.title}</h2>

                <h5 className="opacity-75 mb-4">
                    {job.company}
                </h5>

                <div className="d-flex flex-wrap gap-2">

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

            </div>

            <div className="card-body p-4">

                <div className="row g-4">

                    <div className="col-lg-8">

                        <div className="card border-0 bg-light rounded-4 mb-4">

                            <div className="card-body">

                                <h4 className="fw-bold mb-3">
                                    Job Description
                                </h4>

                                <p className="text-muted mb-0">
                                    {job.description}
                                </p>

                            </div>

                        </div>

                        <div className="card border-0 bg-light rounded-4">

                            <div className="card-body">

                                <h4 className="fw-bold mb-3">
                                    Required Skills
                                </h4>

                                <div className="d-flex flex-wrap gap-2">

                                    {job.skills
                                        ? job.skills.split(",").map((skill, index) => (
                                            <span
                                                key={index}
                                                className="badge rounded-pill bg-primary px-3 py-2"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))
                                        : "N/A"}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body">

                                <h5 className="fw-bold mb-3">
                                    Job Information
                                </h5>

                                <hr />

                                <p>
                                    <strong>Company</strong><br />
                                    {job.company}
                                </p>

                                <p>
                                    <strong>Location</strong><br />
                                    {job.location}
                                </p>

                                <p>
                                    <strong>Posted</strong><br />
                                    {job.postedDate
                                        ? new Date(job.postedDate).toLocaleDateString()
                                        : "N/A"}
                                </p>

                                <p>
                                    <strong>Experience</strong><br />
                                    {job.experience} Years
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="d-flex flex-wrap gap-3 mt-4">

                    <button
                        className="btn btn-outline-primary px-4"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    {(role === "RECRUITER" || role === "ADMIN") && (

                        <Link
                            to={`/edit-job/${job.id}`}
                            className="btn btn-warning px-4"
                        >
                            Edit Job
                        </Link>

                    )}

                    {role === "ADMIN" && (

                        <button
                            className="btn btn-danger px-4"
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