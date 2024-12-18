import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import ManageLeave from "./pages/ManageLeave";
import ManageStudents from "./pages/ManageStudents";
import LeaveOverview from "./pages/LeaveOverview";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/apply" element={<ApplyLeave />} />
        <Route path="/my-leaves" element={<MyLeaves />} />
        <Route path="/manage-leave" element={<ManageLeave />} />
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/leave-overview" element={<LeaveOverview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
