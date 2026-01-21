import React from "react";

interface Template {
  id: number;
  name: string;
  category: string;
  image: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Modern Clean",
    category: "Professional",
    image:
      "https://psd.design/wp-content/uploads/2022/08/Modern-Resume-Template-1.jpg",
  },
  {
    id: 2,
    name: "Minimal Black & White",
    category: "ATS-Friendly",
    image:
      "https://marketplace.canva.com/EAGqxaNDv5M/1/0/1600w/canva-black-white-minimalist-resume-graphic-designer-a3-landscape-0PEOZ0cQvt4.jpg",
  },
  {
    id: 3,
    name: "Clean Professional",
    category: "Corporate",
    image:
      "https://img.glyphs.co/img?src=aHR0cHM6Ly9zMy5tZWRpYWxvb3QuY29tL3Jlc291cmNlcy9SZXN1bWUtQ1YtVGVtcGxhdGUtUHJldmlldy0xYS5qcGc&q=70&enlarge=true&h=777&w=1200",
  },
  {
    id: 4,
    name: "Double Page Modern",
    category: "Detailed",
    image:
      "https://static.vecteezy.com/system/resources/previews/023/568/790/non_2x/professional-modern-and-clean-double-pages-resume-template-cv-layout-design-with-mockup-vector.jpg",
  },
  {
    id: 5,
    name: "Minimalist ATS",
    category: "ATS-Optimized",
    image:
      "https://i.etsystatic.com/18150725/r/il/75239f/4933456737/il_570xN.4933456737_9efa.jpg",
  },
  {
    id: 6,
    name: "Creative Colorful",
    category: "Design",
    image:
      "https://blog-frontend.envato.com/cdn-cgi/image/width=1280,quality=75,format=auto/uploads/sites/2/2024/01/featured-color-resume-templates-copy.jpg",
  },
];

interface TemplatesProps {
  search: string;
}

export const Templates: React.FC<TemplatesProps> = ({ search }) => {
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
            onClick={() => alert(`Selected: ${template.name}`)}
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
