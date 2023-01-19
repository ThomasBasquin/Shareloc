import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../constant/UseFetch";
import Title from "../../components/Title/Title";
import Box from "../../components/Box/Box";
import { COLOR } from "../../constant/color";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import PointsCounter from "../../components/PointsCounter/PointsCounter";
import { UserContext } from "../../context/UserContext";
import URLS from "../../constant/Routes";
import moment from "moment";
import "./Accueil.css";
export default function Accueil() {
  const [services, setServices] = useState([]);

  const { user } = useContext(UserContext);
  console.log({ user });

  useEffect(() => {
    useFetch(URLS.getServicesRecipient.replace("{user}", user.id)).then(
      setServices
    );
  }, []);

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
          <Title title={"Bonjour, " + user.firstname + "."} />
          <PointsCounter points={user.points} />
        </div>
        <ServicesEnCours services={services} />
      </div>
    </>
  );
}

const ServicesEnCours = ({ services }) => {
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
        style={{
          margin: 20,
          width: 1600,
          backgroundColor: COLOR.bleuFonce,
          minHeight: "37.5em",
        }}
      >
        <p className="titreServicesEnCours">Mes services en cours :</p>
        <div className="servicesEnCours">
          {services.length ? (
            services.map((s) => (
              <ServiceComponent
                id={s.id}
                date={moment(s.createdAt).format("LL")}
                by={s.performer.firstname}
                pour={s.recipient.firstname}
                label={s.title}
                score={s.cost}
              />
            ))
          ) : (
            <p style={{ marginLeft: 20, color: "white", fontSize: 20 }}>
              Vous n'avez aucun service en cours.
            </p>
          )}
        </div>
      </Box>
    </div>
  );
};
