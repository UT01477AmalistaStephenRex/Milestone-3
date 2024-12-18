import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Dashboard = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    role: "",
  };

  const handleSignOut = async () => {
    try {
      // Sign out from Supabase Auth
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 flex flex-col items-center p-8">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Welcome, {user.name}! 🎉
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Manage your tasks and leaves efficiently.
        </p>

        {/* Big Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {user.role === "student" && (
            <>
              <button
                onClick={() => navigate("/apply")}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              >
                Apply for a Leave 📝
              </button>

              <button
                onClick={() => navigate("/my-leaves")}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              >
                View My Leaves 📄
              </button>
            </>
          )}
          {user.role !== "student" && (
            <button
              onClick={() => navigate("/leave-overview")}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Leave Overview 📊
            </button>
          )}

          {user.role !== "student" && (
            <button
              onClick={() => navigate("/manage-students")}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Manage Students 👩‍🎓
            </button>
          )}
          {user.role !== "student" && (
            <button
              onClick={() => navigate("/manage-leave")}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-lg font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Manage Leave ✅
            </button>
          )}
        </div>

        {/* Sign Out Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Sign Out 🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
