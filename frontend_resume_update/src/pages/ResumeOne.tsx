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
  const [show, setShow] = useState();
  const [jd, setJd] = useState(String);

  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:9090/api/resume/getone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResume(res.data || null);
      })
      .catch((err) => {
        console.error("Error fetching resume", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAi = async () => {
    if (jd == "") {
      alert("first fill the jod search field ");
      return;
    }
    const resumeBody = resume?.summary;
    await axios
      .post("http://127.0.0.1:5000/analyze", {
        resume: resumeBody,
        jd: jd,
      })
      .then((res: any) => {
        setShow(res.data?.match_score);
        alert("done");
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading resume...</p>;
  }

  if (!resume) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p className="text-xl font-semibold">No resume found</p>
        <p>Please create a resume first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Resume Card */}
      <div className="bg-white shadow-md rounded-xl border p-6">
        {/* Header */}
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

        {/* Summary */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg border-b pb-1">Summary</h3>
          <p className="text-gray-700 mt-2">
            {resume.summary || "No summary added"}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg border-b pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {resume.skills && resume.skills.length > 0 ? (
              resume.skills.map((skill, index) => (
                <span
                  key={index}
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
        <div className="mt-6">
          <h3 className="font-semibold text-lg border-b pb-1">Education</h3>
          {resume.education && resume.education.length > 0 ? (
            resume.education.map((edu, index) => (
              <p key={index} className="text-gray-700 mt-2">
                🎓 {edu.collage_name || "College"} | {edu.yog || "Year"} | CGPA:{" "}
                {edu.cgpa || "N/A"}
              </p>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No education details</p>
          )}
        </div>

        {/* Projects */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg border-b pb-1">Projects</h3>
          {resume.projects && resume.projects.length > 0 ? (
            resume.projects.map((project, index) => (
              <div key={index} className="mt-3">
                <p className="font-medium">
                  {project.project_name || "Untitled Project"}
                </p>
                <p className="text-sm text-gray-600">
                  Tech: {project.tech_stack?.join(", ") || "Not specified"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No projects added</p>
          )}
        </div>
        {/* AI Button */}
        <div className="mt-4 flex items-center gap-3 ">
          <button
            onClick={handleAi}
            className="px-5 py-2 rounded-lg  bg-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            ⚡ Ai score check
          </button>
          <input
            type="text"
            className="px-5 py-2"
            placeholder="what job you looking for "
            onChange={(e) => setJd(e.target.value)}
          />
        </div>
      </div>

      {/* AI Optimized Section */}
      <div className="bg-gray-50 border rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          🤖 AI Optimized Resume Preview
        </h3>
        <p>score : {show}</p>
      </div>
    </div>
  );
};
