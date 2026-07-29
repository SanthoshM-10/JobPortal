import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import { toast } from "react-toastify";
function EditJob() {

    const { id } = useParams();

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

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {

        try {

            const response = await getJobById(id);
            setJob(response.data);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load job details."
            );

        }

    };

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateJob(id, job);

            toast.success("Job updated successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update job."
            );

        }

    };

    return (

    <div
        className="container py-5"
        style={{ maxWidth: "850px" }}
    >

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            <div
                className="text-center text-white py-4"
                style={{
                    background: "linear-gradient(135deg,#f59e0b,#d97706)"
                }}
            >

                <h2 className="fw-bold mb-2">
                    Edit Job
                </h2>

                <p className="mb-0 opacity-75">
                    Update the job information and save your changes.
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

                    <div className="d-flex gap-3">

                        <button
                            type="button"
                            className="btn btn-outline-secondary flex-fill"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-warning flex-fill text-white"
                        >
                            Update Job
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </div>

);

}

export default EditJob;