import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import Title from "../../components/Title/Title"
import BoxGrise from "../../components/BoxGrise/BoxGrise"
export default function Accueil() {
  return (
    <>
    <Navbar />
      <Title title="Accueil" />
      <BoxGrise><p>CC</p></BoxGrise>
      

    </>
  );
}
