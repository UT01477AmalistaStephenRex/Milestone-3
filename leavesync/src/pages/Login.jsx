import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Login with Supabase
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      const user = loginData.user;

      // 2. Check if the user exists in the "Users" table
      const { data, error: userError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email)
        .single(); // Single ensures we only fetch one record

      if (userError) throw userError;

      if (!data) {
        // No user found, log out
        await supabase.auth.signOut();
        setError("No user found with this email.");
        return;
      }

      // 3. Check if the user is approved
      if (!data.is_accepted) {
        await supabase.auth.signOut();
        setError("This user is blocked by admin.");
        return;
      }

      // 4. Store user in localStorage and redirect
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Failed to log in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login to Dashboard 🚀
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-6 text-gray-600">
            Dont have an account?{" "}
            <button
              onClick={() => navigate("/sign-up")}
              className="text-blue-500 font-semibold hover:underline transition duration-300"
            >
              Sing up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
