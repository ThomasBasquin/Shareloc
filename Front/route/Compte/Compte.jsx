import React, { useState, useContext } from "react";

import Title from "../../components/Title/Title";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import URLS from "../../constant/Routes";
import useFetch from "../../constant/UseFetch";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import "./Compte.css";

export default function Profil() {
  const { logout } = useContext(AuthContext);
  const {user, setUserInfo} = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const handleEditable = () => {
    setEditable(!editable);
  };

  const quit = () => {
    useFetch(
      URLS.leaveColocation.replace("{user}", user.id)
    ).then(()=>{
      setUserInfo({...user, colocation:null});
      navigate("/colocation")
    });
  }
  return (
    <>
      <div id="account-bar">
        <Title title="Profil" id="title" />
        <div className="button-div">
          <div className="button-container">
            {user.colocation !== null ? <button className="button" id="button-leave" onClick={()=> quit()}>
                Quitter la colocation
              </button> : null}
              
            
          </div>
          <div className="button-container">
            <button onClick={logout} className="button" id="button-disconnect">
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="parent-div">
        {!editable ? <ShowInfo /> : <EditInfo />}

        <button id="edit-button" onClick={() => handleEditable()}>
          {!editable ? "Modifier" : "Enregistrer"}
        </button>
      </div>
    </>
  );
}

const ShowInfo = () => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [number, setNumber] = useState("06 12 34 56 78");
  const [Password, setPassword] = useState("PetitCoquin");

  return (
    <div>
      <div
        className="info-container"
        style={{ padding: 25, backgroundColor: "white" }}
      >
        <div className="name-div info-div">
          <div id="name-div">
            <label className="label">Nom :</label>
            <input
              className="input"
              type="text"
              value={Nom}
              onChange={(e) => setNom(e.target.value)}
              readOnly={true}
            />
          </div>
          <div id="first-name-div">
            <label className="label">Prénom :</label>
            <input
              className="input"
              type="text"
              value={Prenom}
              onChange={(e) => setPrenom(e.target.value)}
              readOnly={true}
            />
          </div>
        </div>
        <div className="alone-div info-div">
          <label className="label" id="alone-label">
            Email :
          </label>
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={true}
            id="alone-input"
          />
        </div>
        <div className="alone-div info-div">
          <label className="label" id="alone-label">
            Numéro de portable :
          </label>
          <input
            className="input"
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            readOnly={true}
            id="alone-input"
          />
        </div>
        <div className="alone-div info-div">
          <label className="label" id="alone-label">
            Mot de passe :
          </label>
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={true}
            id="alone-input"
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
