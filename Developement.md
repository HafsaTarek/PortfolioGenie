# Development Guide - PortfolioGenie 🚀

This document contains all development rules, project structure, workflows, coding conventions, and technical guidelines for the PortfolioGenie project.

---

# 📁 Project Structure

```bash
PortfolioGenie/
│
├── client/
│
├── server/
│
├── docs/
│
├── README.md
└── Development.md
```

---

# ⚛️ Frontend Structure

```bash
client/src/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── pages/
│
├── features/
│   ├── auth/
│   ├── github/
│   ├── about-skills/
│   └── projects-dashboard/
│
├── hooks/
│
├── services/
│
├── context/
│
├── routes/
│
├── layouts/
│
└── utils/
```

---

# 🖥️ Backend Structure

```bash
server/
│
├── controllers/
│
├── routes/
│
├── models/
│
├── middleware/
│
├── services/
│
├── config/
│
├── utils/
│
└── app.js
```

---


# 🌿 Git Workflow

## Main Branch

```bash
main
```

The `main` branch should always contain stable code.

---

## Feature Branches

```bash
feature/auth-landing
feature/github-integration
feature/about-skills
feature/projects-dashboard
```

---

# 🔄 Git Commands

## Create Branch

```bash
git checkout -b feature/branch-name
```

## Add Changes

```bash
git add .
```

## Commit Changes

```bash
git commit -m "feat: add login page"
```

## Push Changes

```bash
git push origin feature/branch-name
```

## Pull Latest Updates

```bash
git pull origin main
```

---

# 🚫 Important Git Rules

- Never push directly to `main`
- Always work on your own branch
- Pull latest updates before merging
- Write meaningful commit messages
- Merge tested code only
- Resolve conflicts immediately

---

# ⚙️ Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GITHUB_CLIENT_ID=your_client_id

GITHUB_CLIENT_SECRET=your_client_secret
```

---

# Follow these simple steps to get the exact frontend branch running on your machine:

### 1. Download and Switch to the Frontend Branch
Open your terminal in your main workspace folder and run:

```bash
# 1. Clone the project
git clone [https://github.com/HafsaTarek/PortfolioGenie.git](https://github.com/HafsaTarek/PortfolioGenie.git)

# 2. Go into the project folder
cd PortfolioGenie

# 3. Switch to the frontend branch
git checkout frontend


# ▶️ Running The Project

## Frontend

```bash
cd client
npm install
npm run dev
```

---

## Backend

```bash
cd server
npm install
npm start
```

---

# 📝 Commit Message Examples

```bash
feat: add login page
fix: resolve navbar issue
style: improve dashboard spacing
refactor: organize api services
```

# 💡 Good Luck Team PortfolioGenie 🚀
