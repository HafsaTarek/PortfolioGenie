import { useState } from "react";
import AboutMeTab from "./AboutMeTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import { Tabs } from "../common";

export default function PortfolioContent({
  aboutMe,
  skills,
  projects,
  onRefresh
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
          <AboutMeTab
            data={aboutMe}
            onRefresh={onRefresh}
          />
        )}

        {activeId === "skills" && (
          <SkillsTab
            skills={skills}
            aiTip="Highlight your strongest technical skills..."
            onRefresh={onRefresh}
          />
        )}

        {activeId === "projects" && (
          <ProjectsTab
            projects={projects}
            onRefresh={onRefresh}
          />
        )}
      </div>
    </div>
  );
}