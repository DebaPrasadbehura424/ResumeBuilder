function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      desc: "Create your free account in seconds.",
      icon: "📝",
    },
    {
      title: "Fill in Details",
      desc: "Add your experience, skills, and education.",
      icon: "✍️",
    },
    {
      title: "Choose a Template",
      desc: "Select from modern, professional designs.",
      icon: "🎨",
    },
    {
      title: "Export Your Resume",
      desc: "Download as a PDF with one click.",
      icon: "📤",
    },
  ];
  return (
    <section className="py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
