export const ModernClue = ({ data }: { data: any }) => {
  const isRow = data.projectsLayout === "row";

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header / Profile Section */}
        <div className="bg-linear-to-r from-gray-50 to-white px-8 py-10 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {data.photo ? (
              <img
                src={data.photo}
                alt={`${data.basic_info?.fullname || "Profile"} photo`}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md shrink-0"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xl font-medium shadow-md shrink-0">
                Photo
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {data.basic_info?.fullname || "Your Name"}
              </h1>
              <p className="mt-1 text-lg text-gray-600 font-medium">
                {data.basic_info?.email}
              </p>
              <p className="text-gray-600">{data.basic_info?.phone}</p>
              <p className="mt-1 text-gray-500">
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

        <div className="p-8 sm:p-10 space-y-10 text-gray-800">
          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {data.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Education
              </h2>
              <div className="space-y-5">
                {data.education.map((edu: any, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                  >
                    <p className="font-medium text-lg text-gray-900">
                      {edu.collage_name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Year of Graduation: {edu.yog} • CGPA: {edu.cgpa}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Projects
              </h2>
              <div
                className={
                  isRow
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {data.projects.map((proj: any, i: number) => (
                  <div
                    key={i}
                    className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
                      !isRow ? "border-l-4 border-blue-500" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {proj.project_name}
                    </h3>

                    {proj.tech_stack?.length > 0 && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Tech:</span>{" "}
                        {proj.tech_stack.join(" • ")}
                      </p>
                    )}

                    <div className="flex gap-4 text-sm">
                      {proj.githublink && (
                        <a
                          href={proj.githublink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-1"
                        >
                          GitHub →
                        </a>
                      )}
                      {proj.livelink && (
                        <a
                          href={proj.livelink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 hover:text-green-800 font-medium transition-colors flex items-center gap-1"
                        >
                          Live Demo →
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.certification.map(
                    (cert: any, i: number) =>
                      cert.cerficate_img && (
                        <div
                          key={i}
                          className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <img
                            src={cert.cerficate_img}
                            alt="Certificate"
                            className="w-full h-auto object-cover"
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
