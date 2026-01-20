import React from "react";

function OutputSection({ sections, formData, setPreview, generateResume }) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8 m-4">
        {/* Header Section */}
        {(sections.profilePhoto ||
          sections.name ||
          sections.email ||
          sections.phone ||
          sections.location ||
          sections.linkedin) && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
            {sections.profilePhoto && formData.profilePhoto ? (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile Placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              {sections.name && (
                <h1 className="text-3xl font-bold text-gray-800">
                  {formData.name || "Your Name"}
                </h1>
              )}
              <div className="mt-2 space-y-1">
                {sections.email && formData.email && (
                  <p className="text-gray-600">📧 {formData.email}</p>
                )}
                {sections.phone && formData.phone && (
                  <p className="text-gray-600">📞 {formData.phone}</p>
                )}
                {sections.location && formData.location && (
                  <p className="text-gray-600">📍 {formData.location}</p>
                )}
                {sections.linkedin && formData.linkedin && (
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Summary Section */}
        {sections.summary && formData.summary && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Summary
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {formData.summary}
            </p>
          </div>
        )}
        {/* Skills Section */}
        {sections.skills && formData.skills.some((skill) => skill) && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Skills
            </h3>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
              {formData.skills.map(
                (skill, index) =>
                  skill && (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
        {/* Experience Section */}
        {sections.experience &&
          formData.experience.some((exp) => exp.title || exp.company) && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                Work Experience
              </h3>
              <div className="mt-4 space-y-6">
                {formData.experience.map(
                  (exp, index) =>
                    (exp.title || exp.company) && (
                      <div key={index}>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {exp.title || "Untitled Position"}
                        </h4>
                        <p className="text-gray-600">
                          {exp.company || "No company provided"}
                        </p>
                        <p className="text-gray-600">
                          {exp.location || "No location provided"}
                        </p>
                        <p className="text-gray-500 italic">{`${
                          exp.startDate || "N/A"
                        } - ${exp.endDate || "N/A"}`}</p>
                        <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                          {exp.responsibilities.map(
                            (resp, respIndex) =>
                              resp && <li key={respIndex}>{resp}</li>
                          )}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        {/* Education Section */}
        {sections.education &&
          formData.education.some((edu) => edu.degree || edu.institution) && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                Education
              </h3>
              <div className="mt-4 space-y-4">
                {formData.education.map(
                  (edu, index) =>
                    (edu.degree || edu.institution) && (
                      <div key={index}>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {edu.degree || "No degree provided"}
                        </h4>
                        <p className="text-gray-600">
                          {edu.institution || "No institution provided"}
                        </p>
                        <p className="text-gray-600">
                          {edu.location || "No location provided"}
                        </p>
                        <p className="text-gray-500 italic">{`${
                          edu.startDate || "N/A"
                        } - ${edu.endDate || "N/A"}`}</p>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        {/* Projects Section */}
        {sections.projects &&
          formData.projects.some(
            (proj) => proj.title || proj.technologies || proj.description
          ) && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                Projects
              </h3>
              <div className="mt-4 space-y-4">
                {formData.projects.map(
                  (project, index) =>
                    (project.title ||
                      project.technologies ||
                      project.description) && (
                      <div key={index}>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {project.title || "Untitled Project"}
                        </h4>
                        <p className="text-gray-600">
                          {project.technologies || "No technologies provided"}
                        </p>
                        <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                          {project.description
                            .split("\n")
                            .map((line, i) =>
                              line ? <li key={i}>{line}</li> : null
                            )
                            .filter(Boolean)}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        {/* Certifications Section */}
        {sections.certifications &&
          formData.certifications.some((cert) => cert) && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                Certifications
              </h3>
              <ul className="mt-3 text-gray-600 list-disc list-inside space-y-1">
                {formData.certifications.map(
                  (cert, index) => cert && <li key={index}>{cert}</li>
                )}
              </ul>
            </div>
          )}

        <button
          onClick={() => generateResume("generateAndSave")}
          className="mt-6 bg-green-500 text-white px-4 py-2 ml-4 brounded cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default OutputSection;
