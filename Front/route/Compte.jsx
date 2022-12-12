import React from "react";
import { Link } from "react-router-dom";

export default function Compte() {
  return (
    <>
      <h1>Compte</h1>
      <Link to="/welcome">Accueil</Link><br/>
      <Link to="/login">Authentification</Link><br/>
      <Link to="/colocation">Colocation</Link><br/>
      <Link to="/service">Service</Link><br/>

    </>
  );
}
