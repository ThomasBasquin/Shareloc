import React from "react";
import BoxGrise from "../BoxGrise/BoxGrise";
import { COLOR } from "../../constant/Color";


const ServiceComponent = ({ navigation, date, by, pour, label, score }) => {
  return (
    <div>
      <BoxGrise>
        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignItems: "center", flexDirection: "row" }}>
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
    <p style={{ fontSize: 21, fontWeight: "600" }}>
      {points} pts
    </p>
  );
};

const InfoService = ({ date, by, label }) => {
  return (
    <div style={{ flexDirection: "column" }}>
      <p className="infoService">{label}</p>
      <p
        style={{
          marginLeft: 10,
          color: COLOR.bleuFonce,
          padding: 2,
          fontSize: 12,
          fontWeight: "",
        }}
      >
        {date}
      </p>
      <p
        style={{
          marginLeft: 10,
          color: COLOR.bleuFonce,
          padding: 2,
          fontSize: 12,
        }}
      >
        Par {by}
      </p>
    </div>
  );
};


export default ServiceComponent;
