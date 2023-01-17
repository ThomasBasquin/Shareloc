import React,{useState,useEffect,useContext} from "react";
import { Form, Link, Navigate } from "react-router-dom";
import Box from "../../components/Box/Box";
import "./Authentification.css";
import Button from "../../components/Button/Button";
import useFetch from "../../constant/UseFetch";
import URLS from "../../constant/Routes";
import {AuthContext} from "../../context/AuthContext";

export default function Authentification() {
  const {login}=useContext(AuthContext);

  function loginHandle(){
    login(email,password)
    .catch(err =>{
      if(err.code===401){
        setError({...err,message:"L'email ou le mot de passe est incorrect"});
      }else{
        setError(err);
      }
    })
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className="formAuthentification">
      <Box style={{ height: "80%", width: "45%" }} id="box">
        <div className="form">
          <img src="../../src/assets/logo.png" className="imgAuthen" />
          <h1 className="titre">Connectez vous</h1>
          <div id="form-div">
            <Form method="get" className="formulaire" id="form">
              <input
                name="id"
                id="idEmail"
                placeholder="Identifiant"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="idPassword"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button onClick={loginHandle} primary id="connect-button">
                Connexion
              </Button>
            </Form>
            <Link to="/create-account" className="link" id="create-account">
              Créer un compte
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
}
