import React from "react";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { displayWarningMessage } from "./utils/notify";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import JobListings from "./components/JobListings";
import Applications from "./components/Applications";
import JobDetailPage from "./components/JobDetailPage";

// PrivateRoute component

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("access");
  const navigate = useNavigate();
  const location = useLocation();
  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    displayWarningMessage(
      `You are not authenticated to access this page. Login In to Continue`
    );
    console.log("Location:", location);
    return (
      <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} />
    );
  }
}

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path="/job-search"
            element={<PrivateRoute element={<JobListings />} />}
          />
          <Route
            path="/applications"
            element={<PrivateRoute element={<Applications />} />}
          />
          <Route
        path="/job-detail/:jobid"
        element={<PrivateRoute element={<JobDetailPage />} />}
        />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
