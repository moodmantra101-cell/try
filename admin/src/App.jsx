import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Patients from "./pages/Admin/Patients";
import PatientReports from "./pages/Admin/PatientReports";
import Testimonials from "./pages/Admin/Testimonials";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import MyPatients from "./pages/Doctor/MyPatients";
import PatientsReports from "./pages/Doctor/MyPatientsReports";
import MyPatientsReports from "./pages/Doctor/MyPatientsReports";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div>
      <ToastContainer
        theme="colored"
        className="scale-95 mt-2 sm:scale-100 sm:mt-14"
      />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Root route */}
          <Route
            path="/"
            element={aToken ? <Dashboard /> : <DoctorDashboard />}
          />

          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient-reports" element={<PatientReports />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/my-patients" element={<MyPatients />} />
          <Route path="/my-patient-reports" element={<MyPatientsReports />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer position="top-center" theme="colored" />
    </>
  );
};

export default App;
