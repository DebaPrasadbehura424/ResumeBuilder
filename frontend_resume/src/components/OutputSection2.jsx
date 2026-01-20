import React from "react";

function OutputSection2({ sections, formData, setPreview, generateResume }) {
  return (
    <div className="bg-gray-800 min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT SIDE (Contact, Education, Skills) */}
        <div className="lg:col-span-1 bg-gray-700 p-4 rounded-lg shadow-lg space-y-6">
          {/* Contact Details */}
          <div>
            <h2 className="text-lg font-bold border-b pb-1 text-white">
              Contact Details
            </h2>
            <div className="mt-2 text-sm text-gray-300 space-y-1">
              {sections.email && formData.email && <p>📧 {formData.email}</p>}
              {sections.phone && formData.phone && <p>📞 {formData.phone}</p>}
              {sections.location && formData.location && (
                <p>📍 {formData.location}</p>
              )}
            </div>
          </div>

          {/* Education */}
          {sections.education &&
            formData.education?.some(
              (edu) => edu.degree || edu.institution
            ) && (
              <div>
                <h2 className="text-lg font-bold border-b pb-1 text-white">
                  Education
                </h2>
                <div className="mt-2 text-sm text-gray-300 space-y-2">
                  {formData.education.map(
                    (edu, idx) =>
                      (edu.degree || edu.institution) && (
                        <div key={idx}>
                          <p className="font-medium">{edu.degree}</p>
                          <p>{edu.institution}</p>
                          <p className="text-gray-400 italic">
                            {edu.startDate || "N/A"} - {edu.endDate || "N/A"}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* Skills */}
          {sections.skills && formData.skills?.filter(Boolean).length > 0 && (
            <div>
              <h2 className="text-lg font-bold border-b pb-1 text-white">
                Skills
              </h2>
              <div className="mt-2 text-sm text-gray-300 space-y-1">
                {formData.skills.map(
                  (skill, idx) => skill && <p key={idx}>{skill}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (Header, Summary, Work Experience, References) */}
        <div className="lg:col-span-3 bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
          {/* HEADER */}
          {(sections.name || sections.title || sections.profilePhoto) && (
            <div className="flex items-start">
              {sections.profilePhoto && formData.profilePhoto && (
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                {sections.name && formData.name && (
                  <h1 className="text-3xl font-bold text-gray-800">
                    {formData.name}
                  </h1>
                )}
                {sections.title && formData.title && (
                  <p className="text-blue-600 font-semibold mt-1">
                    {formData.title}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* SUMMARY */}
          {sections.summary && formData.summary && (
            <div>
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Summary
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {formData.summary}
              </p>
            </div>
          )}

          {/* WORK EXPERIENCE */}
          {sections.experience &&
            formData.experience?.some((exp) => exp.title || exp.company) && (
              <div>
                <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                  Work Experience
                </h2>
                <div className="mt-2 text-sm text-gray-600 space-y-4">
                  {formData.experience.map(
                    (exp, idx) =>
                      (exp.title || exp.company) && (
                        <div key={idx}>
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-gray-500">{exp.company}</p>
                          <p className="text-gray-500 italic">
                            {exp.startDate || "N/A"} - {exp.endDate || "N/A"}
                          </p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.responsibilities?.map(
                              (r, i) => r && <li key={i}>{r}</li>
                            )}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* REFERENCES */}
          <div>
            <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
              References
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              References available upon request
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => generateResume("generateAndSave")}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputSection2;
