import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainPage from "../components/MainPage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [sections, setSections] = useState({
    profilePhoto: false,
    name: false,
    email: false,
    phone: false,
    location: false,
    linkedin: false,
    summary: false,
    skills: false,
    experience: false,
    education: false,
    projects: false,
    certifications: false,
  });

  const [formData, setFormData] = useState({
    NumberType: 0,
    profilePhoto: null,
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    skills: [""],
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      },
    ],
    education: [
      { degree: "", institution: "", location: "", startDate: "", endDate: "" },
    ],
    projects: [{ title: "", technologies: "", description: "", photo: null }],
    certifications: [""],
  });

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  //not understandable
  const handleInputChange = (e, index = null, subIndex = null) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name.startsWith("project")) {
      const field = name.split(".")[1];
      const updatedProjects = [...formData.projects];
      if (field === "photo") {
        updatedProjects[index][field] = files[0];
      } else {
        updatedProjects[index][field] = value;
      }
      setFormData((prev) => ({ ...prev, projects: updatedProjects }));
    } else if (name.startsWith("experience")) {
      const field = name.split(".")[1];
      const updatedExperience = [...formData.experience];
      if (field === "responsibilities") {
        updatedExperience[index].responsibilities[subIndex] = value;
      } else {
        updatedExperience[index][field] = value;
      }
      setFormData((prev) => ({ ...prev, experience: updatedExperience }));
    } else if (name.startsWith("education")) {
      const field = name.split(".")[1];
      const updatedEducation = [...formData.education];
      updatedEducation[index][field] = value;
      setFormData((prev) => ({ ...prev, education: updatedEducation }));
    } else if (name.startsWith("skill")) {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData((prev) => ({ ...prev, skills: updatedSkills }));
    } else if (name.startsWith("certification")) {
      const updatedCertifications = [...formData.certifications];
      updatedCertifications[index] = value;
      setFormData((prev) => ({
        ...prev,
        certifications: updatedCertifications,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", technologies: "", description: "", photo: null },
      ],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    if (editingProjectIndex === index) {
      setEditingProjectIndex(null);
    }
  };

  const editProject = (index) => {
    setEditingProjectIndex(index);
  };

  const saveProject = () => {
    setEditingProjectIndex(null);
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
    if (editingExperienceIndex === index) {
      setEditingExperienceIndex(null);
    }
  };

  const editExperience = (index) => {
    setEditingExperienceIndex(index);
  };

  const saveExperience = () => {
    setEditingExperienceIndex(null);
  };

  const addExperienceResponsibility = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index].responsibilities.push("");
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const removeExperienceResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities = updatedExperience[
      expIndex
    ].responsibilities.filter((_, i) => i !== respIndex);
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    if (editingEducationIndex === index) {
      setEditingEducationIndex(null);
    }
  };

  const editEducation = (index) => {
    setEditingEducationIndex(index);
  };

  const saveEducation = () => {
    setEditingEducationIndex(null);
  };

  const addSkill = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, ""],
    }));
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const clearForm = () => {
    setSections({
      profilePhoto: false,
      name: false,
      email: false,
      phone: false,
      location: false,
      linkedin: false,
      summary: false,
      skills: false,
      experience: false,
      education: false,
      projects: false,
      certifications: false,
    });
    setFormData({
      profilePhoto: null,
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      summary: "",
      skills: [""],
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
      projects: [{ title: "", technologies: "", description: "", photo: null }],
      certifications: [""],
    });
    setPreview(false);
    setEditingProjectIndex(null);
    setEditingExperienceIndex(null);
    setEditingEducationIndex(null);
  };

  const generateResume = async (text) => {
    const token = sessionStorage.getItem("token");

    if (text == "onlyCreate") {
      alert("Successfully generate");
      setPreview(true);
      setEditingProjectIndex(null);
      setEditingExperienceIndex(null);
      setEditingEducationIndex(null);
    } else {
      if (!token) {
        alert("You must be logged in to generate a resume.");
        return;
      }

      let email = "";
      try {
        const decoded = jwtDecode(token);
        email = decoded.email;
      } catch (err) {
        console.error("Invalid token", err);
        alert("Session expired. Please log in again.");
        return;
      }

      const form = new FormData();

      formData.NumberType = sessionStorage.getItem("numberType") || 0;

      form.append("NumberType", formData.NumberType);
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("location", formData.location);
      form.append("linkedin", formData.linkedin);
      form.append("summary", formData.summary);

      if (formData.profilePhoto) {
        form.append("photo", formData.profilePhoto);
      }

      formData.skills.forEach((skill, idx) => {
        form.append(`skills[${idx}]`, skill);
      });

      formData.experience.forEach((exp, i) => {
        form.append(`experience[${i}][title]`, exp.title);
        form.append(`experience[${i}][company]`, exp.company);
        form.append(`experience[${i}][location]`, exp.location);
        form.append(`experience[${i}][startDate]`, exp.startDate);
        form.append(`experience[${i}][endDate]`, exp.endDate);
        exp.responsibilities.forEach((resp, j) => {
          form.append(`experience[${i}][responsibilities][${j}]`, resp);
        });
      });

      formData.education.forEach((edu, i) => {
        form.append(`education[${i}][degree]`, edu.degree);
        form.append(`education[${i}][institution]`, edu.institution);
        form.append(`education[${i}][location]`, edu.location);
        form.append(`education[${i}][startDate]`, edu.startDate);
        form.append(`education[${i}][endDate]`, edu.endDate);
      });

      formData.projects.forEach((project, i) => {
        form.append(`projects[${i}][title]`, project.title);
        form.append(`projects[${i}][technologies]`, project.technologies);
        form.append(`projects[${i}][description]`, project.description);
      });

      formData.certifications.forEach((cert, i) => {
        form.append(`certifications[${i}]`, cert);
      });

      try {
        await axios.post(
          `http://localhost:7878/api/resumerCreate/createResume?email=${email}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Successfully saved");
        setPreview(true);
        setEditingProjectIndex(null);
        setEditingExperienceIndex(null);
        setEditingEducationIndex(null);
        navigate("/all_resume");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const contextValue = {
    toggle,
    setToggle,
    preview,
    setPreview,
    editingProjectIndex,
    setEditingProjectIndex,
    editingExperienceIndex,
    setEditingExperienceIndex,
    editingEducationIndex,
    setEditingEducationIndex,
    sections,
    setSections,
    formData,
    setFormData,
    toggleSection,
    handleInputChange,
    clearForm,
    generateResume,
    addProject,
    removeProject,
    editProject,
    saveProject,
    addExperience,
    removeExperience,
    editExperience,
    saveExperience,
    addExperienceResponsibility,
    removeExperienceResponsibility,
    addEducation,
    removeEducation,
    editEducation,
    saveEducation,
    addSkill,
    removeSkill,
    addCertification,
    removeCertification,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      <div className="flex min-h-screen bg-gray-100">
        {toggle == false && <Sidebar />}
        <MainPage />
      </div>
    </ResumeContext.Provider>
  );
}
