function ContactSection() {
  return (
    <section className="py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-11">Get in Touch</h2>
        <div className="max-w-lg mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="Message"
              rows="5"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
              Send Messag
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="mailto:support@smartresume.com"
              className="text-gray-600 hover:text-blue-600"
            >
              📧
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-blue-600"
            >
              🔗
            </a>
            <a
              href="https://github.com"
              className="text-gray-600 hover:text-blue-600"
            >
              🐙
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
