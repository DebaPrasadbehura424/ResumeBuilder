import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResumeNavBar from "../components/ResumeNavBar";

function All_resume() {
  const [viewMode, setViewMode] = useState("card");
  const [data, setData] = useState("");
  const [resumes, setResumes] = useState([]);
  const [email, setEmail] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  async function generateEmail(token) {
    try {
      const res = await axios.get(
        "http://localhost:7878/api/resumer/getDataByToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const emailFromToken = res.data.user.email;
      setEmail(emailFromToken);
    } catch (error) {
      console.error("Failed to fetch email from token:", error);
    }
  }

  async function getAllResumes() {
    try {
      const res = await axios.get(
        `http://localhost:7878/api/resumerCreate/getResumes?email=${email}`,
      );
      setResumes(res.data.data || []);
    } catch (err) {
      setResumes([]);
    }
  }

  async function deleteResume(id) {
    try {
      await axios.delete(
        `http://localhost:7878/api/resumerCreate/deleteResume`,
        {
          data: {
            userEmail: email,
            id: id,
          },
        },
      );
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
    } catch (err) {
      console.error("Failed to delete resume:", err);
    }
  }

  useEffect(() => {
    generateEmail(token);
  }, [token]);

  useEffect(() => {
    if (email) {
      getAllResumes();
    }
  }, [email]);

  const handleCardClick = (id) => {
    navigate(`/resume/${id}`);
  };
  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setData(text);
    if (text === "") {
      getAllResumes();
    } else {
      setResumes((prevResumes) =>
        prevResumes.filter((resume) =>
          resume.name.toLowerCase().includes(text),
        ),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResumeNavBar />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resumes..."
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={handleSearch}
                value={data}
              />
              <svg
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-md ${
                viewMode === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              } hover:bg-blue-500 hover:text-white transition-all duration-200`}
              aria-label="Card View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              } hover:bg-blue-500 hover:text-white transition-all duration-200`}
              aria-label="List View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/selectResume")}
              className="bg-blue-600 dark:bg-blue-500 cursor-pointer text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create New</span>
            </button>
          </div>
        </div>

        <div
          className={`grid ${
            viewMode === "card"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-6`}
        >
          {Array.isArray(resumes) &&
            resumes.map((resume, index) => (
              <div
                key={resume._id || index}
                onClick={() => handleCardClick(resume._id)}
                className={`cursor-pointer bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 p-5 ${
                  viewMode === "list" ? "flex items-center space-x-4" : ""
                }`}
              >
                <img
                  src={`http://localhost:7878/${resume.profilePhoto}`}
                  alt={resume.name}
                  className={`${
                    viewMode === "card" ? "w-16 h-16" : "w-12 h-12"
                  } rounded-full object-cover border border-gray-300 dark:border-gray-600`}
                />
                <div className={viewMode === "card" ? "mt-4" : "flex-1"}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {resume.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {resume.headline}
                  </p>
                  <div className="mt-3 flex space-x-4">
                    <a
                      href={resume.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={resume.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // it helps to prevent call to reach parent element yoyo
                      deleteResume(resume._id);
                    }}
                    className="mt-4 inline-block bg-gradient-to-r cursor-pointer from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-sm font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // it helps to prevent call to reach parent element yoyo
                      navigate(`/editResume/${resume._id}`);
                    }}
                    className="mt-4 ml-4 inline-block bg-gradient-to-r cursor-pointer from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white text-sm font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default All_resume;
