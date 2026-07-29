import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getApplicants,
    updateApplicationStatus,
    downloadResume
} from "../services/applicationService";
import { toast } from "react-toastify";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Applicants() {

    const { id } = useParams();

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchApplicants();
    }, [id]);

    const fetchApplicants = async () => {

    try {

        const response = await getApplicants(id);

        setApplicants(response.data);

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Failed to load applicants."
        );

    } finally {

        setLoading(false);

    }

};

    const updateStatus = async (applicationId, status) => {

    const confirmUpdate = window.confirm(
        `Change application status to "${status}"?`
    );

    if (!confirmUpdate) return;

    try {

        setUpdatingId(applicationId);

        const response = await updateApplicationStatus(
            applicationId,
            status
        );

        setApplicants(prev =>
            prev.map(applicant =>
                applicant.applicationId === applicationId
                    ? {
                          ...applicant,
                          status: response.data.status
                      }
                    : applicant
            )
        );

        toast.success(`Application marked as ${status}.`);

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Failed to update status."
        );

    } finally {

        setUpdatingId(null);

    }

};
    const viewResume = async (filename) => {

        try {

            const response = await downloadResume(filename);

            const file = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL);

        } catch (error) {

            console.error(error);

            toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Unable to open resume."
        );

        }

    };

    const getBadge = (status) => {

        switch (status) {

            case "APPLIED":
                return "bg-warning";

            case "SHORTLISTED":
                return "bg-info";

            case "INTERVIEW":
                return "bg-primary";

            case "SELECTED":
                return "bg-success";

            case "REJECTED":
                return "bg-danger";

            default:
                return "bg-secondary";
        }

    };

    if (loading) {

    return (

        <div className="container mt-4">

            <Skeleton
                height={40}
                width={220}
                className="mb-4"
            />

            <table className="table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Resume</th>
                        <th>Update Status</th>

                    </tr>

                </thead>

                <tbody>

                    {[...Array(5)].map((_, index) => (

                        <tr key={index}>

                            <td>
                                <Skeleton height={20}/>
                            </td>

                            <td>
                                <Skeleton height={20}/>
                            </td>

                            <td>
                                <Skeleton width={100}/>
                            </td>

                            <td>
                                <Skeleton width={120} height={35}/>
                            </td>

                            <td>
                                <Skeleton width={170} height={38}/>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

    const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(search.toLowerCase()) ||
    applicant.email.toLowerCase().includes(search.toLowerCase())
);

    return (

    <div className="container py-5">

        <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
        >

            <div
                className="text-white p-4"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Applicants
                        </h2>

                        <p className="mb-0 opacity-75">
                            Total Applicants : {filteredApplicants.length}
                        </p>

                    </div>

                    <div className="mt-3 mt-lg-0">

                        <input
                            type="text"
                            className="form-control rounded-3"
                            style={{ minWidth: "280px" }}
                            placeholder="🔍 Search applicant..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                </div>

            </div>

            <div className="card-body">

                {
                    applicants.length === 0 ?

                    (

                        <div className="alert alert-info text-center">

                            <h5>No Applicants Yet</h5>

                            <p className="mb-0">
                                Candidates who apply will appear here.
                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table align-middle table-hover">

                                <thead
                                    className="table-light"
                                >

                                    <tr>

                                        <th>Applicant</th>

                                        <th>Email</th>

                                        <th>Status</th>

                                        <th>Resume</th>

                                        <th width="220">

                                            Update Status

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredApplicants.map(applicant => (

                                            <tr
                                                key={applicant.applicationId}
                                            >

                                                <td>

                                                    <div className="fw-semibold">

                                                        {applicant.name}

                                                    </div>

                                                </td>

                                                <td>

                                                    <span className="text-muted">

                                                        {applicant.email}

                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${getBadge(applicant.status)}`}
                                                    >

                                                        {applicant.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    {

                                                        applicant.resumeUrl ?

                                                        (

                                                            <button
                                                                className="btn btn-outline-dark btn-sm rounded-pill"
                                                                onClick={() =>
                                                                    viewResume(
                                                                        applicant.resumeUrl
                                                                    )
                                                                }
                                                            >

                                                                📄 View Resume

                                                            </button>

                                                        )

                                                        :

                                                        (

                                                            <span className="text-muted">

                                                                No Resume

                                                            </span>

                                                        )

                                                    }

                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select rounded-3"
                                                        value={applicant.status}
                                                        disabled={updatingId===applicant.applicationId}
                                                        onChange={(e)=>

                                                            updateStatus(
                                                                applicant.applicationId,
                                                                e.target.value
                                                            )

                                                        }
                                                    >

                                                        <option value="APPLIED">
                                                            Applied
                                                        </option>

                                                        <option value="SHORTLISTED">
                                                            Shortlisted
                                                        </option>

                                                        <option value="INTERVIEW">
                                                            Interview
                                                        </option>

                                                        <option value="SELECTED">
                                                            Selected
                                                        </option>

                                                        <option value="REJECTED">
                                                            Rejected
                                                        </option>

                                                    </select>

                                                    {

                                                        updatingId===applicant.applicationId &&

                                                        <small className="text-primary">

                                                            Updating...

                                                        </small>

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

                }

            </div>

        </div>

    </div>

);

}

export default Applicants;