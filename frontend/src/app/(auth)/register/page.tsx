"use client";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import userServices from "@/services/users/users.services";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegisterPage = () => {

  const router = useRouter();
  const [form, setForm] = useState({
    UserName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resData = await userServices.registerUser(form);
      if (resData.success) {
        toast.success(resData.message);
        router.push("/login");
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
        className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Create your NoteStash account
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="UserName"
            className="text-sm font-medium text-gray-700"
          >
            UserName
          </label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={form.UserName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-semibold"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
