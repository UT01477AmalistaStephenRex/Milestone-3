import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // Filters: 'all', 'accepted', 'blocked'
  const navigate = useNavigate();

  // Fetch students from Supabase
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      let query = supabase.from("Users").select("*").eq("role", "student");

      if (filter === "accepted") query = query.eq("is_accepted", true);
      if (filter === "blocked") query = query.eq("is_accepted", false);

      const { data, error } = await query;
      if (error) throw error;

      setStudents(data || []);
    } catch (err) {
      console.error("Error fetching students:", err.message);
      setError("Failed to fetch students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAcceptance = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("Users")
        .update({ is_accepted: newStatus })
        .eq("id", id);
      if (error) throw error;

      // Update local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, is_accepted: newStatus } : student
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
      setError("Failed to update student status.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-5xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-500 font-semibold mb-4 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Manage Students 👨‍🎓
        </h2>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          {["all", "accepted", "blocked"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full shadow-md font-bold text-sm ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-100"
              } transition duration-300`}
            >
              {status === "all"
                ? "All Students"
                : status === "accepted"
                ? "Accepted"
                : "Blocked"}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center mb-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center text-blue-500 font-semibold">
            Loading student records... ⏳
          </div>
        ) : students.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold">
            No students found! 🌱
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-100 transition duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {student.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full font-bold ${
                          student.is_accepted
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {student.is_accepted ? "Accepted" : "Blocked"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() =>
                          toggleAcceptance(student.id, !student.is_accepted)
                        }
                        className={`px-4 py-1 rounded-lg text-white font-semibold ${
                          student.is_accepted
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        } transition duration-300`}
                      >
                        {student.is_accepted ? "Block" : "Accept"}
                      </button>
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

export default ManageStudents;
