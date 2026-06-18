import { FaGithub } from "react-icons/fa";

function GithubLogin() {
  return (
    <button
      className="d-flex align-items-center justify-content-center gap-2 px-4 py-2 border rounded mb-3 w-75 m-auto bg-black text-white"
    >
      <FaGithub size={20} />
      <span>Continue with GitHub</span>
    </button>
  );
}

export default GithubLogin;