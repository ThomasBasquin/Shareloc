import React, { useState,useContext } from "react";

import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { AuthContext } from "../../context/AuthContext";
import "./Compte.css";

export default function Profil() {
  const {logout} = useContext(AuthContext);

  return (
    <>
      <div id="nav-bar">
        <Title title="Profil" id="title" />
        <div className="button-div">
          <div className="button-container">
            <Link to="/colocation">
              <button className="button" id="button-leave">
                Quitter la colocation
              </button>
            </Link>
          </div>
          <div className="button-container">
              <button onClick={logout} className="button" id="button-disconnect">
                Déconnexion
              </button>
          </div>
        </div>
      </div>
      <ShowInfo />
      <EditInfo />
    </>
  );
}

const ShowInfo = () => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [number, setNumber] = useState("06 12 34 56 78");
  const [Password, setPassword] = useState("PetitCoquin");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div
        className="info-container"
        style={{ padding: 15, backgroundColor: "white" }}
      >
        <label className="label">Nom :</label>
        <input
          className="input"
          type="text"
          value={Nom}
          onChange={(e) => setNom(e.target.value)}
          readOnly={true}
        />
        <label className="label">Prénom :</label>
        <input
          className="input"
          type="text"
          value={Prenom}
          onChange={(e) => setPrenom(e.target.value)}
          readOnly={true}
        />
        <label className="label">Email :</label>
        <input
          className="input"
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={true}
        />
        <label className="label">Numéro de portable :</label>
        <input
          className="input"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          readOnly={true}
        />
        <label className="label">Mot de passe :</label>
        <div className="password-container">
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

const EditInfo = () => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [number, setNumber] = useState("06 12 34 56 78");
  const [Password, setPassword] = useState("PetitCoquin");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div
        className="info-container"
        style={{ padding: 15, backgroundColor: "white" }}
      >
        <label className="label">Nom :</label>
        <input
          className="input"
          type="text"
          value={Nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label className="label">Prénom :</label>
        <input
          className="input"
          type="text"
          value={Prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <label className="label">Email :</label>
        <input
          className="input"
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Numéro de portable :</label>
        <input
          className="input"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <label className="label">Mot de passe :</label>
        <div className="password-container">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              handleShowPassword();
            }}
          >
            {!showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    </div>
  );
};
