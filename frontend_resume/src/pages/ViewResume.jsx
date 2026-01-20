import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Default from "../resumeList/Default";
import ResumeOne from "../resumeList/resumeOne";
import ResumeTwo from "../resumeList/ResumeTwo";
import ResumeThree from "../resumeList/ResumeThree";

function ViewResume() {
  const [resume, setResume] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    async function fetchResume() {
      try {
        const response = await axios.post(
          "http://localhost:7878/api/resumerCreate/getResumesById",
          { resumeId }
        );
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    }
    fetchResume();
  }, [resumeId]);

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {resume.NumberType === 0 ? (
        <Default resume={resume} />
      ) : resume.NumberType === 1 ? (
        <ResumeOne resume={resume} />
      ) : resume.NumberType === 2 ? (
        <ResumeTwo resume={resume} />
      ) : resume.NumberType === 3 ? (
        <ResumeThree resume={resume} />
      ) : (
        <p>Unknown resume type</p>
      )}
    </>
  );
}

export default ViewResume;
