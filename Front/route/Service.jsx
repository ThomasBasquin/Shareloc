import React from "react";
import { Link } from "react-router-dom";

export default function Service() {
  return (
    <>
      <h1>Service</h1>
      <Link to="/welcome">Accueil</Link><br/>
      <Link to="/login">Authentification</Link><br/>
      <Link to="/colocation">Colocation</Link><br/>
      <Link to="/compte">Compte</Link><br/>
    </>
  );
}
