import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs, searchJobs } from "../services/jobService";
import { getMyApplications } from "../services/applicationService";

function Home() {

    const [jobs, setJobs] = useState([]);

    const [appliedJobs, setAppliedJobs] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [location, setLocation] = useState("");

    const [jobType, setJobType] = useState("");

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);

    const [size] = useState(6);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

    const timer = setTimeout(() => {

        if (
            keyword === "" &&
            location === "" &&
            jobType === ""
        ) {

            fetchJobs();

        } else {

            performSearch();

        }

    }, 700);

    return () => clearTimeout(timer);

}, [keyword, location, jobType, page]);

    useEffect(() => {

    if (localStorage.getItem("role") === "JOB_SEEKER") {

        fetchAppliedJobs();

    }

}, []);

    const fetchJobs = async () => {

        try {

            setLoading(true);

            const response = await searchJobs(
                "",
                "",
                "",
            page,
                size
            );

            setJobs(response.data.content);

            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const fetchAppliedJobs = async () => {

    try {

        const response = await getMyApplications();

        console.log("Applications:", response.data);

        const ids = response.data.map(app => app.jobId);

        console.log("IDs:", ids);

        setAppliedJobs(ids);

    } catch (error) {

        console.error(error);

    }

};
    const performSearch = async () => {

        try {

            setLoading(true);

            const response = await searchJobs(
                keyword,
                location,
                jobType,
                page,
                size
            );

            setJobs(response.data.content);

            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const previousPage = () => {

        if (page > 0) {

            setPage(page - 1);

        }

    };

    const nextPage = () => {

        if (page < totalPages - 1) {

            setPage(page + 1);

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

                <h4 className="mt-3">

                    Loading Jobs...

                </h4>

            </div>

        );

    }

        return (

        <div className="container mt-4">

            <div className="text-center mb-4">

                <h1 className="fw-bold">

                    Job Portal

                </h1>

                <p className="text-muted">

                    Find your dream job here.

                </p>

            </div>

            {/* Search Filters */}

            <div className="card shadow-sm p-4 mb-4">

                <div className="row g-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search jobs..."
                            value={keyword}
                            onChange={(e) => {

                                setKeyword(e.target.value);

                                setPage(0);

                            }}
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={location}
                            onChange={(e) => {

                                setLocation(e.target.value);

                                setPage(0);

                            }}
                        >

                            <option value="">
                                All Locations
                            </option>

                            <option value="Hyderabad">
                                Hyderabad
                            </option>

                            <option value="Bangalore">
                                Bangalore
                            </option>

                            <option value="Chennai">
                                Chennai
                            </option>

                            <option value="Pune">
                                Pune
                            </option>

                            <option value="Mumbai">
                                Mumbai
                            </option>

                            <option value="Delhi">
                                Delhi
                            </option>

                        </select>

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={jobType}
                            onChange={(e) => {

                                setJobType(e.target.value);

                                setPage(0);

                            }}
                        >

                            <option value="">
                                All Job Types
                            </option>

                            <option value="Full Time">
                                Full Time
                            </option>

                            <option value="Part Time">
                                Part Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {

                jobs.length === 0 ?

                    (

                        <div className="text-center mt-5">

                            <h3>

                                No Jobs Found

                            </h3>

                            <p className="text-muted">

                                Try another search.

                            </p>

                        </div>

                    )

                    :

                    (

                        <>

                            <div className="row">

                                {

                                    jobs.map(job => (

                                        <div
                                            key={job.id}
                                            className="col-lg-6 mb-4"
                                        >

                                            <JobCard
                                                job={job}
                                                appliedJobs={appliedJobs}
                                            />

                                        </div>

                                    ))

                                }

                            </div>

                            {

                                totalPages > 1 &&

                                <div className="d-flex justify-content-center align-items-center mt-4">

                                    <button
                                        className="btn btn-outline-primary me-3"
                                        disabled={page === 0}
                                        onClick={previousPage}
                                    >

                                        Previous

                                    </button>

                                    <span className="fw-bold">

                                        Page {page + 1} of {totalPages}

                                    </span>

                                    <button
                                        className="btn btn-outline-primary ms-3"
                                        disabled={page >= totalPages - 1}
                                        onClick={nextPage}
                                    >

                                        Next

                                    </button>

                                </div>

                            }

                        </>

                    )

            }

        </div>

    );

}

export default Home;