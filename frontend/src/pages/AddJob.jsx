import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";
import { toast } from "react-toastify";

function AddJob() {

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        description: "",
        skills: "",
        postedDate: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createJob(job);

            toast.success("Job Added Successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);
            toast.error("Failed to add Job");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Add New Job</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={job.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input
                        type="number"
                        className="form-control"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Experience</label>
                    <input
                        type="number"
                        className="form-control"
                        name="experience"
                        value={job.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Job Type</label>
                    <input
                        type="text"
                        className="form-control"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <input
                        type="text"
                        className="form-control"
                        name="skills"
                        value={job.skills}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Posted Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="postedDate"
                        value={job.postedDate}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success">

                    Save Job

                </button>

            </form>

        </div>

    );

}

export default AddJob;