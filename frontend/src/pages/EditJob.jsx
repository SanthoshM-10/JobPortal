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

            toast.success("Job Updated Successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error("Failed to update Job");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Edit Job</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Company</label>
                    <input
                        className="form-control"
                        type="text"
                        name="company"
                        value={job.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Location</label>
                    <input
                        className="form-control"
                        type="text"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Salary</label>
                    <input
                        className="form-control"
                        type="number"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Experience</label>
                    <input
                        className="form-control"
                        type="number"
                        name="experience"
                        value={job.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Job Type</label>
                    <input
                        className="form-control"
                        type="text"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Skills</label>
                    <input
                        className="form-control"
                        type="text"
                        name="skills"
                        value={job.skills}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Posted Date</label>
                    <input
                        className="form-control"
                        type="date"
                        name="postedDate"
                        value={job.postedDate}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning">

                    Update Job

                </button>

            </form>

        </div>

    );

}

export default EditJob;