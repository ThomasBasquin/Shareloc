import React, { useDebugValue } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Box from "../../components/Box/Box";
import "./Colocation.css";
import { COLOR } from "../../constant/color";
import Title from "../../components/Title/Title";
import BoxGrise from "../../components/BoxGrise/BoxGrise";
export default function Colocation() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title title="Colocation" />
        <Resume />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Classement />
        <ServicesColoc />
      </div>
    </>
  );
}

const Resume = () => {
  return (
    <div className="resume">
      <Box style={{ width: "60%", marginRight: 700, marginTop: 40 }}>
        <div className="text-white">
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <h1 style={{ fontWeight: 500, fontSize: 38 }}>Résumé</h1>
          </div>
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Participants</p>
                <p className="valeurItemResume">5</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Services</p>
                <p className="valeurItemResume">12</p>
              </div>
            </Box>
          </div>
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Points</p>
                <p className="valeurItemResume">667</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Top coloc</p>
                <p className="valeurItemResume">Hugo</p>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

const Classement = () => {
  return (
    <BoxGrise style={{ width: "50%", backgroundColor : COLOR.bleuFonce, padding:20 }}>
      <h1 className="titleClassement">Classement :</h1>
      <ItemClassement prenom="Roméo" role="créateur" points={76} />
      <ItemClassement prenom="Thomas" role="participant" points={50} />
      <ItemClassement prenom="Hugo" role="participant" points={35} />
      <ItemClassement prenom="Gaytan" role="participant" points={14} />
      <ItemClassement prenom="Lucas" role="participant" points={0} />
    </BoxGrise>
  );
};
const ServicesColoc = () => {
  return <div>cc</div>;
};

const ItemClassement = ({ prenom, role, points }) => {
  return (
    <div className="itemParticipants">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="prenom">{prenom}</p>
        <p className="role">({role})</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="nbPoints">{points}</p>
        <p style={{ color: COLOR.jaune, fontSize:35 }}>pts</p>
      </div>
    </div>
  );
};
