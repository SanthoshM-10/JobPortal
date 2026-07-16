import { useEffect, useRef, useState } from "react";
import {
    uploadResume,
    getMyResume,
    viewResume
} from "../services/resumeService";

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

            console.error(error);

        }

    };

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a resume.");

            return;

        }

        if (file.type !== "application/pdf") {

            alert("Only PDF files are allowed.");

            return;

        }

        if (file.size > 5 * 1024 * 1024) {

            alert("Maximum file size is 5 MB.");

            return;

        }

        try {

            setLoading(true);

            const response = await uploadResume(file);

            alert("Resume uploaded successfully.");

            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await loadResume();

        } catch (error) {

            console.error(error);

            alert("Resume upload failed.");

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

            alert("Unable to open resume.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Upload Resume
                </h2>

                {

                    resumeName ? (

                        <div className="alert alert-success">

                            <h5>✅ Resume Uploaded</h5>

                            <p className="mb-2">

                                <strong>Current Resume:</strong>

                            </p>

                            <div className="d-flex align-items-center gap-3 flex-wrap">

                                <span>{resumeName}</span>

                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={handleViewResume}
                                >
                                    View Resume
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="alert alert-warning">

                            No resume uploaded yet.

                        </div>

                    )

                }

                <input
                    ref={fileInputRef}
                    type="file"
                    className="form-control mb-3"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {

                    file && (

                        <div className="mb-3 text-success">

                            Selected File:
                            <strong> {file.name}</strong>

                        </div>

                    )

                }

                <button
                    className="btn btn-primary"
                    onClick={handleUpload}
                    disabled={loading}
                >

                    {

                        loading
                            ? "Uploading..."
                            : resumeName
                                ? "Replace Resume"
                                : "Upload Resume"

                    }

                </button>

            </div>

        </div>

    );

}

export default UploadResume;