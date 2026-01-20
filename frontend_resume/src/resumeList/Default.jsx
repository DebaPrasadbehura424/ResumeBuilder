import React from "react";

function Default({ resume }) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8 m-4">
        {(resume.profilePhoto ||
          resume.name ||
          resume.email ||
          resume.phone ||
          resume.location ||
          resume.linkedin) && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
            {resume.profilePhoto ? (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={`http://localhost:7878/${resume?.profilePhoto}`}
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
              {resume.name && (
                <h1 className="text-3xl font-bold text-gray-800">
                  {resume.name}
                </h1>
              )}
              <div className="mt-2 space-y-1">
                {resume.email && (
                  <p className="text-gray-600">📧 {resume.email}</p>
                )}
                {resume.phone && (
                  <p className="text-gray-600">📞 {resume.phone}</p>
                )}
                {resume.location && (
                  <p className="text-gray-600">📍 {resume.location}</p>
                )}
                {resume.linkedin && (
                  <a
                    href={resume.linkedin}
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

        {resume.summary && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Summary
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {resume.summary}
            </p>
          </div>
        )}

        {resume.skills?.filter(Boolean).length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Skills
            </h3>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
              {resume.skills.filter(Boolean).map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {resume.experience?.some((exp) => exp.title || exp.company) && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Work Experience
            </h3>
            <div className="mt-4 space-y-6">
              {resume.experience.map(
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
                        {exp.location || "No location"}
                      </p>
                      <p className="text-gray-500 italic">
                        {exp.startDate || "N/A"} - {exp.endDate || "N/A"}
                      </p>
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

        {resume.education?.some((edu) => edu.degree || edu.institution) && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Education
            </h3>
            <div className="mt-4 space-y-4">
              {resume.education.map(
                (edu, index) =>
                  (edu.degree || edu.institution) && (
                    <div key={index}>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {edu.degree || "No degree provided"}
                      </h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-600">{edu.location}</p>
                      <p className="text-gray-500 italic">
                        {edu.startDate || "N/A"} - {edu.endDate || "N/A"}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {resume.projects?.some(
          (proj) => proj.title || proj.technologies || proj.description
        ) && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Projects
            </h3>
            <div className="mt-4 space-y-4">
              {resume.projects.map(
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
                          ?.split("\n")
                          .map((line, i) => line && <li key={i}>{line}</li>)}
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {resume.certifications?.filter(Boolean).length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
              Certifications
            </h3>
            <ul className="mt-3 text-gray-600 list-disc list-inside space-y-1">
              {resume.certifications.filter(Boolean).map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Default;





