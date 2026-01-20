function Testimonials() {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Marketing Manager",
      feedback: "Smart Resume Builder made my job search so much easier!",
    },
    {
      name: "John Smith",
      role: "Software Engineer",
      feedback: "The templates are sleek and professional. Highly recommend!",
    },
    {
      name: "Emily Brown",
      role: "Graphic Designer",
      feedback: "I love the drag-and-drop editor. It’s so intuitive!",
    },
  ];
  return (
    <section className="py-16 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Loved by Job Seekers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
