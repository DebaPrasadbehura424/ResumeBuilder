import type React from "react";
import { ModernClue } from "../Template/ModernClue";
import { SefirahClust } from "../Template/SefirahClust";

interface Props {
  resumeData: any;
  templateId: number;
}

export const ResumeCreateRight: React.FC<Props> = ({
  resumeData,
  templateId,
}) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <ModernClue data={resumeData} />;
      case 2:
        return <SefirahClust data={resumeData} />;

      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a template to preview
          </div>
        );
    }
  };

  return <div className="h-full p-4 bg-gray-50">{renderTemplate()}</div>;
};
