import React from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import Box from "../../components/Box/Box";
import "./Authentification.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export default function Authentification() {
  return (
    <div className="formAuthentification">
      <Box style={{ height: "80%", width: "45%" }} id="box">
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titre">Connectez vous</h1>
          <div id="form-div">
            <Form method="get" className="formulaire" id="form">
              <input
                type="text"
                name="id"
                id="idEmail"
                placeholder="Identifiant"
              />
              <input
                type="password"
                name="password"
                id="idPassword"
                placeholder="Mot de passe"
              />
              <ButtonComponent primary link="welcome" id="connect-button">
                <p>Connexion</p>
              </ButtonComponent>
            </Form>
            <Link to="/create-account" className="link" id="create-account">
              <p>Créer un compte</p>
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
}
