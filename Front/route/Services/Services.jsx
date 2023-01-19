import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent.jsx";
import { COLOR } from "../../constant/color";
import PointsCounter from "../../components/PointsCounter/PointsCounter";
import Button from "../../components/Button/Button";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../constant/UseFetch";
import URLS from "../../constant/Routes";
import "./Services.css";
import moment from "moment";

export default function Service() {
  const [date, setDate] = useState("25/02/2023");
  const [by, setBy] = useState("Thomas");
  const [pour, setPour] = useState("Roméo");
  const [label, setLabel] = useState("Réparer la porte");
  const [score, setScore] = useState(5);
  const [showAdd, setShowAdd] = useState(false);

  const [modalVisibility, setModalVisibility] = useState(false);

  const [title, setTitle] = useState("");
  const [performer, setPerformer] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [cost, setCost] = useState(0);
  const { user } = useContext(UserContext);

  const [openPickerPerformer, setOpenPickerPerformer] = useState(false);
  const [openPickerRecipient, setOpenPickerRecipient] = useState(false);
  const [recipientServices, setRecipientServices] = useState([]);
  const [performerServices, setPerformerServices] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleReturn = () => {
    setShowAdd(!showAdd);
  };
  function fetchServices() {
    let promiseAll = [];
    promiseAll.push(
      useFetch(URLS.getServicesRecipient.replace("{user}", user.id))
    );
    promiseAll.push(
      useFetch(URLS.getServicesPerformer.replace("{user}", user.id))
    );
    if (user.colocation) {
      useFetch(
        URLS.getCollocation.replace("{collocation}", user.colocation)
      ).then((c) =>
        setMembers(
          c.members.map((m) => ({
            label: m.firstname + " " + m.lastname,
            value: m.id,
          }))
        )
      );
    }

    Promise.all(promiseAll).then(([recipient, performer]) => {
      setRecipientServices(recipient);
      setPerformerServices(performer);
      setTitle("");
      setPerformer(null);
      setRecipient(null);
      setCost(0);
      setModalVisibility(false);
    });
  }

  const annuler = () => {
    setModalVisibility(!modalVisibility);
    setTitle("");
    setPerformer(null);
    setRecipient(null);
    setCost(0);
  };

  const valider = () => {
    useFetch(URLS.createService, "POST", {
      title,
      performer,
      recipient,
      cost,
      collocation: user.colocation,
    })
      .then(() => {
        fetchServices();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className={`blur-background ${showAdd ? "active" : ""}`}>
        <div id="header">
          <Title title="Services" />
          <div id="right-header">
            <PointsCounter id="counter-services" points={user.points} />
            {user.colocation !== null ? (
              <Button
                id="add-service-button"
                primary
                onClick={() => handleAdd()}
              >
                <p>Ajouter un service</p>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {showAdd ? <AddService handleReturn={handleReturn} /> : null}
      <div className={`blur-background ${showAdd ? "active" : ""}`}>
        <div
          className="service-div"
          style={{ backgroundColor: COLOR.bleuFonce }}
        >
          <div className="service-container">
            <h2 className="service-title" style={{ color: COLOR.jaune }}>
              Mes services demandés :
            </h2>
            {performerServices.length ? (
              performerServices.filter(s=>s.validatedAt==null).map((s) => (
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
              <p>Vous n'avez aucun services en tant que actionnaire</p>
            )}
          </div>
          <div className="service-container">
            <h2 className="service-title" style={{ color: COLOR.jaune }}>
              Mes services en cours :
            </h2>
            {recipientServices.length ? (
              recipientServices.filter(s=>s.validatedAt==null).map((s) => (
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
              <p>Vous n'avez aucun services en tant que bénéficiaire</p>
            )}
          </div>
          <div className="service-container">
            <h2 className="service-title" style={{ color: COLOR.jaune }}>
              Mes services effectués :
            </h2>
            {[...recipientServices, ...performerServices].filter(
              (s) => s.validatedAt !== null
            ).length ? (
              [...recipientServices, ...performerServices]
                .filter((s) => s.validatedAt !== null)
                .map((s) => (
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
              <p>Vous n'avez aucun services terminés</p>
            )}
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

const AddService = ({ handleReturn }) => {
  return (
    <div className="add-service" id="add-service">
      <h2 className="add-service-title">Ajouter un service</h2>
      <div className="add-service-container">
        
        <div className="add-service-input">
          <label className="add-service-label">Pour :</label>
          <input
            // className="add-service-input"
            type="text"
            name="pour"
            placeholder="Pour"
          />
        </div>
        <div className="add-service-input">
          <label className="add-service-label">Label :</label>
          <input
            // className="add-service-input"
            type="text"
            name="label"
            placeholder="Label"
          />
        </div>
        <div className="add-service-input">
          <label className="add-service-label">Score :</label>
          <input
            // className="add-service-input"
            type="number"
            name="score"
            min="0"
            placeholder="Score"
          />
        </div>
      </div>
      <div className="add-service-button">
        <Button className="button-modal" primary>
          <p>Valider</p>
        </Button>
        <Button className="button-modal" red onClick={() => handleReturn()}>
          <p>Retour</p>
        </Button>
      </div>
    </div>
  );
};
