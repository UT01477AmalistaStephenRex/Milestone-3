import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

const LeaveOverview = () => {
  const [leaveOverview, setLeaveOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const TOTAL_SCHOOL_DAYS = 210; // Total school days in a year

  // Fetch all leave records and aggregate leave days per student
  const fetchLeaveOverview = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: leaves, error } = await supabase
        .from("Leaves")
        .select("user_email, total_days");

      if (error) throw error;

      const leaveMap = {};

      // Aggregate total leave days per student
      leaves.forEach((leave) => {
        const { user_email, total_days } = leave;

        if (!leaveMap[user_email]) leaveMap[user_email] = 0;
        leaveMap[user_email] += total_days;
      });

      // Convert the map to an array and sort in ascending order
      const aggregatedData = Object.entries(leaveMap)
        .map(([email, total]) => ({ email, total_days: total }))
        .sort((a, b) => a.total_days - b.total_days);

      setLeaveOverview(aggregatedData);
    } catch (err) {
      console.error("Error fetching leave overview:", err.message);
      setError("Failed to fetch leave overview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Small Pie Chart Data
  const getPieChartData = (leaveDays) => {
    return {
      labels: ["Leave Days", "School Days Attended"],
      datasets: [
        {
          data: [leaveDays, TOTAL_SCHOOL_DAYS - leaveDays],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
  };

  // Bar Chart Data for All Students
  const getBarChartData = () => {
    return {
      labels: leaveOverview.map((student) => student.email),
      datasets: [
        {
          label: "Total Leave Days",
          data: leaveOverview.map((student) => student.total_days),
          backgroundColor: "#FF9F40",
          borderColor: "#FF6384",
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    fetchLeaveOverview();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-400 to-orange-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-5xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 font-semibold mb-4 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Leave Overview 📊
        </h2>

        {/* Error */}
        {error && (
          <div className="text-center mb-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold">
            Loading leave records... ⏳
          </div>
        ) : leaveOverview.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold">
            No leave records found! 🌱
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Student Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Total Leave Days
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Leave Overview
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {leaveOverview.map((student, index) => (
                    <tr
                      key={index}
                      className="hover:bg-yellow-100 transition duration-200"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {student.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {student.total_days}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="w-16 h-16 mx-auto">
                          <Pie data={getPieChartData(student.total_days)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Students' Total Leave Days Bar Chart
              </h3>
              <div className="w-full h-96">
                <Bar data={getBarChartData()} options={{ responsive: true }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveOverview;
