import React from "react";

function OutputSection3({ sections, formData, setPreview, generateResume }) {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 flex items-center">
          {sections.profilePhoto && formData.profilePhoto && (
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
              <img
                src={URL.createObjectURL(formData.profilePhoto)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            {sections.name && formData.name && (
              <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
            )}
            {sections.title && formData.title && (
              <p className="text-gray-300 mt-1">{formData.title}</p>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* CONTACT DETAILS */}
          {(sections.email ||
            sections.phone ||
            sections.location ||
            sections.linkedin ||
            sections.github ||
            sections.stackoverflow) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Contact Details
              </h2>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                {sections.email && formData.email && <p>📧 {formData.email}</p>}
                {sections.phone && formData.phone && <p>📞 {formData.phone}</p>}
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
                {sections.github && formData.github && (
                  <a
                    href={formData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🐙 GitHub
                  </a>
                )}
                {sections.stackoverflow && formData.stackoverflow && (
                  <a
                    href={formData.stackoverflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🌐 Stack Overflow
                  </a>
                )}
              </div>
            </div>
          )}

          {/* AREAS OF EXPERTISE */}
          {sections.areasOfExpertise &&
            formData.areasOfExpertise?.filter(Boolean).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                  Areas of Expertise
                </h2>
                <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                  {formData.areasOfExpertise.map(
                    (area, idx) =>
                      area && (
                        <span
                          key={idx}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}

          {/* WORK EXPERIENCE */}
          {sections.experience?.some((exp) => exp.title || exp.company) && (
            <div>
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Work Experience
              </h2>
              <div className="mt-2 text-sm text-gray-600 space-y-6">
                {formData.experience.map(
                  (exp, idx) =>
                    (exp.title || exp.company) && (
                      <div key={idx}>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-gray-500">
                          {exp.company} <span className="text-gray-400">•</span>{" "}
                          {exp.location}
                        </p>
                        <p className="text-gray-500 italic">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
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

export default OutputSection3;
