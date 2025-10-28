import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });
      return;
    }

    try {
      // Send login request to backend
      const res = await axios.post("http://foodify-backend2.vercel.app/api/auth/login", {

        email,
        password,
      });

      // Save token and user name in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      toast.success(res.data.message || "Login Successful!", {
        position: "top-center",
        autoClose: 2000,
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });

      // Redirect to home page after successful login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err.response?.data); // debug backend errors
      toast.error(
        err.response?.data?.error || "Login failed. Try again.",
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
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#FF9B00]">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#FF9B00] text-white py-2 rounded hover:bg-[#e68a00] transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#FF9B00] font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
