import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteJob, getJobById } from "../services/jobService";

function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {

        try {

            const response = await getJobById(id);
            setJob(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to fetch job details.");

        }

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteJob(id);

            alert("Job deleted successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);
            alert("Failed to delete job.");

        }

    };

    if (!job) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2>{job.title}</h2>

                    <hr />

                    <p>
                        <strong>Company:</strong> {job.company}
                    </p>

                    <p>
                        <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                        <strong>Salary:</strong> ₹{job.salary}
                    </p>

                    <p>
                        <strong>Experience:</strong> {job.experience} Years
                    </p>

                    <p>
                        <strong>Job Type:</strong> {job.jobType}
                    </p>

                    <p>
                        <strong>Description:</strong>
                    </p>

                    <p>{job.description}</p>

                    <p>
                        <strong>Skills:</strong> {job.skills}
                    </p>

                    <p>
                        <strong>Posted Date:</strong> {job.postedDate}
                    </p>

                    <div className="mt-4">

                        <Link
                            to="/"
                            className="btn btn-primary">

                            Back to Home

                        </Link>

                        <Link
                            to={`/edit-job/${job.id}`}
                            className="btn btn-warning ms-2">

                            Edit Job

                        </Link>

                        <button
                            className="btn btn-danger ms-2"
                            onClick={handleDelete}>

                            Delete Job

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;