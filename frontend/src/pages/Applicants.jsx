import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getApplicants,
    updateApplicationStatus,
    downloadResume
} from "../services/applicationService";
import { toast } from "react-toastify";

function Applicants() {

    const { id } = useParams();

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplicants();
    }, [id]);

    const fetchApplicants = async () => {

    try {

        const response = await getApplicants(id);

        setApplicants(response.data);

    } catch (error) {

        console.error(error);

        toast.error("Failed to load applicants.");

    } finally {

        setLoading(false);

    }

};

    const updateStatus = async (applicationId, status) => {

    try {

        const response = await updateApplicationStatus(
            applicationId,
            status
        );

        // Update the UI immediately
        setApplicants(prevApplicants =>
            prevApplicants.map(applicant =>
                applicant.applicationId === applicationId
                    ? {
                          ...applicant,
                          status: response.data.status
                      }
                    : applicant
            )
        );

        toast.success("Status updated successfully!");

    } catch (error) {

        console.error(error);

        toast.error("Failed to update status.");

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

            toast.error("Unable to open resume.");

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

            <div className="container mt-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4 fw-bold">
                Applicants
            </h2>

            {

                applicants.length === 0 ?

                    (

                        <div className="alert alert-info">

                            No applicants found.

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive">

                            <table className="table table-hover shadow">

                                <thead className="table-dark">

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Status</th>

                                    <th>Resume</th>

                                    <th>Update Status</th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    applicants.map(applicant => (

                                        <tr
                                            key={applicant.applicationId}
                                        >

                                            <td>

                                                {applicant.name}

                                            </td>

                                            <td>

                                                {applicant.email}

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${getBadge(applicant.status)}`}
                                                >

                                                    {applicant.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    applicant.resumeUrl ?

                                                        (

                                                            <button
                                                                className="btn btn-dark btn-sm"
                                                                onClick={() =>
                                                                    viewResume(
                                                                        applicant.resumeUrl
                                                                    )
                                                                }
                                                            >

                                                                View Resume

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
                                                    className="form-select form-select-sm"
                                                    value={applicant.status}
                                                    onChange={(e) =>
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

    );

}

export default Applicants;