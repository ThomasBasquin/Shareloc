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
  const service = JSON.parse(localStorage.getItem("service"));
  console.log(service);
  const [points, setPoints] = useState(service.points);
  const [date, setDate] = useState(service.date);
  const [by, setBy] = useState(service.by);
  const [pour, setPour] = useState(service.pour);
  const [label, setLabel] = useState(service.label);

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
