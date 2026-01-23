import type React from "react";
import { ResumeCreateLeft } from "../section/ResumeCreateLeft";
import { ResumeCreateRight } from "../section/ResumeCreateRight";
import { useState } from "react";
import { useParams } from "react-router-dom";
export const ResumeCreate: React.FC = () => {
  const { id } = useParams();

  const templateId: string | undefined = id;

  const [resumeData, setResumeData] = useState({
    basic_info: {
      fullname: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
    },
    projectsLayout: "",
    photo: "",
    summary: "",
    education: [{ collage_name: "", yog: "", cgpa: "" }],
    skills: [],
    projects: [
      { project_name: "", tech_stack: [], githublink: "", livelink: "" },
    ],
    certification: [{ cerficate_img: "" }],
    headerColor: "",
    headerTextColor: "",
    bodyColor: "",
    bodyTextColor: "",
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 border-r border-gray-200">
        <ResumeCreateLeft resumeData={resumeData} setData={setResumeData} />
      </div>

      <div className="w-full md:w-1/2">
        <ResumeCreateRight resumeData={resumeData} templateId={templateId} />
      </div>
    </div>
  );
};
