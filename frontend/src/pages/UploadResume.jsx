import { useEffect, useRef, useState } from "react";
import {
    uploadResume,
    getMyResume,
    viewResume
} from "../services/resumeService";

import { toast } from "react-toastify";

function UploadResume() {

    const [file, setFile] = useState(null);
    const [resumeName, setResumeName] = useState("");
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {

        try {

            const response = await getMyResume();

            if (response.data) {
                setResumeName(response.data);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load resume."
            );


        }

    };

    const handleUpload = async () => {

        if (!file) {

            toast.warning("Please select a resume.");

            return;

        }

        if (file.type !== "application/pdf") {

            toast.warning("Only PDF files are allowed.");

            return;

        }

        if (file.size > 5 * 1024 * 1024) {

            toast.warning("Maximum file size is 5 MB.");

            return;

        }

        try {

            setLoading(true);

            const response = await uploadResume(file);

            toast.success("Resume uploaded successfully.");

            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await loadResume();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Resume upload failed."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleViewResume = async () => {

        try {

            const response = await viewResume(resumeName);

            const file = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL, "_blank");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to open resume."
            );

        }

    };

    return (

    <div
        className="container py-5"
        style={{ maxWidth: "750px" }}
    >

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            <div
                className="text-white text-center py-4"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1e40af)"
                }}
            >

                <h2 className="fw-bold mb-2">
                    Upload Resume
                </h2>

                <p className="mb-0 opacity-75">
                    Upload your latest resume to apply for jobs faster.
                </p>

            </div>

            <div className="card-body p-4">

                {

                    resumeName ?

                    (

                        <div className="alert alert-success rounded-4">

                            <h5 className="mb-3">

                                ✅ Resume Uploaded Successfully

                            </h5>

                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                <div>

                                    <strong>Current Resume</strong>

                                    <br />

                                    <span className="text-muted">

                                        {resumeName}

                                    </span>

                                </div>

                                <button
                                    className="btn btn-success rounded-pill px-4"
                                    onClick={handleViewResume}
                                >

                                    📄 View Resume

                                </button>

                            </div>

                        </div>

                    )

                    :

                    (

                        <div className="alert alert-warning rounded-4">

                            No resume uploaded yet.

                        </div>

                    )

                }

                <div className="mb-4">

                    <label className="form-label fw-semibold">

                        Select Resume (PDF Only)

                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="form-control rounded-3"
                        accept=".pdf"
                        onChange={(e)=>setFile(e.target.files[0])}
                    />

                    <small className="text-muted">

                        Maximum file size: 5 MB

                    </small>

                </div>

                {

                    file &&

                    (

                        <div
                            className="alert alert-info rounded-4"
                        >

                            <strong>Selected File:</strong>

                            <br />

                            {file.name}

                        </div>

                    )

                }

                <div className="d-grid">

                    <button
                        className="btn btn-primary btn-lg rounded-3"
                        onClick={handleUpload}
                        disabled={loading}
                    >

                        {

                            loading

                            ?

                            "Uploading..."

                            :

                            resumeName

                            ?

                            "Replace Resume"

                            :

                            "Upload Resume"

                        }

                    </button>

                </div>

            </div>

        </div>

    </div>

);

}

export default UploadResume;