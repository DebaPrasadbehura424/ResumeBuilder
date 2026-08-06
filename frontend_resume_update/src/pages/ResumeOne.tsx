import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ModernClue } from "../Template/ModernClue";
import { SefirahClust } from "../Template/SefirahClust";

interface Resume {
  _id: string;
  project_type?: number;
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
interface ResumeOutput {
  length_category?: string;
  match_score?: string | number;
  resume_length?: string | number;
  improved_summary?: string;
}

export const ResumeOne: React.FC = () => {
  // const backurl = "https://resumebuilderbackend-alpha.vercel.app";
  const backurl = "http://localhost:9090";

  const [resume, setResume] = useState<Resume | null>(null);
  const [type, setType] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<ResumeOutput>({});
  const [jd, setJd] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${backurl}/api/resume/getone/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setResume(res.data || null);
        setType(Number(res.data?.project_type || 0));
      })
      .catch((err) => console.error("Error fetching resume", err))
      .finally(() => setLoading(false));
  }, [id]);

  const contentRender = () => {
    switch (type) {
      case 1:
        return <ModernClue data={resume} />;
      case 2:
        return <SefirahClust data={resume} />;
      default:
        return (
          <p className="text-center text-gray-500">No template selected.</p>
        );
    }
  };

  const handleAi = async () => {
    if (!jd.trim()) {
      alert("Please enter Job Description first");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", {
        resume: resume?.summary || "",
        jd,
      });

      console.log(res.data);

      // Only update the 3 fields from /analyze, keep the rest
      setShow((prev) => ({
        ...prev,
        match_score: res.data.match_score,
        length_category: res.data.length_category,
        resume_length: res.data.resume_length,
      }));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleEnhancing = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/improve_summary", {
        resume: resume?.summary || "",
      });

      console.log(res.data);

      // Only update improved_summary, keep the previous score etc.
      setShow((prev) => ({
        ...prev,
        improved_summary: res.data.improved_summary,
      }));
    } catch (err: any) {
      console.log(err.message);
    }
  };
  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading resume...
      </div>
    );

  if (!resume)
    return (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-2xl font-semibold">No resume found</p>
        <p>Please create a resume first.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <div className="border rounded-2xl shadow-md p-6 bg-white">
        {contentRender()}
      </div>

      <div className="bg-white border rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">
          🤖 AI Resume Optimization
        </h3>

        <textarea
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
        />

        <div className="flex gap-4">
          <button
            onClick={handleAi}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Check Match Score
          </button>

          <button
            onClick={handleEnhancing}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Improve Summary
          </button>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border space-y-2">
          <p>
            <span className="font-semibold">Match Score:</span>{" "}
            {show?.match_score ?? "Not available"}
          </p>

          <p>
            <span className="font-semibold">Length Category:</span>{" "}
            {show?.length_category ?? "Not available"}
          </p>

          <p>
            <span className="font-semibold">Resume Length:</span>{" "}
            {show?.resume_length ?? "Not available"}
          </p>

          <p>
            <span className="font-semibold">Improved Summary:</span>{" "}
            {show?.improved_summary ?? "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};
