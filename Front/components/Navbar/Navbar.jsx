import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { COLOR } from "../../constant/color";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src="../../src/assets/logo.png" />
      <div className="link">
        {/* <img src="../../src/assets/home-sharp.svg" /> */}
        <Link to="/welcome" className="itemNavbar">
          Accueil
        </Link>
        {/* <img src="../../src/assets/people-sharp.svg" /> */}
        <Link to="/colocation" className="itemNavbar">
          Colocation
        </Link>
        {/* <img src="../../src/assets/networking-svgrepo-com.svg" /> */}

        <Link to="/service" className="itemNavbar">
          Services
        </Link>
        {/* <img src="../../src/assets/profile-user-svgrepo-com.svg" /> */}
        
        <Link to="/messagerie" className="itemNavbar">
          Messagerie
        </Link>
        <Link to="/compte" className="itemNavbar">
          Profil
        </Link>
        
       
      </div>
    </nav>
  );
}
