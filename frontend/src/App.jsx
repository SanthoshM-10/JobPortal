import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/MyJobs";
import Applicants from "./pages/Applicants";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Profile from "./pages/Profile";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import SavedJobs from "./pages/SavedJobs";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* Job */}

                <Route
                    path="/add-job"
                    element={
                        <ProtectedRoute>
                            <AddJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id"
                    element={
                        <ProtectedRoute>
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-job/:id"
                    element={
                        <ProtectedRoute>
                            <EditJob />
                        </ProtectedRoute>
                    }
                />

                {/* Authentication */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/verify-otp"
                    element={<VerifyOtp />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                {/* Job Seeker */}

                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute>
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload-resume"
                    element={
                        <ProtectedRoute>
                            <UploadResume />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Recruiter */}

                <Route
                    path="/my-jobs"
                    element={
                        <ProtectedRoute>
                            <MyJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id/applicants"
                    element={
                        <ProtectedRoute>
                            <Applicants />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/saved-jobs"
                    element={
                        <ProtectedRoute>
                            <SavedJobs />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;