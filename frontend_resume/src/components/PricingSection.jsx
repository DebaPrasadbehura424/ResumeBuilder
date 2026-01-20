function PricingSection() {
  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      desc: "Basic templates, one export",
      features: ["Basic Templates", "One Resume Export"],
    },
    {
      name: "Premium Plan",
      price: "$9.99/mo",
      desc: "All templates, unlimited resumes, cover letter builder",
      features: ["All Templates", "Unlimited Resumes", "Cover Letter Builder"],
    },
  ];

  return (
    <section className="py-16 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple & Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-600 mb-4">{plan.desc}</p>
                <ul className="mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-600 mb-2">
                      ✔ {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/signup"
                className="mt-auto block text-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
