import React from "react";

function OutputSection1({ sections, formData, setPreview, generateResume }) {
  return (
    <div className="bg-white min-h-screen p-8 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* HEADER */}
          {(sections.name ||
            sections.title ||
            sections.email ||
            sections.phone ||
            sections.location ||
            sections.linkedin ||
            sections.profilePhoto) && (
            <div className="flex justify-between items-start">
              <div>
                {sections.name && (
                  <h1 className="text-4xl font-bold">
                    {formData.name || "Your Name"}
                  </h1>
                )}
                {sections.title && (
                  <p className="text-blue-600 font-semibold mt-1">
                    {formData.title}
                  </p>
                )}
                <div className="flex flex-wrap mt-2 text-sm text-gray-600 space-x-4">
                  {sections.phone && formData.phone && (
                    <p>📞 {formData.phone}</p>
                  )}
                  {sections.email && formData.email && (
                    <p>📧 {formData.email}</p>
                  )}
                  {sections.location && formData.location && (
                    <p>📍 {formData.location}</p>
                  )}
                  {sections.linkedin && formData.linkedin && (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🔗 LinkedIn
                    </a>
                  )}
                </div>
              </div>
              {sections.profilePhoto && formData.profilePhoto && (
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 ml-6 flex-shrink-0">
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* SUMMARY */}
          {sections.summary && formData.summary && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">SUMMARY</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {formData.summary}
              </p>
            </div>
          )}

          {/* EXPERIENCE */}
          {sections.experience &&
            formData.experience?.some((exp) => exp.title || exp.company) && (
              <div>
                <h2 className="text-xl font-bold border-b pb-1">EXPERIENCE</h2>
                <div className="space-y-6 mt-4">
                  {formData.experience.map(
                    (exp, idx) =>
                      (exp.title || exp.company) && (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-sm text-gray-600 font-medium">
                            {exp.company}{" "}
                            <span className="text-gray-400">|</span>{" "}
                            {exp.location}
                          </p>
                          <p className="text-sm italic text-gray-500">
                            {exp.startDate || "N/A"} - {exp.endDate || "N/A"}
                          </p>
                          <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                            {exp.responsibilities.map(
                              (r, i) => r && <li key={i}>{r}</li>
                            )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* EDUCATION */}
          {sections.education &&
            formData.education?.some(
              (edu) => edu.degree || edu.institution
            ) && (
              <div>
                <h2 className="text-xl font-bold border-b pb-1">EDUCATION</h2>
                <div className="space-y-4 mt-4">
                  {formData.education.map(
                    (edu, idx) =>
                      (edu.degree || edu.institution) && (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold">
                            {edu.degree}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">
                            {edu.institution}{" "}
                            <span className="text-gray-400">|</span>{" "}
                            {edu.location}
                          </p>
                          <p className="text-sm italic text-gray-500">
                            {edu.startDate || "N/A"} - {edu.endDate || "N/A"}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          {/* PROJECTS */}
          {sections.projects &&
            formData.projects?.some(
              (p) => p.title || p.technologies || p.description
            ) && (
              <div>
                <h2 className="text-xl font-bold border-b pb-1">PROJECTS</h2>
                <div className="space-y-4 mt-4">
                  {formData.projects.map(
                    (project, idx) =>
                      (project.title || project.description) && (
                        <div key={idx}>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-600">
                            {project.technologies}
                          </p>
                          <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                            {project.description
                              ?.split("\n")
                              .map(
                                (line, i) => line && <li key={i}>{line}</li>
                              )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* SKILLS */}
          {sections.skills && formData.skills?.filter(Boolean).length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">SKILLS</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.map(
                  (skill, idx) =>
                    skill && (
                      <span
                        key={idx}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                )}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {sections.certifications &&
            formData.certifications?.filter(Boolean).length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b pb-1">
                  CERTIFICATIONS
                </h2>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                  {formData.certifications.map(
                    (cert, idx) => cert && <li key={idx}>{cert}</li>
                  )}
                </ul>
              </div>
            )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="lg:col-span-3 flex justify-end mt-6 gap-4">
          <button
            onClick={() => generateResume("generateAndSave")}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default OutputSection1;
