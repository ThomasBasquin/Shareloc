import React, { useState } from "react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";

export default function Colocation() {
  return (
    <>
      <Navbar />
      <Title title="Profil" />
      <ShowInfo />
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
        <div
          className="password-container"
          style={{
            display: "flex",
            alignItems: "center",
            borderWidth: 1,
            width: 275,
            height: 40,
            marginLeft: 0,
            marginTop: 7,
            marginBottom: 15,
            borderColor: "gris",
            borderRadius: 15,
          }}
        >
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={true}
            style={{
              width: 240,
              borderWidth: 0,
              margin: 0,
              padding: 0,
              marginBottom: 7,
              marginLeft: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};
