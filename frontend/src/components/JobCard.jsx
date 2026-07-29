import { Link } from "react-router-dom";
import { deleteJob } from "../services/jobService";
import { applyJob } from "../services/applicationService";

import { useEffect, useState } from "react";

import {
    saveJob,
    removeSavedJob,
    checkSavedJob
} from "../services/savedJobService";

import { toast } from "react-toastify";

function JobCard({ job, appliedJobs }) {

    const role = localStorage.getItem("role");

    const [saved, setSaved] = useState(false);

    // Check from database whether this job is already applied
    const applied = appliedJobs.includes(job.id);

    useEffect(() => {

    if (role !== "JOB_SEEKER") {
        return;
    }

    fetchSavedStatus();

}, [job.id]);



    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await deleteJob(job.id);

            toast.success("Job deleted successfully!");

            window.location.reload();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to delete job."
            );

        }

    };

    const handleApply = async () => {

        try {

            await applyJob(job.id);

            toast.success("Applied Successfully!");

            // Reload to refresh appliedJobs list
            window.location.reload();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Application Failed"
            );

        }

    };

    const fetchSavedStatus = async () => {

    try {

        const response = await checkSavedJob(job.id);

        setSaved(response.data);

    } catch (error) {

        console.error(error);

    }

};

const handleSaveJob = async () => {

    try {

        if (saved) {

            await removeSavedJob(job.id);

            setSaved(false);

        } else {

            await saveJob(job.id);

            setSaved(true);

        }

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Unable to save job."
        );

    }

};

    return (

        <div className="card job-card h-100 border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start mb-3">

    <div>

        <h4 className="job-title">
            {job.title}
        </h4>

        <h6 className="company-name">
            🏢 {job.company}
        </h6>

    </div>

    <span className="badge bg-primary rounded-pill px-3 py-2">
        {job.jobType}
    </span>

</div>

                <div className="job-info">

    <p>📍 <strong>Location:</strong> {job.location}</p>

    <p>💼 <strong>Experience:</strong> {job.experience} Years</p>

    <p>💰 <strong>Salary:</strong> ₹{job.salary}</p>

    <p>🛠 <strong>Skills:</strong> {job.skills}</p>

    <p className="mt-3">
        {job.description}
    </p>

</div>

                <div className="d-flex flex-wrap gap-2 mt-4">

                    <Link
                        to={`/jobs/${job.id}`}
                        className="btn btn-primary"
                    >
                        View Details
                    </Link>

                    {(role === "RECRUITER" || role === "ADMIN") && (

                        <Link
                            to={`/edit-job/${job.id}`}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>

                    )}

                    {role === "ADMIN" && (

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                    )}

                    {role === "JOB_SEEKER" && (

                        <button
                            className={`btn ${applied ? "btn-secondary" : "btn-success"}`}
                            onClick={handleApply}
                            disabled={applied}
                        >
                            {applied ? "Applied ✓" : "Apply Now"}
                        </button>

                    )}

                    {role === "JOB_SEEKER" && (

    <button
        className={`btn ${
            saved ? "btn-warning" : "btn-outline-warning"
        }`}
        onClick={handleSaveJob}
    >
        {saved ? "❤️ Saved" : "🤍 Save Job"}
    </button>

)}

                </div>

            </div>

        </div>

    );

}

export default JobCard;