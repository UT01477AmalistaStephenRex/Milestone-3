import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State to manage success message
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    try {
      // 1. Sign up the user with Supabase Authentication and store metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // Adding name to Supabase user metadata
        },
      });

      if (authError) throw authError;

      // 2. Insert the user details into the "Users" table
      const { error: insertError } = await supabase.from("Users").insert([
        {
          email,
          name,
          role: "student", // Default role
          is_accepted: false, // Mark account as not yet approved
        },
      ]);

      if (insertError) throw insertError;

      // 3. Success message state
      setSuccess(true);
    } catch (err) {
      console.error("Sign-up error:", err.message);
      setError(err.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account ✨
        </h2>

        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-center mb-4 font-semibold">
            Your account has been created successfully and is under review. ✅
          </p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!success && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 font-semibold hover:underline transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
