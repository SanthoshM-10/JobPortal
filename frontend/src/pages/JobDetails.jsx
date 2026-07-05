import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../services/jobService";

function JobDetails() {

    const { id } = useParams();

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

                    <h2 className="card-title">{job.title}</h2>

                    <hr />

                    <p><strong>Company:</strong> {job.company}</p>

                    <p><strong>Location:</strong> {job.location}</p>

                    <p><strong>Salary:</strong> ₹{job.salary}</p>

                    <p><strong>Experience:</strong> {job.experience} Years</p>

                    <p><strong>Job Type:</strong> {job.jobType}</p>

                    <p><strong>Description:</strong></p>

                    <p>{job.description}</p>

                    <p><strong>Skills:</strong> {job.skills}</p>

                    <p><strong>Posted Date:</strong> {job.postedDate}</p>

                    <Link
                        to="/"
                        className="btn btn-primary mt-3">

                        Back to Home

                    </Link>

                    <Link
                        to={`/edit-job/${job.id}`}
                        className="btn btn-warning ms-2">

                        Edit Job

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;