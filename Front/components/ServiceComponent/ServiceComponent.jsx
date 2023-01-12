import React from "react";
import BoxGrise from "../BoxGrise/BoxGrise";
import { COLOR } from "../../constant/Color";
import { Link } from "react-router-dom";
import "./ServiceComponent.css"

const ServiceComponent = ({ navigation, date, by, pour, label, score }) => {
  return (
    
    <div className="" style={{display : 'flex', justifyContent : 'center'}}>
      <Link to="/colocation"></Link>
      <BoxGrise style={{width :'80%', transform: 'scale(1.05)'}}>
        <div
          style={{
            display :'flex',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display : 'flex',alignItems: "center", flexDirection: "row" }}>
            <InfoService date={date} by={by} pour={pour} label={label} />
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

const ScoreService = ({ points, date, by, pour, label }) => {
  return (
    <div className="chevron">
    <p style={{ fontSize: 28, fontWeight: "600", marginTop:4, marginRight :5 }}>
      {points} pts
    </p>
    
    </div>
  );
};

const InfoService = ({ date, by, label }) => {
  return (
    <div style={{display : 'flex', flexDirection: "column" }}>
      <p className="infoService">{label}</p>
      <div className="infoDatePersonne">
      <img src="../../src/assets/calendar-solid.svg" style={{height:25,marginLeft: 19, color: COLOR.jaune}}/>
      <p
        style={{
          marginLeft: 10,
          color: COLOR.bleuFonce,
          padding: 2,
          fontSize: 22,
          fontWeight: "",
        }}
      >
        {date}
      </p>
      <img src="../../src/assets/people-arrows-solid.svg" style={{height:25,marginLeft: 19, color: COLOR.jaune}}/>
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
    </div>
  );
};


export default ServiceComponent;
