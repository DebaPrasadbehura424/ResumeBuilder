import { useEffect, useState, type ChangeEvent } from "react";
import Templates from "./Templates";
import { Select } from "../components/Select";

export const Dashboard: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select from modern, professional, and ATS-friendly designs to get
            started in minutes.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <Select
            name="role"
            value={search}
            onChange={handleFilter}
            placeholder="Choose role"
            size="lg"
            options={[
              { label: "Professional (General)", value: "professional" },
              { label: "Frontend Developer", value: "frontend" },
              { label: "Backend Developer", value: "backend" },
              { label: "Full Stack Developer", value: "fullstack" },
              { label: "UI / UX Designer", value: "designer" },
              { label: "Mobile App Developer", value: "mobile" },
              { label: "Data Analyst", value: "data-analyst" },
              { label: "Machine Learning Engineer", value: "ml" },
              { label: "DevOps Engineer", value: "devops" },
              { label: "Cloud Engineer", value: "cloud" },
              { label: "Fresher / Student", value: "fresher" },
              { label: "Internship Applicant", value: "intern" },
              { label: "Career Switcher", value: "career-switch" },
            ]}
          />
        </div>

        <Templates search={search} />
      </div>
    </div>
  );
};
