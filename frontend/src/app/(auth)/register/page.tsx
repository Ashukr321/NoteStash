"use client"
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    UserName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 relative px-4">
      {/* Home Icon */}
      <button
        className="absolute top-6 left-6 p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
        onClick={() => router.push('/')}
        aria-label="Go Home"
      >
        <FaHome size={24} className="text-blue-600" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Create your NoteStash account</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="UserName" className="text-sm font-medium text-gray-700">Username</label>
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
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
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
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
