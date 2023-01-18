import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent.jsx";
import { COLOR } from "../../constant/color";
import PointsCounter from "../../components/PointsCounter/PointsCounter";

import "./Services.css";

export default function Service() {
  const [date, setDate] = useState("25/02/2023");
  const [by, setBy] = useState("Thomas");
  const [pour, setPour] = useState("Roméo");
  const [label, setLabel] = useState("Réparer la porte");
  const [score, setScore] = useState(5);

  const handleAdd = () => {
    console.log("add");
  };

  return (
    <>
      <div id="header">
        <Title title="Services" />
        <div id="right-header">
          <PointsCounter points={80} />
          <button id="add-service-button" onClick={handleAdd()}>
            <p>Ajouter un service</p>
          </button>
        </div>
      </div>
      <div className="service-div" style={{ backgroundColor: COLOR.bleuFonce }}>
        <div className="service-container">
          <h2 className="service-title" style={{ color: COLOR.jaune }}>
            Mes services demandés :
          </h2>
          <ServicesAsked
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesAsked
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesAsked
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
        </div>
        <div className="service-container">
          <h2 className="service-title" style={{ color: COLOR.jaune }}>
            Mes services en cours :
          </h2>
          <ServicesToDo
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesToDo
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesToDo
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
        </div>
        <div className="service-container">
          <h2 className="service-title" style={{ color: COLOR.jaune }}>
            Mes services effectués :
          </h2>
          <ServicesDone
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesDone
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
          <ServicesDone
            date={date}
            by={by}
            pour={pour}
            label={label}
            score={score}
          />
        </div>
      </div>
    </>
  );
}

const ServicesAsked = ({ date, by, pour, label, score }) => {
  return (
    <>
      <ServiceComponent
        className="service-component"
        date={date}
        by={by}
        pour={pour}
        label={label}
        score={score}
      />
    </>
  );
};

const ServicesToDo = ({ date, by, pour, label, score }) => {
  return (
    <>
      <ServiceComponent
        className="service-component"
        date={date}
        by={by}
        pour={pour}
        label={label}
        score={score}
      />
    </>
  );
};

const ServicesDone = ({ date, by, pour, label, score }) => {
  return (
    <>
      <ServiceComponent
        className="service-component"
        date={date}
        by={by}
        pour={pour}
        label={label}
        score={score}
      />
    </>
  );
};
