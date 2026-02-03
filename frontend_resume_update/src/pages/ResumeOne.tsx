import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Resume {
  _id: string;
  basic_info?: {
    fullname?: string;
    email?: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
  };
  summary?: string;
  skills?: string[];
  education?: {
    collage_name?: string;
    yog?: string;
    cgpa?: string;
  }[];
  projects?: {
    project_name?: string;
    tech_stack?: string[];
    githublink?: string;
    livelink?: string;
  }[];
}

export const ResumeOne: React.FC = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<any>({});
  const [jd, setJd] = useState("");

  const { id } = useParams();

  // Fetch Resume
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:9090/api/resume/getone/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setResume(res.data || null))
      .catch((err) => console.error("Error fetching resume", err))
      .finally(() => setLoading(false));
  }, [id]);

  // AI Match Score
  const handleAi = async () => {
    if (!jd.trim()) {
      alert("Please fill the job description field first");
      return;
    }
    const resumeBody = resume?.summary || "";
    try {
      const res = await axios.post(
        "https://resumebuilder-578b.onrender.com/analyze",
        {
          resume: resumeBody,
          jd,
        },
      );
      setShow((prev: any) => ({ ...prev, ...res.data }));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // AI Resume Enhancement
  const handleEnhancing = async () => {
    const resumeBody = resume?.summary || "";
    try {
      const res = await axios.post(
        "https://resumebuilder-578b.onrender.com/improve_summary",
        {
          resume: resumeBody,
        },
      );
      setShow((prev: any) => ({ ...prev, ...res.data }));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading resume...</p>;
  if (!resume)
    return (
      <div className="text-center mt-10 text-gray-500">
        <p className="text-xl font-semibold">No resume found</p>
        <p>Please create a resume first.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Resume Card */}
      <div className="bg-white shadow-md rounded-xl border p-6 space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {resume.basic_info?.fullname || "Unnamed User"}
          </h2>
          <p className="text-gray-600">
            {resume.basic_info?.email || "No email provided"}
          </p>
          <p className="text-gray-600">
            📍 {resume.basic_info?.city || "City"},{" "}
            {resume.basic_info?.state || "State"},{" "}
            {resume.basic_info?.country || "Country"}
          </p>
        </div>

        {/* Summary */}
        <div>
          <h3 className="font-semibold text-lg border-b pb-1">Summary</h3>
          <p className="text-gray-700 mt-2">
            {resume.summary || "No summary added"}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold text-lg border-b pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {resume.skills && resume.skills.length > 0 ? (
              resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-semibold text-lg border-b pb-1">Education</h3>
          {resume.education && resume.education.length > 0 ? (
            resume.education.map((edu, idx) => (
              <p key={idx} className="text-gray-700 mt-2">
                🎓 {edu.collage_name || "College"} | {edu.yog || "Year"} | CGPA:{" "}
                {edu.cgpa || "N/A"}
              </p>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No education details</p>
          )}
        </div>

        {/* Projects */}
        <div>
          <h3 className="font-semibold text-lg border-b pb-1">Projects</h3>
          {resume.projects && resume.projects.length > 0 ? (
            resume.projects.map((proj, idx) => (
              <div key={idx} className="mt-3">
                <p className="font-medium">
                  {proj.project_name || "Untitled Project"}
                </p>
                <p className="text-sm text-gray-600">
                  Tech: {proj.tech_stack?.join(", ") || "Not specified"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No projects added</p>
          )}
        </div>

        {/* AI Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Enter job description..."
            className="px-5 py-2 border rounded-lg flex-1"
            onChange={(e) => setJd(e.target.value)}
            value={jd}
          />
          <button
            onClick={handleAi}
            className="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            ⚡ AI Score Check
          </button>
          <button
            onClick={handleEnhancing}
            className="px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            ⚡ Enhance Summary
          </button>
        </div>
      </div>

      {/* AI Optimized Section */}
      <div className="bg-gray-50 border rounded-xl p-6 shadow-sm space-y-2">
        <h3 className="text-2xl font-bold text-gray-800">
          🤖 AI Optimized Resume Preview
        </h3>
        <p>Match Score: {show?.match_score ?? "Not available"}</p>
        <p>Length Category: {show?.length_category ?? "Not available"}</p>
        <p>Resume Length: {show?.resume_length ?? "Not available"}</p>
        <p>Improved Summary: {show?.improved_summary ?? "Not available"}</p>
      </div>
    </div>
  );
};
