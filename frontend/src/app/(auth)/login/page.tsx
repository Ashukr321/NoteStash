"use client";
import React, { useEffect, useState } from "react";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import userServices from "@/services/users/users.services";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { strict } from "assert";
import path from "path";
const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const resData = await userServices.loginUser(form);
      if (resData.success && resData.token) {
        Cookies.set("token", resData.token, {
          expires: 7,
          secure: true,
          path: "/",
        });
        toast.success(resData.message);
      }
      if (!resData.success) {
        toast.error(resData.message);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 relative px-4">
      {/* Home Icon */}
      <button
        className="absolute top-6 left-6 p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
        onClick={() => router.push("/")}
        aria-label="Go Home"
      >
        <FaHome size={24} className="text-blue-600" />
      </button>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-blue-100 transition-all duration-700 ${
          animate ? "animate-fadeInUp" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Login to NoteStash
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all"
        >
          Login
        </button>
        <div className="text-center mt-2 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </a>
        </div>
      </form>
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LoginPage;
