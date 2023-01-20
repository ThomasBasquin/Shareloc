import React, { useState, useContext } from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./CreationCompte.css";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/AuthContext";

export default function CreationCompte() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);

  function registerHandle() {
    
    if (user.password !== user.confirmPassword) {
      setError({ message: "Les mots de passe ne sont pas identique" });
      return;
    }
    register(user.email, user.firstname, user.lastname, user.password).catch(
      (err) =>
        setError({
          message:
            err.status == 409
              ? "Cette email a déjà un compte"
              : "Une erreur est survenue lors de la création de votre compte",
        })
    );
  }

  function returnHandle() {
    window.location.href = "/";
  }

  return (
    <div className="formInscription">
      <Box style={{ height: "90%", width: "50%" }}>
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titreInscription">Création de compte</h1>
          {error ? (
            <div
              style={{
                width: "100%",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50px",
                padding: ".5rem",
              }}
            >
              {error.message}
            </div>
          ) : null}
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
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
              <label htmlFor="prenom" className="label">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                placeholder="Ex : Jean"
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
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
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div id="confirm-form" className="div-alone">
              <label
                htmlFor="confirmPassword"
                className="label"
                id="confirm-label"
              >
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                name="password"
                id="confirmPassword"
                placeholder="••••••••••"
                className="input-alone"
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
            </div>
          </Form>
          <div className="button-div">
            <Button onClick={returnHandle} red id="return-button">
              Retour
            </Button>
            <Button onClick={registerHandle} primary id="create-button">
              Créer mon compte
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
