"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { GrUpdate } from "react-icons/gr";

export default function UpdateUser() {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setMessage("Invalid user ID");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://next-server-v1.onrender.com/api/users/${id}`
        );
        const { name, email, age } = response.data;
        setFormData({ name, email, age: age?.toString() || "" });
        setLoading(false);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { name, email, age } = formData;
    if (!name || !email || !age) {
      setMessage("All fields are required");
      return;
    }

    if (isNaN(Number(age)) || Number(age) <= 0) {
      setMessage("Please enter a valid age");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    try {
      await axios.patch(`https://next-server-v1.onrender.com/api/users/${id}`, {
        name,
        email,
        age: Number(age),
      });
      setMessage("User updated successfully");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="flex items-center justify-center mb-6">
          <GrUpdate size={30} />{" "}
          <span className="p-3 flex items-center justify-center">Update</span>
        </h1>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
