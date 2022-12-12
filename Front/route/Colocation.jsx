import React from "react";
import { Link } from "react-router-dom";

export default function Colocation() {
  return (
    <>
      <h1>Colocation</h1>
      <Link to="/welcome">Accueil</Link><br/>
      <Link to="/login">Authentification</Link><br/>
      <Link to="/compte">Compte</Link><br/>
      <Link to="/service">Service</Link><br/>

    </>
  );
}
