function FeaturesSection() {
  const features = [
    {
      title: "Drag and Drop Editor",
      desc: "Easily arrange sections with our intuitive editor.",
    },
    {
      title: "Modern Templates",
      desc: "Choose from sleek, professional designs.",
    },
    {
      title: "One-Click PDF Export",
      desc: "Download your resume instantly in PDF format.",
    },
    {
      title: "AI-Powered Suggestions",
      desc: "Get smart tips to enhance your content.",
    },
    {
      title: "Easy Customization",
      desc: "Personalize fonts, colors, and layouts.",
    },
  ];
  return (
    <section className="py-16 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Build a Great Resume
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;