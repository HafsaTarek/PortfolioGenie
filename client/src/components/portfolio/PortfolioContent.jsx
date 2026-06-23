import { useState } from "react";
import AboutMeTab from "./AboutMeTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import Sidebar from "./Sidebar";

export default function PortfolioContent({
  aboutMe,
  skills,
  projects,
  contentScore,
  seoScore,
  quickTips,
}) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="mb-3">
          <button
            className="btn btn-link"
            onClick={() => setActiveTab("about")}
          >
            About Me
          </button>

          <button
            className="btn btn-link"
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>

          <button
            className="btn btn-link"
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>

        {activeTab === "about" && (
          <AboutMeTab data={aboutMe} />
        )}

        {activeTab === "skills" && (
          <SkillsTab skills={skills} />
        )}

        {activeTab === "projects" && (
          <ProjectsTab projects={projects} />
        )}
      </div>

      <div className="col-lg-4">
        <Sidebar
          contentScore={contentScore}
          seoScore={seoScore}
          tips={quickTips}
        />
      </div>
    </div>
  );
}import { useState } from "react";
import AboutMeTab from "./AboutMeTab";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import Sidebar from "./Sidebar";
import { Tabs } from "../common";

export default function PortfolioContent({
  aboutMe,
  skills,
  projects,
  contentScore,
  seoScore,
  quickTips,
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
    <div className="row g-4">
      <div className="col-lg-8">
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
            <ProjectsTab
              projects={projects}
            />
          )}
        </div>
      </div>

      <div className="col-lg-4">
        <Sidebar
          contentScore={contentScore}
          seoScore={seoScore}
          tips={quickTips}
        />
      </div>
    </div>
  );
}