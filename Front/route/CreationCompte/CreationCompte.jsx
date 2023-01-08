import React from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./CreationCompte.css";
import Box from "../../components/Box/Box";

export default function CreationCompte() {
  return (
    <div className="formInscription">
      <Box style={{ height: "880px", width: "60%" }}>
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titreInscription">Création de compte</h1>
          <Form method="get" className="formulaireInscription">
            <input type="text" name="nom" id="nom" placeholder="Nom" />
            <br />
            <input type="text" name="prenom" id="prenom" placeholder="Prénom" />
            <br />
            <input type="email" name="email" id="email" placeholder="Email" />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
            />
            <br />
            <input
              type="password"
              name="password"
              id="confirmPassword"
              placeholder="Confirmer le mot de passe"
            />
            <br />
            <ButtonComponent primary link="login">
              <p>Créer mon compte</p>
            </ButtonComponent>
          </Form>
        </div>
      </Box>
    </div>
  );
}
