import { Link } from "react-router-dom";

function JobCard({ job }) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h4>{job.title}</h4>

                <h6 className="text-primary">
                    {job.company}
                </h6>

                <p>
                    📍 {job.location}
                </p>

                <p>
                    💰 ₹{job.salary}
                </p>

                <p>
                    💼 {job.experience} Years
                </p>

                <p>
                    🧑‍💻 {job.jobType}
                </p>

                <Link
                    className="btn btn-primary"
                    to={`/jobs/${job.id}`}>

                    View Details

                </Link>

            </div>

        </div>

    );

}

export default JobCard;