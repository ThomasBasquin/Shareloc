import React from "react";
import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <>
      <h1>Accueil</h1>
      <Link to="/login">Authentification</Link><br/>
      <Link to="/colocation">Colocation</Link><br/>
      <Link to="/compte">Compte</Link><br/>
      <Link to="/service">Service</Link><br/>

    </>
  );
}
