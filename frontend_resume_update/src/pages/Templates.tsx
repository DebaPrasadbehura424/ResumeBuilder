import React from "react";
import { useNavigate } from "react-router-dom";
interface Template {
  id: number;
  name: string;
  category: string;
  image: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "ModernClue",
    category: "Professional",
    image:
      "https://psd.design/wp-content/uploads/2022/08/Modern-Resume-Template-1.jpg",
  },
  {
    id: 2,
    name: "SefirahClust",
    category: "ATS-Friendly",
    image:
      "https://marketplace.canva.com/EAGqxaNDv5M/1/0/1600w/canva-black-white-minimalist-resume-graphic-designer-a3-landscape-0PEOZ0cQvt4.jpg",
  },
];

interface TemplatesProps {
  search: string;
}

export const Templates: React.FC<TemplatesProps> = ({ search }) => {
  const navigate = useNavigate();
  const query = search.toLowerCase();

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query),
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
            onClick={() => navigate(`/resume_create/${template.id}`)}
          >
            <div className=" overflow-hidden bg-gray-100">
              <img
                src={template.image}
                alt={`${template.name} resume preview`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500">{template.category}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-gray-500">
          No templates found matching "{search}". Try another keyword.
        </div>
      )}
    </div>
  );
};

export default Templates;
