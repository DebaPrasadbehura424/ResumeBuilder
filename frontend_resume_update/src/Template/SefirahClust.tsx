export const SefirahClust: React.FC<{ data: any }> = ({ data }) => {
  const isRow = data.projectsLayout === "row";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        {/* Clean Header - Simple & Professional */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-700 text-white px-10 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {data.photo ? (
              <img
                src={data.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white">
                {data.basic_info?.fullname?.charAt(0) || "D"}
              </div>
            )}

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">
                {data.basic_info?.fullname || "Debaprasad Behura"}
              </h1>
              <p className="text-xl mt-2 opacity-95">
                {data.basic_info?.email}
              </p>
              <p className="text-lg opacity-90">{data.basic_info?.phone}</p>
              <p className="mt-3 text-white/90">
                {[
                  data.basic_info?.city,
                  data.basic_info?.state,
                  data.basic_info?.country,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-600 inline-block pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-emerald-600 inline-block pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-5 py-2 bg-emerald-100 text-emerald-800 rounded-lg font-medium text-sm border border-emerald-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-blue-600 inline-block pb-1">
                Education
              </h2>
              <div className="space-y-5">
                {data.education.map((edu: any, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.collage_name}
                      </h3>
                      <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {edu.cgpa} CGPA
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">Graduated: {edu.yog}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-purple-600 inline-block pb-1">
                Projects
              </h2>
              <div
                className={isRow ? "grid md:grid-cols-2 gap-6" : "space-y-6"}
              >
                {data.projects.map((proj: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {proj.project_name}
                    </h3>

                    {proj.tech_stack?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Tech Stack:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {proj.tech_stack.map((tech: string, j: number) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-6 text-sm font-medium">
                      {proj.githublink && (
                        <a
                          href={proj.githublink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 underline"
                        >
                          GitHub
                        </a>
                      )}
                      {proj.livelink && (
                        <a
                          href={proj.livelink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certification?.length > 0 &&
            data.certification.some((c: any) => c.cerficate_img) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b-2 border-orange-600 inline-block pb-1">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.certification.map(
                    (cert: any, i: number) =>
                      cert.cerficate_img && (
                        <div
                          key={i}
                          className="border border-gray-300 rounded-xl overflow-hidden shadow-md"
                        >
                          <img
                            src={cert.cerficate_img}
                            alt="Certificate"
                            className="w-full h-56 object-cover"
                          />
                        </div>
                      ),
                  )}
                </div>
              </section>
            )}
        </div>
      </div>
    </div>
  );
};
