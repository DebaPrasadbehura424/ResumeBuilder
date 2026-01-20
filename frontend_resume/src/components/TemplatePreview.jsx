function TemplatePreview() {
  const templates = [
    {
      name: "Classic",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80",
    },
    {
      name: "Modern",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80",
    },
    {
      name: "Creative",
      img: "https://images.unsplash.com/photo-1502945015378-0e284915f33a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80",
    },
  ];
  return (
    <section className="py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Preview Resume Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={template.img}
                alt={template.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <a
                href="/preview"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Preview
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TemplatePreview;
