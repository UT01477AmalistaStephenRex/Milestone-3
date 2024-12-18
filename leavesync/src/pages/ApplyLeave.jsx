import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch authenticated user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (data.user) {
        setUser(data.user); // Set the user object
      } else {
        setError("Failed to fetch user. Please log in again.");
      }
    } catch (err) {
      console.error("User fetch error:", err.message);
      setError("Unable to fetch user data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setError("");

    if (!user) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Insert leave request into Supabase "leaves" table
      const { error } = await supabase.from("Leaves").insert([
        {
          start_date: startDate,
          total_days: parseInt(totalDays, 10),
          leave_reason: leaveReason,
          user_email: user.email, // Using user.id from Supabase auth
        },
      ]);

      if (error) throw error;

      setSuccessMessage("🎉 Your leave has been successfully recorded! 🎊");
      setStartDate("");
      setTotalDays("");
      setLeaveReason("");
      navigate("/my-leaves");
    } catch (err) {
      console.error("Error submitting leave:", err.message);
      setError("❌ Failed to record leave. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 font-semibold mb-4 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Apply for Leave 📝
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="text-center mb-4 text-green-500 font-semibold">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Total Days
            </label>
            <input
              type="number"
              min="1"
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Leave Reason
            </label>
            <textarea
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="Enter the reason for leave"
              rows="3"
              required
              className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            ></textarea>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center text-blue-500 font-semibold">
              Processing your request... ⏳
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
            >
              Submit Leave Request 🚀
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
