import React from "react";
import BoxGrise from "../BoxGrise/BoxGrise";
import { COLOR } from "../../constant/Color";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import "./ServiceComponent.css";
import moment from "moment/moment";

const ServiceComponent = ({ id , date, by, pour, label, score }) => {
  return (
    <div className="" style={{ display: "flex", justifyContent: "center" }}>
      
      <BoxGrise style={{ width: "80%", transform: "scale(1.05)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <InfoService id={id} points={score} date={date} by={by} pour={pour} label={label} />
          </div>
          <ScoreService
            points={score}
            date={date}
            by={by}
            pour={pour}
            label={label}
          />
        </div>
      </BoxGrise>
    </div>
  );
};

const ScoreService = ({ points }) => {
  return (
    <div className="chevron">
      <p
        style={{
          fontSize: 28,
          fontWeight: "600",
          marginTop: 4,
          marginRight: 5,
        }}
      >
        {points} pts
      </p>
    </div>
  );
};

const InfoService = ({ id, points, date, by,pour, label }) => {
  const navigate = useNavigate();
  const details = (service) => {
    
    console.log(service)
    localStorage.setItem("service", JSON.stringify(service));
    navigate("/detailsService");
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="infoService">{label}</p>
      <div className="infoDatePersonne">
        <img
          src="../../src/assets/calendar-solid.svg"
          style={{ height: 25, marginLeft: 19, color: COLOR.jaune }}
        />
        <p
          style={{
            marginLeft: 10,
            color: COLOR.bleuFonce,
            padding: 2,
            fontSize: 22,
            fontWeight: "",
          }}
        >
          {moment(date).format('LL')}
        </p>
        <img
          src="../../src/assets/people-arrows-solid.svg"
          style={{ height: 25, marginLeft: 19, color: COLOR.jaune }}
        />
        <p
          style={{
            marginLeft: 10,
            color: COLOR.bleuFonce,
            padding: 2,
            fontSize: 22,
          }}
        >
          Par {by}
        </p>
      </div>
      <div className="lien">
        <button
          onClick = {()=> details({id, points, date, by, pour, label})}
          style={{
            textDecoration: "none",
            color: COLOR.bleuFonce,
            fontSize: 22,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default ServiceComponent;
