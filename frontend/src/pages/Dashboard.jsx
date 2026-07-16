import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load dashboard.");

        } finally {

            setLoading(false);

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

            </div>

        );

    }

    return (

    <div className="container mt-4">

        <h2 className="mb-4 fw-bold">
            Recruiter Dashboard
        </h2>

        <div className="row g-4">

    <DashboardCard
        title="Jobs Posted"
        value={dashboard.totalJobs}
        color="primary"
    />

    <DashboardCard
        title="Applicants"
        value={dashboard.totalApplicants}
        color="success"
    />

    <DashboardCard
        title="Applied"
        value={dashboard.applied}
        color="warning"
    />

    <DashboardCard
        title="Shortlisted"
        value={dashboard.shortlisted}
        color="info"
    />

    <DashboardCard
        title="Interview"
        value={dashboard.interview}
        color="secondary"
    />

    <DashboardCard
        title="Selected"
        value={dashboard.selected}
        color="success"
    />

    <DashboardCard
        title="Rejected"
        value={dashboard.rejected}
        color="danger"
    />

</div>

        {/* Recent Jobs */}

        <div className="mt-5">

            <h3 className="mb-3">
                Recent Jobs
            </h3>

            {
                !dashboard.recentJobs || dashboard.recentJobs.length === 0 ?

                    (

                        <div className="alert alert-info">

                            No jobs posted yet.

                        </div>

                    )

                    :

                    (

                        <table className="table table-hover shadow">

                            <thead className="table-dark">

                            <tr>

                                <th>Job Title</th>

                                <th>Company</th>

                                <th>Applicants</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                dashboard.recentJobs.map(job => (

                                    <tr key={job.id}>

                                        {/* <td>{job.title}</td> */}

                                        <td>
                                            <Link
                                                to={`/jobs/${job.id}`}
                                                className="text-decoration-none fw-semibold"
                                            >
                                                {job.title}
                                            </Link>
                                        </td>

                                        <td>{job.company}</td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {job.applicants}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            }

                            </tbody>

                        </table>

                    )

            }

        </div>

    </div>

);

}

function DashboardCard({ title, value, color }) {

    return (

        <div className="col-lg-3 col-md-6">

            <div className={`card border-${color} shadow`}>

                <div className="card-body text-center">

                    <h5 className={`text-${color}`}>
                        {title}
                    </h5>

                    <h2 className="fw-bold">
                        {value}
                    </h2>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;