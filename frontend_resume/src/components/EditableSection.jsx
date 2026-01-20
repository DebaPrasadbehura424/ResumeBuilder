import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import RescueAIChat from "./RescueAIChat";
function EditableSection({
  toggle,
  setToggle,
  sections,
  formData,
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
}) {
  return (
    <div
      className={`bg-white p-6 rounded shadow-md ${
        toggle == true && "w-full"
      } `}
    >
      <h2 className="text-2xl font-bold mb-4 ">
        {toggle == true ? "Reuse Ai" : " Resume Builder"}
      </h2>

      {/* ai button */}
      <div className="w-full flex justify-end mb-5">
        <button
          className="w-full sm:w-auto px-5 py-3 flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden group"
          onClick={() => setToggle(!toggle)}
        >
          <AiOutlineRobot className="text-xl" />
          <span className="z-10">
            {toggle == true ? "Back to Form" : "Ask ReuseAi"}
          </span>
        </button>
      </div>

      {toggle == true ? (
        <RescueAIChat />
      ) : (
        <div>
          {sections.profilePhoto && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleInputChange}
                className="mt-1 block w-full"
              />
            </div>
          )}
          {sections.name && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.email && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.phone && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.location && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.linkedin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.summary && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          )}
          {sections.skills && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name={`skill.${index}`}
                    value={skill}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Skill"
                    className="mt-1 block w-full border rounded p-2"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Skill
              </button>
            </div>
          )}
          {sections.experience && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4 border p-4 rounded relative">
                  {editingExperienceIndex === index ? (
                    <>
                      <input
                        type="text"
                        name={`experience.title.${index}`}
                        value={exp.title}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Job Title"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`experience.company.${index}`}
                        value={exp.company}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Company"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`experience.location.${index}`}
                        value={exp.location}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Location"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`experience.startDate.${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Start Date (e.g., Jan 2022)"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`experience.endDate.${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="End Date (e.g., Present)"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            name={`experience.responsibilities.${index}.${respIndex}`}
                            value={resp}
                            onChange={(e) =>
                              handleInputChange(e, index, respIndex)
                            }
                            placeholder="Responsibility"
                            className="mt-1 block w-full border rounded p-2"
                          />
                          <button
                            onClick={() =>
                              removeExperienceResponsibility(index, respIndex)
                            }
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addExperienceResponsibility(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                      >
                        Add Responsibility
                      </button>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={saveExperience}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => removeExperience(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium">
                        {exp.title || "Untitled Position"}
                      </h4>
                      <p>{exp.company || "No company provided"}</p>
                      <p>{exp.location || "No location provided"}</p>
                      <p className="italic">{`${exp.startDate || "N/A"} - ${
                        exp.endDate || "N/A"
                      }`}</p>
                      <ul className="list-disc list-inside">
                        {exp.responsibilities.map(
                          (resp, respIndex) =>
                            resp && <li key={respIndex}>{resp}</li>
                        )}
                      </ul>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => editExperience(index)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeExperience(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button
                onClick={addExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Experience
              </button>
            </div>
          )}
          {sections.education && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4 border p-4 rounded relative">
                  {editingEducationIndex === index ? (
                    <>
                      <input
                        type="text"
                        name={`education.degree.${index}`}
                        value={edu.degree}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Degree"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`education.institution.${index}`}
                        value={edu.institution}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Institution"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`education.location.${index}`}
                        value={edu.location}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Location"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`education.startDate.${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Start Date (e.g., Aug 2015)"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`education.endDate.${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="End Date (e.g., May 2019)"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={saveEducation}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => removeEducation(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium">
                        {edu.degree || "No degree provided"}
                      </h4>
                      <p>{edu.institution || "No institution provided"}</p>
                      <p>{edu.location || "No location provided"}</p>
                      <p className="italic">{`${edu.startDate || "N/A"} - ${
                        edu.endDate || "N/A"
                      }`}</p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => editEducation(index)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeEducation(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button
                onClick={addEducation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Education
              </button>
            </div>
          )}
          {sections.projects && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4 border p-4 rounded relative">
                  {editingProjectIndex === index ? (
                    <>
                      <input
                        type="text"
                        name={`project.title.${index}`}
                        value={project.title}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Project Title"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        name={`project.technologies.${index}`}
                        value={project.technologies}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Technologies"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />
                      <textarea
                        name={`project.description.${index}`}
                        value={project.description}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Project Description"
                        className="mt-1 block w-full border rounded p-2 mb-2"
                      />

                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={saveProject}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => removeProject(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium">
                        {project.title || "Untitled Project"}
                      </h4>
                      <p>
                        {project.technologies || "No technologies provided"}
                      </p>
                      <p>{project.description || "No description provided"}</p>

                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => editProject(index)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeProject(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button
                onClick={addProject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
          )}
          {sections.certifications && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    name={`certification.${index}`}
                    value={cert}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Certification"
                    className="mt-1 block w-full border rounded p-2"
                  />
                  <button
                    onClick={() => removeCertification(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={addCertification}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Certification
              </button>
            </div>
          )}
          {/* button for clear and submit */}
          <div className="flex space-x-4">
            <button
              onClick={clearForm}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear
            </button>
            <button
              onClick={() => generateResume("onlyCreate")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableSection;
