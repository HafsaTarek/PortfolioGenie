import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
 let navigator = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className=" text-decoration-none fw-bold fs-4 main-color" href="#">PortfolioGenie</a>
          <button
            className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav" >
            <div className="internal-nav d-flex justify-content-between w-75 mx-auto">
              <div className="left-side w-50">
              <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={() => setIsOpen(false)}>Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setIsOpen(false)}>How it Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setIsOpen(false)}>Connect to Github</a>
              </li>
              
            </ul>
            </div>
            <div className="right-side d-flex w-25">
              <button className="border-0 bg-transparent me-2 " onClick={()=> navigator('/register')}>Sign in</button>
              <button type="submit" className="btn_1 text-white button_main_color" onClick={()=> navigator('/connect')}>Get started</button>

            </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}