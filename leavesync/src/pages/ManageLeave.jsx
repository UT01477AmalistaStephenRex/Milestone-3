import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const ManageLeave = () => {
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalData, setModalData] = useState(null); // For Approve or Reject
  const [rejectReason, setRejectReason] = useState(""); // Rejection reason state
  const navigate = useNavigate();

  // Fetch all leaves on page load
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Fetch leaves
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Leaves")
        .select("*,Users(*)");
      if (error) throw error;
      setLeaves(data || []);
    } catch (err) {
      console.error("Error fetching leaves:", err.message);
      setError("Failed to fetch leave records.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user names and map them to user IDs

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from("Leaves")
        .update({ status: "approved" })
        .eq("id, User(*)", modalData.id);
      if (error) throw error;

      closeModal();
      fetchLeaves();
    } catch (err) {
      console.error("Error accepting leave:", err.message);
    }
  };

  const handleReject = async () => {
    try {
      const { error } = await supabase
        .from("Leaves")
        .update({ status: "rejected", reject_reason: rejectReason })
        .eq("id", modalData.id);
      if (error) throw error;

      closeModal();
      fetchLeaves();
    } catch (err) {
      console.error("Error rejecting leave:", err.message);
    }
  };

  const closeModal = () => {
    setModalData(null);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-blue-300 to-purple-400 p-6 flex justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-6xl">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            ← Back
          </button>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Manage Leaves 📋✨
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold">
            Loading leave records... ⏳
          </div>
        ) : leaves.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold">
            No leaves available to manage. 🌱
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">Leave ID</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">Total Days</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Rejection Reason</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{leave.id}</td>
                  <td className="border px-4 py-2">
                    {leave.Users.name || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">{leave.start_date}</td>
                  <td className="border px-4 py-2">{leave.total_days}</td>
                  <td className="border px-4 py-2">{leave.leave_reason}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      leave.status === "approved"
                        ? "text-green-600"
                        : leave.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.status || "Pending"}
                  </td>
                  <td className="border px-4 py-2">
                    {leave.reject_reason || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {leave.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setModalData({ ...leave, type: "accept" })
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Approve ✅
                        </button>
                        <button
                          onClick={() =>
                            setModalData({ ...leave, type: "reject" })
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Reject ❌
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Approve/Reject Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {modalData.type === "accept"
                ? "Confirm Approve ✅"
                : "Enter Rejection Reason ❌"}
            </h3>
            {modalData.type === "reject" && (
              <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={
                  modalData.type === "accept" ? handleApprove : handleReject
                }
                className={`px-4 py-2 rounded text-white ${
                  modalData.type === "accept"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {modalData.type === "accept" ? "Approve ✅" : "Reject ❌"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeave;
