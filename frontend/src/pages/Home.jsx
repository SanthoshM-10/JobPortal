import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
function Home() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const response = await getAllJobs();
            setJobs(response.data);

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="container mt-4">

            <h2>Available Jobs</h2>

            {
                jobs.length === 0 ? (

                <h4 className="text-center mt-5">
                    No Jobs Available
                 </h4>

            ) : (

                jobs.map(job => (
                    <JobCard key={job.id} job={job} />
             ))

    )
}

        </div>
    );
}

export default Home;