import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/add-job" element={<AddJob />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/edit-job/:id" element={<EditJob />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;