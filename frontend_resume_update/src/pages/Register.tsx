import { useState } from "react";
import type React from "react";
import { NavLink } from "react-router-dom";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  // const backurl = "https://resumebuilderbackend-alpha.vercel.app";
  const backurl = "http://localhost:9090";

  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
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
      const res = await fetch(`${backurl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Register Success:", data);

      sessionStorage.setItem("token", data.token);
      navigate("/dash_board");
    } catch (error: any) {
      console.error("Register Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500">Join us in just a few steps</p>
        </div>

        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          size="lg"
        />

        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          size="lg"
        />

        <Input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          size="lg"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already a user?{" "}
          <NavLink
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};
