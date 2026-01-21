import { useState } from "react";
import type React from "react";
import { Input } from "../components/Input";

interface Formdata {
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState<Formdata>({
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-sm text-gray-500">We’d love to hear from you</p>
        </div>

        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          size="lg"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="w-full border outline-none rounded-lg px-3 py-2  focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
