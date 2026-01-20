import { useResume } from "../context/ResumeContext";
import EditableSection from "./EditableSection";
import OutputSection from "./OutputSection";
import OutputSection1 from "./OutputSection1";
import OutputSection2 from "./OutputSection2";
import OutputSection3 from "./OutputSection3";
const type = sessionStorage.getItem("numberType");

function MainPage() {
  const {
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
  } = useResume();

  const components = {
    0: OutputSection,
    1: OutputSection1,
    2: OutputSection2,
    3: OutputSection3,
  };
  const SelectedComponent = components[type];

  const commonProps = {
    toggle,
    setToggle,
    sections,
    preview,
    setPreview,
    formData,
    toggleSection,
    handleInputChange,
    clearForm,
    generateResume,
    addProject,
    removeProject,
    editProject,
    saveProject,
    editingProjectIndex,
    addExperience,
    removeExperience,
    editExperience,
    saveExperience,
    addExperienceResponsibility,
    removeExperienceResponsibility,
    editingExperienceIndex,
    addEducation,
    removeEducation,
    editEducation,
    saveEducation,
    editingEducationIndex,
    addSkill,
    removeSkill,
    addCertification,
    removeCertification,
  };

  return (
    <div className="ml-[25%] w-3/4 p-6 h-screen overflow-y-auto">
      {!preview ? (
        <EditableSection {...commonProps} />
      ) : SelectedComponent ? (
        <SelectedComponent {...commonProps} />
      ) : (
        <p>Unknown Resume Type</p>
      )}
    </div>
  );
}

export default MainPage;
