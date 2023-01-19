import React, { useState } from "react";
import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import BoxGrise from "../../components/BoxGrise/BoxGrise";
import Box from "../../components/Box/Box";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import { COLOR } from "../../constant/color";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Button from "../../components/Button/Button";
import "./DetailsService.css";
export default function DetailsService() {
  const [points, setPoints] = useState(5);
  const [date, setDate] = useState("20/12/2022");
  const [by, setBy] = useState("Hugo");
  const [pour, setPour] = useState("Roméo");
  const [label, setLabel] = useState("La vaisselle");

  return (
    <div className="">
      <Title title={label} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BoxGrise style={{ width: "70%", height: 530, alignItems: "center" }}>
          <h2 className="detail-title">Détails du service</h2>
          <Details points={points} date={date} by={by} pour={pour} />
          <div className="button-details-div">
            <Link to="/" style={{ margin: 20 }}>
              <Button className="button" id="button-validate" primary>
                Valider le service
              </Button>
            </Link>
            <Link to="/" style={{ margin: 20 }}>
              <Button className="button" id="button-return-details" red>
                Retour
              </Button>
            </Link>
          </div>
        </BoxGrise>
      </div>
      <div className="centre"></div>
    </div>
  );
}

const Details = ({ points, date, by, pour }) => {
  return (
    <div className="">
      <div className="text-white">
        <div className="itemResume">
          <Box
            style={{
              backgroundColor: COLOR.bleuFonce,
              width: "30%",
              display: "flex",
              justifyContent: "center",
              margin: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="detail-div">
                <p className="valeurItemResume">{points}</p>
                <p className="titreItemResume"> Points</p>
              </div>
            </div>
          </Box>
          <Box
            style={{
              backgroundColor: COLOR.bleuFonce,
              width: "30%",
              display: "flex",
              justifyContent: "center",
              margin: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="detail-div">
                <p className="titreItemResume">Fait le </p>
                <p className="valeurItemResume">{date}</p>
              </div>
            </div>
          </Box>
        </div>
        <div className="itemResume">
          <Box
            style={{
              backgroundColor: COLOR.bleuFonce,
              width: "30%",
              display: "flex",
              justifyContent: "center",
              margin: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="detail-div">
                <p className="titreItemResume">De </p>
                <p className="valeurItemResume">{by}</p>
              </div>
            </div>
          </Box>
          <Box
            style={{
              backgroundColor: COLOR.bleuFonce,
              width: "30%",
              display: "flex",
              justifyContent: "center",
              margin: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="detail-div">
                <p className="titreItemResume">Pour</p>
                <p className="valeurItemResume">{pour}</p>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
