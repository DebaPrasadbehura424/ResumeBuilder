import { useContext, createContext } from "react";

export const ResumeContext = createContext(null);

// custom hook
export const useResume = () => useContext(ResumeContext);
