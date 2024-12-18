import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndLeaves = async () => {
      try {
        // Fetch the current user
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const currentUser = userData.user;
        if (!currentUser) {
          setError("User not authenticated. Please log in again.");
          setLoading(false);
          return;
        }

        setUserEmail(currentUser.email);

        // Fetch leaves using email instead of user_id
        const { data: leaveData, error: leaveError } = await supabase
          .from("Leaves")
          .select("*")
          .eq("user_email", currentUser.email); // Ensure 'user_email' matches in DB

        if (leaveError) throw leaveError;

        setLeaves(leaveData || []);
      } catch (err) {
        console.error("Error:", err.message);
        setError("❌ An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndLeaves();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-300 to-blue-400 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 font-semibold mb-4 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          My Leaves 📋
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold">
            Loading your leave records... ⏳
          </div>
        ) : leaves.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold">
            No leaves applied yet! 🌱
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
              {/* Table Header */}
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Leave ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Start Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Total Days
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Reason
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-blue-100 transition duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {leave.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {leave.start_date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {leave.total_days}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {leave.leave_reason}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 font-semibold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {leave.status || "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLeaves;
