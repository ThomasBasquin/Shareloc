import React from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./CreationCompte.css";
import Box from "../../components/Box/Box";

export default function CreationCompte() {
  return (
    <div className="formInscription">
      <Box style={{ height: "90%", width: "60%" }}>
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titreInscription">Création de compte</h1>
          <Form method="get" className="formulaireInscription">
            <div id="identity-form">
              <label htmlFor="nom" className="label">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                placeholder="Ex : Dupont"
              />
              <label htmlFor="prenom" className="label">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                placeholder="Ex : Jean"
              />
            </div>
            <div id="email-form" className="div-alone">
              <label htmlFor="email" className="label label-alone">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ex : JeanDupont@gmail.com"
                className="input-alone"
              />
            </div>
            <div id="password-form" className="div-alone">
              <label htmlFor="password" className="label" id="password-label">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Ex : jadorecettelicence"
                className="input-alone"
              />
            </div>
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
