import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout və səhifələr
import Layout from "./components/home/Layout";
import EmployeeHomeContent from "./components/home/EmployeeHome/EmployeeHomeContent";
import EmployerHomeContent from "./components/home/EmployerHome/EmployerHomeContent";
import EmployeeJobsPage from "./pages/EmployeeJobsPage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Landing from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Companies from "./pages/CompaniesPage";
import Blog from "./pages/BlogPage";
import Favorites from "./pages/FavoritesPage";
import JobDetailsPage from "./components/home/EmployeeHome/JobDetail";

import EmployeeProfilePage from "./pages/profile/EmployeeProfile";
import EmployerProfilePage from "./pages/profile/EmployerProfile";

// 🆕 CV Detail səhifəsi
import CVDetailPage from "./components/home/EmployerHome/CVDetail";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "40px" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/job/:id", // İş detalları
    element: <JobDetailsPage />,
  },
  {
    path: "/cv/:filename", // 🆕 CV detal səhifəsi
    element: <CVDetailPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "employee-home", element: <EmployeeHomeContent /> },
      { path: "employer-home", element: <EmployerHomeContent /> },
      { path: "jobs", element: <EmployeeJobsPage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "companies", element: <Companies /> },
      { path: "blog", element: <Blog /> },
      { path: "favorites", element: <Favorites /> },
      { path: "profile/employee", element: <EmployeeProfilePage /> },
      { path: "profile/employer", element: <EmployerProfilePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
