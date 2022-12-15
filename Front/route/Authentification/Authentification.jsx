import React from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import Box from "../../components/Box/Box";
import "./Authentification.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"

export default function Authentification() {
  return (
    <div className="formAuthentification">
      <Box style={{ height: "700px", width: "60%" }}>
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titre">Connectez vous</h1>
          <Form method="get" className="formulaire">
            <input type="text" name="id" id="idEmail" placeholder="Identifiant"/>
            <input type="password" name="password" id="password" placeholder="Mot de passe"/>
            <ButtonComponent primary link='welcome'><p>Connexion</p></ButtonComponent>
          </Form>
        </div>
      </Box>
    </div>
  );
}
