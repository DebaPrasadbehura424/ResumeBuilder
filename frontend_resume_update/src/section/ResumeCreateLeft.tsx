import type React from "react";
import { useState } from "react";

interface Props {
  resumeData: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export const ResumeCreateLeft: React.FC<Props> = ({ resumeData, setData }) => {
  const backurl = "https://resumebuilderbackend-alpha.vercel.app";
  // const backurl = "http://localhost:9090";
  const [step, setStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const nextStep = () => {
    if (step === steps.length - 1) {
      setShowConfirm(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (showSubmit) {
      setShowSubmit(false);
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch(`${backurl}/api/resume/create`, {
        method: "POST",
        body: JSON.stringify(resumeData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create resume");
      }

      alert("Resume created successfully! ✅");
    } catch (error: any) {
      console.error("Resume Creation Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData((p: any) => ({ ...p, photo: URL.createObjectURL(file) }));
  };

  const handleCertChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const copy = [...resumeData.certification];
    copy[index].cerficate_img = URL.createObjectURL(file);
    setData({ ...resumeData, certification: copy });
  };

  const steps = [
    /* STEP 0 — BASIC INFO */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      {["fullname", "email", "phone", "country", "state", "city"].map(
        (field) => (
          <input
            key={field}
            placeholder={field.toUpperCase()}
            value={resumeData.basic_info[field]}
            onChange={(e) =>
              setData((p: any) => ({
                ...p,
                basic_info: { ...p.basic_info, [field]: e.target.value },
              }))
            }
            className="w-full border p-2 rounded"
          />
        ),
      )}
    </div>,
    /* STEP 1 — PHOTO */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile Photo</h2>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {resumeData.photo && (
        <img src={resumeData.photo} className="w-24 h-24 rounded-full" />
      )}
    </div>,
    /* STEP 2 — SUMMARY */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Professional Summary</h2>
      <textarea
        rows={5}
        value={resumeData.summary}
        onChange={(e) =>
          setData((p: any) => ({ ...p, summary: e.target.value }))
        }
        className="w-full border p-2 rounded"
      />
    </div>,
    /* STEP 3 — EDUCATION */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Education</h2>
      {resumeData.education.map((edu: any, i: number) => (
        <div key={i} className="border p-3 rounded space-y-2">
          {["collage_name", "yog", "cgpa"].map((f) => (
            <input
              key={f}
              placeholder={f.toUpperCase()}
              value={edu[f]}
              onChange={(e) => {
                const copy = [...resumeData.education];
                copy[i][f] = e.target.value;
                setData({ ...resumeData, education: copy });
              }}
              className="w-full border p-2 rounded"
            />
          ))}
        </div>
      ))}
    </div>,
    /* STEP 4 — SKILLS */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>

      <input
        placeholder="Enter skill"
        value={resumeData.tempSkill || ""}
        onChange={(e) =>
          setData((p: any) => ({ ...p, tempSkill: e.target.value }))
        }
        className="w-full border p-2 rounded"
      />

      <button
        onClick={() => {
          if (!resumeData.tempSkill) return;
          setData((p: any) => ({
            ...p,
            skills: [...p.skills, p.tempSkill],
            tempSkill: "",
          }));
        }}
        className="px-4 py-2 border rounded"
      >
        + Add Skill
      </button>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((s: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-gray-100 rounded text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>,
    /* STEP 5 — PROJECTS */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Projects</h2>

      <div className="flex gap-2">
        {["row", "column"].map((v) => (
          <button
            key={v}
            onClick={() => setData((p: any) => ({ ...p, projectsLayout: v }))}
            className={`px-3 py-1 border rounded ${
              resumeData.projectsLayout === v && "bg-indigo-600 text-white"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      {resumeData.projects.map((proj: any, i: number) => (
        <div key={i} className="border p-3 rounded space-y-2">
          {["project_name", "githublink", "livelink"].map((f) => (
            <input
              key={f}
              placeholder={f.toUpperCase()}
              value={proj[f]}
              onChange={(e) => {
                const copy = [...resumeData.projects];
                copy[i][f] = e.target.value;
                setData({ ...resumeData, projects: copy });
              }}
              className="w-full border p-2 rounded"
            />
          ))}

          <input
            placeholder="TECH STACK (comma separated)"
            value={proj.tech_stack.join(",")}
            onChange={(e) => {
              const copy = [...resumeData.projects];
              copy[i].tech_stack = e.target.value.split(",");
              setData({ ...resumeData, projects: copy });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <button
        onClick={() =>
          setData((p: any) => ({
            ...p,
            projects: [
              ...p.projects,
              {
                project_name: "",
                tech_stack: [],
                githublink: "",
                livelink: "",
              },
            ],
          }))
        }
        className="px-4 py-2 border rounded"
      >
        + Add Project
      </button>
    </div>,
    /* STEP 6 — CERTIFICATIONS */
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Certifications</h2>

      {resumeData.certification.map((c: any, i: number) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCertChange(e, i)}
          />
          {c.cerficate_img && (
            <img src={c.cerficate_img} className="h-32 object-contain" />
          )}
        </div>
      ))}

      <button
        onClick={() =>
          setData((p: any) => ({
            ...p,
            certification: [...p.certification, { cerficate_img: "" }],
          }))
        }
        className="px-4 py-2 border rounded"
      >
        + Add Certificate
      </button>
    </div>,
  ];

  return (
    <div className="p-6 bg-white h-full flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-2">
          Step {step + 1} of {steps.length}
        </p>
        {steps[step]}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Back
        </button>

        {!showSubmit && (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Next
          </button>
        )}

        {showSubmit && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Resume
          </button>
        )}
      </div>

      {/* CONFIRM POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded space-y-4 w-80">
            <p className="font-medium">All steps completed. Ready to submit?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowSubmit(true);
                }}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
