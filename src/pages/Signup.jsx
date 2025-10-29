import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState(""); // Name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });
      return;
    }

    try {
      // Send signup data to backend
      const res = await axios.post("https://foodify-backend2.vercel.app/api/auth/signup", {
        name,
        email,
        password,
      });

      toast.success(res.data.message || "Signup Successful!", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });

      // Redirect to login page after signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response?.data); // Debug backend response
      toast.error(
        err.response?.data?.error || "Signup failed. Try again.",
        {
          position: "top-center",
          autoClose: 2000,
          style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFF7E6]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#FF9B00]">Signup</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#FF9B00] text-white py-2 rounded hover:bg-[#e68a00] transition-colors"
        >
          Signup
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#FF9B00] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
