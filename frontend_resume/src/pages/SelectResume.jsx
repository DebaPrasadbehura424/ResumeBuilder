import React, { useState } from "react";
import imagX from "../ImageSender/imgx";
import { useNavigate } from "react-router-dom";

function SelectResume() {
  const resumes = [
    {
      type: 0,
      img: imagX.ee,
      link: "/resume/default",
    },
    {
      type: 1,
      img: imagX.resume1,
      link: "/resume/1",
    },
    {
      type: 2,
      img: imagX.resume2,
      link: "/resume/2",
    },
    {
      type: 3,
      img: imagX.resume3,
      link: "/resume/3",
    },
  ];

  const navigate = useNavigate();
  const [view, setView] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  function handleView(img) {
    setSelectedImage(img);
    setView(false);
  }

  function handleSelect(type) {
    sessionStorage.setItem("numberType", type);
    navigate(`/create-resume`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-16 px-4 sm:px-8 lg:px-12">
      {view ? (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight md:text-5xl">
            Select Your Professional Resume Template
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <div
                key={resume.type}
                className="relative group rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl bg-white bg-opacity-90 backdrop-blur-lg"
              >
                <div className="w-full h-[320px] flex flex-col items-center justify-between p-4">
                  <div className="w-full h-[260px] overflow-hidden">
                    <img
                      src={resume.img}
                      alt={`Resume ${resume.type}`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {resume.type === 0 && (
                    <div className="absolute top-0 left-0 bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-br-xl shadow-md">
                      Default
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800/70 to-transparent p-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleView(resume.img)}
                      className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleSelect(resume.type)}
                      className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
          <img
            src={selectedImage}
            alt="Full Resume Preview"
            className="max-w-4xl w-full h-auto object-contain shadow-2xl rounded-xl"
          />
          <button
            onClick={() => setView(true)}
            className="mt-8 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm font-medium"
          >
            Back to Templates
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectResume;
