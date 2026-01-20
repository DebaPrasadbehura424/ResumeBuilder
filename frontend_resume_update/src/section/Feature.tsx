import {
  FaMousePointer,
  FaPalette,
  FaFilePdf,
  FaRobot,
  FaTools,
  FaClock,
} from "react-icons/fa";

const Feature: React.FC = () => {
  const features = [
    {
      icon: <FaMousePointer className="text-indigo-600" />,
      title: "Drag & Drop Editor",
      desc: "Intuitively rearrange sections with a smooth, visual builder.",
    },
    {
      icon: <FaPalette className="text-indigo-600" />,
      title: "Premium Modern Templates",
      desc: "Professionally designed layouts that stand out in 2025–2026.",
    },
    {
      icon: <FaFilePdf className="text-indigo-600" />,
      title: "One-Click PDF Export",
      desc: "Instant high-quality PDF download – fully ATS friendly.",
    },
    {
      icon: <FaRobot className="text-indigo-600" />,
      title: "Smart AI Suggestions",
      desc: "Real-time content improvements, keyword optimization & phrasing help.",
    },
    {
      icon: <FaTools className="text-indigo-600" />,
      title: "Deep Customization",
      desc: "Change colors, fonts, spacing, icons, and accents — total freedom.",
    },
    {
      icon: <FaClock className="text-indigo-600" />,
      title: "Create Your Resume in 10 Minutes",
      desc: "Start from scratch or upload existing — polished & ready in minutes.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Everything You Need to Create
            <span className="text-indigo-600"> a Winning Resume</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful yet simple tools built to help you land interviews faster —
            no design skills required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group relative bg-white rounded-2xl p-7 md:p-8 
                shadow-md hover:shadow-2xl transition-all duration-300 
                border border-gray-100 hover:border-indigo-200
                overflow-hidden flex flex-col
              `}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-indigo-50/0 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex flex-col h-full">
                <div className="text-4xl mb-5 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-base mt-auto">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
