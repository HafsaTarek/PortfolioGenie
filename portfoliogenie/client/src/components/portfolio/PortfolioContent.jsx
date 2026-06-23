import { useState } from "react";
import AboutMeTab from "./AboutMeTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import { Tabs } from "../common";

export default function PortfolioContent({
  aboutMe,
  skills,
  projects,
}) {
  const [activeId, setActiveId] = useState("about");

  const tabs = [
    {
      id: "about",
      label: "About Me",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "projects",
      label: "Projects",
    },
  ];

  return (
    <div className="w-100">
      <Tabs
        tabs={tabs}
        activeId={activeId}
        onChange={setActiveId}
      />

      <div className="mt-4">
        {activeId === "about" && (
          <AboutMeTab data={aboutMe} />
        )}

        {activeId === "skills" && (
          <SkillsTab
            skills={skills}
            aiTip="Highlight your strongest technical skills and keep them relevant to your target role."
          />
        )}

        {activeId === "projects" && (
          <ProjectsTab projects={projects} />
        )}
      </div>
    </div>
  );
}