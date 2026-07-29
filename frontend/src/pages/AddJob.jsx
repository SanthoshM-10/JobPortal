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

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add Job"
            );

        }

    };

    return (

    <div
        className="container py-5"
        style={{ maxWidth: "850px" }}
    >

        <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
        >

            <div
                className="text-center text-white py-4"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >

                <h2 className="fw-bold mb-2">
                    Create New Job
                </h2>

                <p className="mb-0 opacity-75">
                    Fill in the details to publish a new job opening.
                </p>

            </div>

            <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Job Title
                            </label>

                            <input
                                type="text"
                                className="form-control rounded-3"
                                placeholder="Software Engineer"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Company
                            </label>

                            <input
                                type="text"
                                className="form-control rounded-3"
                                placeholder="Google"
                                name="company"
                                value={job.company}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Location
                            </label>

                            <input
                                type="text"
                                className="form-control rounded-3"
                                placeholder="Hyderabad"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Job Type
                            </label>

                            <select
                                className="form-select rounded-3"
                                name="jobType"
                                value={job.jobType}
                                onChange={handleChange}
                            >
                                <option value="">Select Job Type</option>
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Internship</option>
                                <option>Contract</option>
                                <option>Remote</option>
                            </select>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Salary
                            </label>

                            <input
                                type="number"
                                className="form-control rounded-3"
                                placeholder="600000"
                                name="salary"
                                value={job.salary}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-4">

                            <label className="form-label fw-semibold">
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                className="form-control rounded-3"
                                placeholder="2"
                                name="experience"
                                value={job.experience}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Skills Required
                        </label>

                        <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Java, Spring Boot, React"
                            name="skills"
                            value={job.skills}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Job Description
                        </label>

                        <textarea
                            rows="6"
                            className="form-control rounded-3"
                            placeholder="Describe the job responsibilities..."
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Posted Date
                        </label>

                        <input
                            type="date"
                            className="form-control rounded-3"
                            name="postedDate"
                            value={job.postedDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="d-grid">

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg rounded-3"
                        >
                            Publish Job
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

);

}

export default AddJob;