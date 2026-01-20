import React from "react";

function ResumeOne({ resume }) {
  return (
    <div className="bg-white min-h-screen p-8 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">{resume.name}</h1>
              <p className="text-blue-600 font-semibold mt-1">{resume.title}</p>
              <div className="flex flex-wrap mt-2 text-sm text-gray-600 space-x-4">
                {resume.phone && <p>📞 {resume.phone}</p>}
                {resume.email && <p>📧 {resume.email}</p>}
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
              </div>
            </div>
            {resume.profilePhoto && (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 ml-6 flex-shrink-0">
                <img
                  src={`http://localhost:7878/${resume.profilePhoto}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SUMMARY */}
          {resume.summary && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">SUMMARY</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {resume.summary}
              </p>
            </div>
          )}

          {/* EXPERIENCE */}
          {resume.experience?.some((exp) => exp.title || exp.company) && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">EXPERIENCE</h2>
              <div className="space-y-6 mt-4">
                {resume.experience.map(
                  (exp, idx) =>
                    (exp.title || exp.company) && (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {exp.company} <span className="text-gray-400">|</span>{" "}
                          {exp.location}
                        </p>
                        <p className="text-sm italic text-gray-500">
                          {exp.startDate || "N/A"} - {exp.endDate || "N/A"}
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
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

          {/* EDUCATION */}
          {resume.education?.some((e) => e.degree || e.institution) && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">EDUCATION</h2>
              <div className="space-y-4 mt-4">
                {resume.education.map(
                  (edu, idx) =>
                    (edu.degree || edu.institution) && (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
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
          {resume.projects?.some(
            (p) => p.title || p.technologies || p.description
          ) && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">PROJECTS</h2>
              <div className="space-y-4 mt-4">
                {resume.projects.map(
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
                            .map((line, i) => line && <li key={i}>{line}</li>)}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {resume.skills?.filter(Boolean).length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">SKILLS</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {resume.skills.map(
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
          {resume.certifications?.filter(Boolean).length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b pb-1">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                {resume.certifications.map(
                  (cert, idx) => cert && <li key={idx}>{cert}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeOne;
