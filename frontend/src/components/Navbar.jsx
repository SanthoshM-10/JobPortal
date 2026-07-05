import { Link } from "react-router-dom";

function Navbar() {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Job Portal
                </Link>

                <div>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/"
                    >
                        Home
                    </Link>

                    <Link
                        className="btn btn-primary"
                        to="/add-job"
                    >
                        Add Job
                    </Link>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;