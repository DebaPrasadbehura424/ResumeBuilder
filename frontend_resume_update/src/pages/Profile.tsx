import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Resume {
  _id: string;
  basic_info?: {
    fullname?: string;
  };
  createdAt?: string;
}

interface ProfileResponse {
  email: string;
  resumes: Resume[];
}

export const Profile: React.FC = () => {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:9090/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setData(json);
    };

    fetchProfile();
  }, [token]);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>

        {/* EMAIL ON RIGHT TOP */}
        <div className="text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-lg">
          {data.email}
        </div>
      </div>

      {/* RESUME LIST */}
      <h2 className="text-2xl font-semibold mb-4">My Resumes</h2>

      {data.resumes.length === 0 ? (
        <p className="text-gray-500">No resumes created yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {data.resumes.map((resume) => (
            <div
              key={resume._id}
              className="border rounded-lg p-5 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">
                {resume.basic_info?.fullname || "Unnamed Resume"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Created on{" "}
                {resume.createdAt
                  ? new Date(resume.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => alert("service not available")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => navigate(`/resumeone/${resume._id}`)}
                >
                  View
                </button>
                <button
                  className="px-4 py-2 bg-red-700 rounded text-white"
                  onClick={async () => {
                    await axios
                      .delete(
                        `http://localhost:9090/api/resume/remove/${resume._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        },
                      )
                      .then((res: any) => {
                        // setData((prev) =>
                        //   prev?.resumes.filter((x) => x._id != resume._id),
                        // );
                        alert(res.data.message);
                      })
                      .catch((err) => {
                        alert(err.message);
                      });
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
