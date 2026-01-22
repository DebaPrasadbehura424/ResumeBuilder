import { useState } from "react";
import type React from "react";
import { NavLink } from "react-router-dom";
import { Input } from "../components/Input";

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login Success:", data);

      // ✅ Save token
      localStorage.setItem("token", data.token);
    } catch (error: any) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="EMAIL"
          size="lg"
        />

        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="PASSWORD"
          size="lg"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <NavLink
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create new account
          </NavLink>
        </p>
      </form>
    </div>
  );
};
