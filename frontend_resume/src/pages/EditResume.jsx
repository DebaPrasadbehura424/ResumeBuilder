import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import imagX from "../ImageSender/imgx";

function EditResume() {
  const [resume, setResume] = useState(null);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await axios.post(
          "http://localhost:7878/api/resumerCreate/getResumesById",
          { resumeId }
        );
        setResume(res.data);
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    }
    fetchResume();
  }, [resumeId]);

  const handleChange = (field, value) => {
    console.log(field);
    console.log(value);

    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    const updated = [...resume[section]];
    updated[index][field] = value;
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const handleArrayChange = (section, index, value) => {
    const updated = [...resume[section]];
    updated[index] = value;
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const handleAddItem = (section, newItem) => {
    setResume((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const handleRemoveItem = (section, index) => {
    const updated = [...resume[section]];
    updated.splice(index, 1);
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:7878/api/resumerCreate/updateResume/${resumeId}`,
        resume
      );
      alert("Resume updated successfully!");
      navigate("/all_resume");
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("Failed to update.");
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const resumeTemplates = [
    { type: 0, img: imagX.ee },
    { type: 1, img: imagX.resume1 },
    { type: 2, img: imagX.resume2 },
    { type: 3, img: imagX.resume3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-8 rounded shadow">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between">
            <div className="w-full">
              <input
                type="text"
                value={resume.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full text-4xl font-bold border-b"
                placeholder="Name"
              />

              <div className="mt-2 flex flex-wrap gap-2">
                {["phone", "email", "location", "linkedin"].map(
                  (field, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <label>{field} :</label>
                      <input
                        key={field}
                        type="text"
                        value={resume[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {resume.profilePhoto && (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={`http://localhost:7878/${resume.profilePhoto}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <section>
            <h2 className="font-bold border-b pb-1">SUMMARY</h2>
            <textarea
              value={resume.summary || ""}
              onChange={(e) => handleChange("summary", e.target.value)}
              rows={4}
              className="w-full border rounded p-2 mt-2"
              placeholder="Summary..."
            />
          </section>

          <section>
            <div className="flex justify-between items-center">
              <h2 className="font-bold border-b pb-1">EXPERIENCE</h2>
              <button
                onClick={() =>
                  handleAddItem("experience", {
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    responsibilities: [""],
                  })
                }
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                + Add
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {resume.experience.map((exp, i) => (
                <div key={i} className="border rounded p-4 space-y-2">
                  <button
                    onClick={() => handleRemoveItem("experience", i)}
                    className="text-red-500 float-right"
                  >
                    Remove
                  </button>
                  {["title", "company", "location", "startDate", "endDate"].map(
                    (field) => (
                      <input
                        key={field}
                        type="text"
                        value={exp[field] || ""}
                        onChange={(e) =>
                          handleNestedChange(
                            "experience",
                            i,
                            field,
                            e.target.value
                          )
                        }
                        placeholder={field}
                        className="w-full border rounded p-2"
                      />
                    )
                  )}
                  {exp.responsibilities.map((r, j) => (
                    <div key={j} className="flex gap-2">
                      <input
                        type="text"
                        value={r}
                        onChange={(e) => {
                          const updated = [...exp.responsibilities];
                          updated[j] = e.target.value;
                          handleNestedChange(
                            "experience",
                            i,
                            "responsibilities",
                            updated
                          );
                        }}
                        placeholder={`Responsibility ${j + 1}`}
                        className="flex-1 border rounded p-2"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center">
              <h2 className="font-bold border-b pb-1">EDUCATION</h2>
              <button
                onClick={() =>
                  handleAddItem("education", {
                    degree: "",
                    institution: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                  })
                }
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                + Add
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="border rounded p-4 space-y-2">
                  <button
                    onClick={() => handleRemoveItem("education", i)}
                    className="text-red-500 float-right"
                  >
                    Remove
                  </button>
                  {[
                    "degree",
                    "institution",
                    "location",
                    "startDate",
                    "endDate",
                  ].map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={edu[field] || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "education",
                          i,
                          field,
                          e.target.value
                        )
                      }
                      placeholder={field}
                      className="w-full border rounded p-2"
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <div className="flex justify-between items-center">
              <h2 className="font-bold border-b pb-1">PROJECTS</h2>
              <button
                onClick={() =>
                  handleAddItem("projects", {
                    title: "",
                    technologies: "",
                    description: "",
                  })
                }
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                + Add
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {resume.projects.map((p, i) => (
                <div key={i} className="border rounded p-4 space-y-2">
                  <button
                    onClick={() => handleRemoveItem("projects", i)}
                    className="text-red-500 float-right"
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    value={p.title || ""}
                    onChange={(e) =>
                      handleNestedChange("projects", i, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="w-full border rounded p-2"
                  />
                  <input
                    type="text"
                    value={p.technologies || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "projects",
                        i,
                        "technologies",
                        e.target.value
                      )
                    }
                    placeholder="Technologies"
                    className="w-full border rounded p-2 mt-1"
                  />
                  <textarea
                    value={p.description || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "projects",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    className="w-full border rounded p-2 mt-1"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center">
              <h2 className="font-bold border-b pb-1">SKILLS</h2>
              <button
                onClick={() => handleAddItem("skills", "")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                + Add
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {resume.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      handleArrayChange("skills", i, e.target.value)
                    }
                    placeholder="Skill"
                    className="flex-1 border rounded p-2"
                  />
                  <button
                    onClick={() => handleRemoveItem("skills", i)}
                    className="text-red-500 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center">
              <h2 className="font-bold border-b pb-1">LANGUAGES</h2>
              <button
                onClick={() => handleAddItem("languages", "")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                + Add
              </button>
            </div>
          </section>

          {/* Template selector section at the bottom */}
          <section>
            <h2 className="font-bold border-b pb-1">Choose Template</h2>
            <div className="flex gap-4 mt-4">
              {resumeTemplates.map(({ type, img }) => (
                <img
                  key={type}
                  src={img}
                  alt={`Template ${type}`}
                  onClick={() => handleChange("NumberType", type)}
                  className={`cursor-pointer border-4 rounded transition-opacity duration-300 ${
                    resume.NumberType === type
                      ? "border-blue-500 opacity-100"
                      : "border-transparent opacity-50"
                  }`}
                  style={{ width: "80px", height: "100px", objectFit: "cover" }}
                />
              ))}
            </div>
          </section>

          <button
            onClick={handleSave}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditResume;
