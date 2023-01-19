import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent.jsx";
import { COLOR } from "../../constant/color";
import PointsCounter from "../../components/PointsCounter/PointsCounter";
import Button from "../../components/Button/Button";
import { UserContext } from "../../context/UserContext";
import "./Services.css";

export default function Service() {
  const [date, setDate] = useState("25/02/2023");
  const [by, setBy] = useState("Thomas");
  const [pour, setPour] = useState("Roméo");
  const [label, setLabel] = useState("Réparer la porte");
  const [score, setScore] = useState(5);
  const [showAdd, setShowAdd] = useState(false);

  const { user } = useContext(UserContext);

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <>
      <div className={`blur-background ${showAdd ? "active" : ""}`}>
        <div id="header">
          <Title title="Services" />
          <div id="right-header">
            <PointsCounter id="counter-services" points={user.points} />
            <Button id="add-service-button" primary onClick={() => handleAdd()}>
              <p>Ajouter un service</p>
            </Button>
          </div>
        </div>
      </div>
      {showAdd ? <AddService /> : null}
      <div className={`blur-background ${showAdd ? "active" : ""}`}>
        <div
          className="service-div"
          style={{ backgroundColor: COLOR.bleuFonce }}
        >
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

const AddService = () => {
  return (
    <div className="add-service" id="add-service">
      <h2 className="add-service-title">Ajouter un service</h2>
      <div className="add-service-container">
        <div className="add-service-input">
          <label className="add-service-label">Date</label>
          <input
            className="add-service-input"
            type="date"
            name="date"
            placeholder="Date"
          />
        </div>
        <div className="add-service-input">
          <label className="add-service-label">Pour</label>
          <input
            className="add-service-input"
            type="text"
            name="pour"
            placeholder="Pour"
          />
        </div>
        <div className="add-service-input">
          <label className="add-service-label">Label</label>
          <input
            className="add-service-input"
            type="text"
            name="label"
            placeholder="Label"
          />
        </div>
        <div className="add-service-input">
          <label className="add-service-label">Score</label>
          <input
            className="add-service-input"
            type="number"
            name="score"
            placeholder="Score"
          />
        </div>
      </div>
      <div className="add-service-button">
        <Button primary>
          <p>Valider</p>
        </Button>
      </div>
    </div>
  );
};
