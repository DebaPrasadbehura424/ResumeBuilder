import React from "react";

function ResumeThree({ resume }) {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 flex items-center">
          {resume.profilePhoto && (
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
              <img
                src={`http://localhost:7878/${resume.profilePhoto}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            {resume.name && (
              <h1 className="text-2xl font-bold text-white">{resume.name}</h1>
            )}
            {resume.title && (
              <p className="text-gray-300 mt-1">{resume.title}</p>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* CONTACT DETAILS */}
          {(resume.email ||
            resume.phone ||
            resume.location ||
            resume.linkedin ||
            resume.github ||
            resume.stackoverflow) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Contact Details
              </h2>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                {resume.email && <p>📧 {resume.email}</p>}
                {resume.phone && <p>📞 {resume.phone}</p>}
                {resume.location && <p>📍 {resume.location}</p>}
                {resume.linkedin && (
                  <a
                    href={resume.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🔗 LinkedIn
                  </a>
                )}
                {resume.github && (
                  <a
                    href={resume.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🐙 GitHub
                  </a>
                )}
                {resume.stackoverflow && (
                  <a
                    href={resume.stackoverflow}
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
          {resume.areasOfExpertise?.filter(Boolean).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Areas of Expertise
              </h2>
              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                {resume.areasOfExpertise.map(
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
          {resume.experience?.some((exp) => exp.title || exp.company) && (
            <div>
              <h2 className="text-lg font-bold border-b pb-1 text-gray-800">
                Work Experience
              </h2>
              <div className="mt-2 text-sm text-gray-600 space-y-6">
                {resume.experience.map(
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
        </div>
      </div>
    </div>
  );
}

export default ResumeThree;
