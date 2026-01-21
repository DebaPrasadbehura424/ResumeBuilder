import { Button } from "../components/Button";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center  from-gray-50 via-white to-indigo-50/30 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Craft a Resume That
              <span className="block text-indigo-600 mt-2">
                Actually Gets Interviews
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
              Create stunning, ATS-optimized resumes in minutes — or instantly
              improve your existing one with AI-powered suggestions that match
              2025–2026 hiring trends.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button
                  variant="primary"
                  size="lg"
                  text="Create Resume"
                  onClick={() => alert("Create Resume clicked!")}
                />

                <Button
                  variant="secondary"
                  size="lg"
                  text="Upload & Optimize"
                  onClick={() => alert("Upload & Optimize clicked!")}
                />
              </div>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
              <div>✓ ATS-Friendly</div>
              <div>✓ 5-Star Rated</div>
              <div>✓ Used by 10k+ Job Seekers</div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg xl:max-w-xl">
              <div className="absolute -inset-4  from-indigo-500/20 to-blue-500/10 rounded-3xl blur-xl opacity-70" />

              <img
                src="https://officetemplatesonline.com/wp-content/uploads/2021/02/booklet-style-resume-template-for-ms-word-last-pages.jpg"
                alt="Modern resume preview on laptop"
                className="relative w-full rounded-2xl shadow-2xl ring-1 ring-gray-200/50 object-cover transform transition-transform duration-500 hover:scale-[1.02]"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
