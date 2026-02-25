# 📎 Project Name
PortfolioGenie – AI-Powered Developer Portfolio Builder

---

## 📌 Project Overview
PortfolioGenie is an AI-powered platform that helps junior developers build professional, high-quality portfolios with minimal effort.  
The platform analyzes developers’ GitHub activity and project data to automatically generate optimized portfolio content that clearly showcases their skills, experience, and coding style in a modern and visually appealing way.

---

## 👥 Team Members
- Hafsa Tarek  
- Mennatullah Ahmed  
- Mennatullah Fathii  
- Mariam Gad

## 🎯 Project Objective
**PortfolioGenie** is an AI-powered web platform that helps junior developers create a professional, high-performance portfolio by analyzing their GitHub activity and generating optimized portfolio content.  
The goal is to reduce the time and effort needed to write strong portfolio sections (Projects, About Me, Skills) while ensuring the output is **readable, SEO-friendly, accessible, and visually polished**.

---

## 📌 Project Scope

#### 1) UX/UI & Product Design
- Apply **Design Thinking** to define the problem, users, and solution direction.
- Create:
  - User personas (junior dev, job seeker, bootcamp grad)
  - User journey + main flows
  - Wireframes (low → mid fidelity)
  - Basic style guide  (colors, typography, components)
  - Accessibility basics (contrast, keyboard focus states, readable typography).

#### 2) Core Frontend (React + Hooks)
- React app with a **multi-step portfolio builder** form:
  - Personal info
  - GitHub username import
  - Projects (manual edit/add)
  - Skills/Tech stack
  - About Me generation + editing
  - Final preview + export
- Use **React Hooks** (useState, useEffect, custom hooks).
- Use **React Router** to navigate between:
  - Builder steps
  - Live preview page
  - Final export page

#### 3) GitHub Integration
- Fetch public GitHub data:
  - Profile info (name, bio, avatar)
  - Repositories (name, description, languages, stars, links)
- Allow user to **select repos** to include and edit details.

#### 4) AI Prompt Engineering Integration
- AI-assisted content generation for:
  - SEO-optimized project descriptions
  - Professional “About Me” suggestions based on:
    - GitHub bio + repo topics + languages + activity indicators (lightweight)
- Prompt templates + guardrails (tone, length, keywords, role targeting).

#### 5) Best Practices & Code Quality
- Clean component structure, reusable UI components.
- Form validation and error handling.
- Responsive layout + performance-friendly rendering.
- README documentation + setup instructions.

---

## 🗓️ 5-Week Plan (Delivery Roadmap)

### Week 1 — Discovery + UX Foundations
**Deliverables**
- Problem statement + target users
- Personas + user journey
- Feature list + MVP definition
- Low-fidelity wireframes (Builder + Preview)
- Initial project setup (React, routing skeleton)

**Tasks**
- Define flows: Import GitHub → Select projects → Generate content → Preview → Export
- Create layout structure and navigation map
- Decide the portfolio template structure (sections order)

---

### Week 2 — Frontend Builder (Core Form + State)
**Deliverables**
- Multi-step form working end-to-end (manual input)
- React state management strategy (custom hooks / context if needed)
- Basic UI components (inputs, stepper, cards)

**Tasks**
- Build steps:
  - Personal info
  - Skills/tech stack
  - Projects CRUD (add/edit/remove)
- Add validation + local persistence (LocalStorage) so user doesn’t lose data
- Create Preview page with static rendering from the collected data

---

### Week 3 — GitHub Import + Live Preview Improvements
**Deliverables**
- GitHub integration working (public API)
- Repo selection screen + mapping into the builder
- Enhanced live preview (responsive + clean layout)

**Tasks**
- Fetch GitHub profile + repos using username
- Let user choose which repos to include
- Auto-fill projects and allow editing
- Improve UI/UX: loading states, empty states, error handling

---

### Week 4 — AI Content Generation (Prompt Engineering)
**Deliverables**
- AI module integrated (About Me + Project description optimizer)
- Prompt templates documented
- Editable AI output with regenerate option

**Tasks**
- Build “Generate About Me” feature with:
  - role target (e.g., Frontend / Backend / Fullstack)
  - tone options (professional / friendly / concise)
- Build “Optimize Project Description” feature:
  - add tech keywords + measurable impact placeholders
- Add safety controls:
  - length limits
  - avoid hallucinating fake experience (use disclaimers like “based on provided repos”)

---

### Week 5 — Polishing + Export + Documentation
**Deliverables**
- Stable MVP demo-ready
- Export options:
  - Copy to clipboard (Markdown/HTML)
  - Download JSON (portfolio data)
  - (Optional) simple static HTML export
- Final README + screenshots
- Testing + bug fixes

**Tasks**
- Performance + accessibility check (focus states, contrast, keyboard nav)
- UI polish (spacing, typography, mobile layout)
- Write final documentation:
  - setup
  - features
  - prompts
  - limitations
- Prepare demo script and project presentation
