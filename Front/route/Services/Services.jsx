import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent.jsx";
import "./Services.css";

export default function Service() {
  const [date, setDate] = useState("25/02/2023");
  const [by, setBy] = useState("Thomas");
  const [pour, setPour] = useState("Roméo");
  const [label, setLabel] = useState("Réparer la porte");
  const [score, setScore] = useState(5);

  return (
    <>
      <Title title="Services" />
      <div className="service-div">
        <ServicesAsked
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
        <ServicesDone
          date={date}
          by={by}
          pour={pour}
          label={label}
          score={score}
        />
      </div>
    </>
  );
}

const ServicesAsked = ({ date, by, pour, label, score }) => {
  return (
    <>
      <div className="service-container">
        <h2 className="service-title">Mes services demandés :</h2>
        <ServiceComponent
          className="service-component"
          date={date}
          by={by}
          pour={pour}
          label={label}
          score={score}
        />
      </div>
    </>
  );
};

const ServicesToDo = ({ date, by, pour, label, score }) => {
  return (
    <>
      <div className="service-container">
        <h2 className="service-title">Mes services :</h2>
        <div className="service-container">
          <ServiceComponent
            className="service-component"
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
};

const ServicesDone = ({ date, by, pour, label, score }) => {
  return (
    <>
      <div className="service-container">
        <h2 className="service-title">Mes services effectués :</h2>
        <div className="service-container">
          <ServiceComponent
            className="service-component"
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
};
