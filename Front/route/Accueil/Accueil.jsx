import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import BoxGrise from "../../components/BoxGrise/BoxGrise";
import Box from "../../components/Box/Box";
import { COLOR } from "../../constant/color";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import PointsCounter from "../../components/PointsCounter/PointsCounter";
import "./Accueil.css";
export default function Accueil() {
  const [nom, setNom] = useState("Roméo");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title title={"Bonjour, " + nom + "."} />
          <PointsCounter points={80} />
        </div>
        <ServicesEnCours />
      </div>
    </>
  );
}

const ServicesEnCours = () => {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{ margin: 20, width: 1600, backgroundColor: COLOR.bleuFonce }}
      >
        <p className="titreServicesEnCours">Mes services en cours :</p>
        <div className="servicesEnCours">
          <ServiceComponent
            date="18/02/2022"
            by="Hugo"
            pour="Roméo"
            label="Passer l'aspirateur"
            score={10}
          />
          <ServiceComponent
            date="19/02/2022"
            by="Lucas"
            pour="Roméo"
            label="Embrasser Roméo"
            score={12}
          />
          <ServiceComponent
            date="25/12/2022"
            by="Thomas"
            pour="Roméo"
            label="Faire le repas de Noël"
            score={25}
          />
          <ServiceComponent
            date="15/12/2022"
            by="Thomas"
            pour="Roméo"
            label="Me faire des bisous"
            score={25}
          />
          <ServiceComponent
            date="25/12/2022"
            by="Thomas"
            pour="Roméo"
            label="Me faire des bisous"
            score={25}
          />
          <ServiceComponent
            date="25/12/2022"
            by="Thomas"
            pour="Roméo"
            label="Me faire des bisous"
            score={25}
          />
          <ServiceComponent
            date="25/12/2022"
            by="Thomas"
            pour="Roméo"
            label="Me faire des bisous"
            score={25}
          />
        </div>
      </Box>
    </div>
  );
};
