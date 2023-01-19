import React, { useDebugValue, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Box from "../../components/Box/Box";
import "./Colocation.css";
import { COLOR } from "../../constant/color";
import Title from "../../components/Title/Title";
import BoxGrise from "../../components/BoxGrise/BoxGrise";
import ServiceComponent from "../../components/ServiceComponent/ServiceComponent";
import useFetch from "../../constant/UseFetch";
import URLS from "../../constant/Routes";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

export default function Colocation() {
  const { user, setUserInfo } = useContext(UserContext);

  const [colocation, setColocation] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (!user.colocation) {
      useFetch(URLS.getInvitations).then(setInvitations);
    } else {
      let promiseAll = [];
      promiseAll.push(
        useFetch(
          URLS.getServicesFromColocation.replace(
            "{collocation}",
            user.colocation
          )
        )
      );
      promiseAll.push(
        useFetch(URLS.getCollocation.replace("{collocation}", user.colocation))
      );

      Promise.all(promiseAll).then(([services, colocation]) => {
        setServices(services);
        setColocation(colocation);
      });
    }
  }, [user]);

  function answerInvitation(invitation, accepted) {
    useFetch(
      URLS.answerInvitation.replace("{invitation}", invitation.id),
      "PUT",
      {
        accepted,
      }
    ).then(() => {
      setInvitations(invitations.filter((i) => i.id !== invitation.id));
      if (accepted) {
        setUserInfo({ ...user, colocation: invitation.collocation.id });
      }
    });
  }

  return (
    <>
      {user.colocation && colocation && services.length ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title title="Colocation" />

            <Resume colocation={colocation} services={services}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Classement  members={colocation.members}
              manager={colocation.manager}/>
            <ServicesColoc services={services}/>
          </div>
        </div>
      ) : (
        <div>
          <p>Vous n'avez pas de colocation en cours</p>
          <p>Mes invitations :</p>
          <div>
            {invitations.length ? (
              invitations.map((i) => (
                <div
                  style={{
                    margin: "2.5%",
                    borderRadius: 15,
                    padding: 20,
                    backgroundColor: COLOR.gris,
                  }}
                >
                  <p
                    style={{ fontSize: 20, color: COLOR.bleuFonce }}
                  >{`Invitation de ${i.sender.firstname} ${i.sender.lastname} pour rejoindre la colocation ${i.collocation.name}`}</p>
                  <div
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <button onClick={() => answerInvitation(i, false)}>
                      <p>Rejeter</p>
                    </button>
                    <button
                      primary
                      onClick={() => answerInvitation(i, true)}
                    >
                      <p>Rejoindre</p>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Vous n'avez pas d'invitations.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const Resume = ({colocation,services}) => {
  return (
    <div className="resume">
      <Box style={{ width: "60%", marginRight: 700, marginTop: 40 }}>
        <div className="text-white">
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <h1 style={{ fontWeight: 500, fontSize: 38 }}>Résumé</h1>
          </div>
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Participants</p>
                <p className="valeurItemResume">{colocation.members.length}</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Services</p>
                <p className="valeurItemResume">{services.length}</p>
              </div>
            </Box>
          </div>
          <div className="itemResume">
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Points</p>
                <p className="valeurItemResume">{colocation.members.reduce((accumulator,m)=>accumulator+m.points,0)}</p>
              </div>
            </Box>
            <Box
              style={{
                backgroundColor: COLOR.bleuFonce,
                width: 200,
                display: "flex",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="titreItemResume">Top coloc</p>
                <p className="valeurItemResume">{colocation.members.reduce((accumulator,m)=>{
                  if(accumulator){
                    return (accumulator.points > m.points ? accumulator : m )
                  }else{
                    return m;
                  }
                },null).firstname}</p>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

const Classement = ({members,manager}) => {
  return (
    <BoxGrise
      style={{ width: "50%", backgroundColor: COLOR.bleuFonce, padding: 20 }}
    >
      <h1 className="titleClassement">Participants :</h1>
      <ItemClassement prenom={manager.firstname} role={"Créateur"} points={manager.points} />
        {members.filter(m => m.id!==manager.id).map(m => (
          <ItemClassement prenom={m.firstname} role={"Membre"} points={m.points} />
        )) }
    </BoxGrise>
  );
};
const ServicesColoc = ({services}) => {
  return (
    <Box
      style={{
        margin: 20,
        width: "50%",
        height: 600,
        backgroundColor: COLOR.bleuFonce,
      }}
    >
      <p className="titreServicesEncoursColoc">
        Les services en cours de la coloc :
      </p>
      <div style={{overflow : 'scroll', maxHeight : 450, overflowX : "hidden", }}>
      {services.map(s => (
        <ServiceComponent
          id={s.id}
          date={moment(s.createdAt).format("LL")}
          by={s.performer.firstname}
          pour={s.recipient.firstname}
          label={s.title}
          score={s.cost}
        />
      ))}
      
      
      </div>
        
    </Box>
  );
};

const ItemClassement = ({ prenom, role, points }) => {
  return (
    <div className="itemParticipants">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="prenom">{prenom}</p>
        <p className="role">({role})</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p className="nbPoints">{points}</p>
        <p style={{ color: COLOR.jaune, fontSize: 35 }}>pts</p>
      </div>
    </div>
  );
};
