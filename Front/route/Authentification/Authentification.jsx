import React from "react";
import { Link } from "react-router-dom";

export default function Authentification() {
  return (
    <>
      <h1>Authentification</h1>
      <Link to="/welcome">Accueil</Link><br/>
      <Link to="/colocation">Colocation</Link><br/>
      <Link to="/compte">Compte</Link><br/>
      <Link to="/service">Service</Link><br/>

    </>
  );
}
