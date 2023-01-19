import React, {
  useDebugValue,
  useContext,
  useEffect,
  useState,
  Select,
} from "react";
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
import Button from "../../components/Button/Button";
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

            <Resume colocation={colocation} services={services} />
          </div>
          {colocation.manager.id === user.id && (
            <>
              <InviteMembers user={user} />
            </>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Classement
              members={colocation.members}
              manager={colocation.manager}
            />
            <ServicesColoc services={services} />
          </div>
          {colocation.manager.id === user.id && (
            <>
              <InviteMembers user={user} />
            </>
          )}
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
                    <button primary onClick={() => answerInvitation(i, true)}>
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

const InviteMembers = ({ user }) => {
  const [userWithoutColocation, setUserWithoutColocation] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  function getUsersWithoutColocation() {
   
    useFetch(URLS.getUsersWithoutColocation).then((users) =>
      setUserWithoutColocation(
        users.map((u) => ({
          label: u.firstname + " " + u.lastname,
          value: u.id,
        }))
      )
    );
  }

  function sendInvitation() {
    useFetch(URLS.createInvitation, "POST", {
      collocation: user.colocation,
      sender: user.id,
      receipter: selectedUser,
    }).then((e) => {
      setModalVisible(false);
    });
  }

  
  getUsersWithoutColocation();
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Box>
        <label for="listMembres">Inviter un membre</label>
        <select name="listMembres" value={selectedUser} OnChange={e=>setSelectedUser(e.target.value)}>
          <option value=""></option>
          {userWithoutColocation.map((u) => (<option value={u.id}>{u.label}</option>))}
        </select>
      </Box>
    </div>
  );
};

const Resume = ({ colocation, services }) => {
  
  return (
    <div className="resume">
      <Box style={{ width: "56rem", marginRight: "2.5em", marginTop: 70 }}>
        <div className="text-white">
          <div
            style={{ display: "flex", justifyContent: "center", margin: 10 }}
          >
            <h1 style={{ fontWeight: 500, fontSize: 38 }}>{colocation.name}</h1>
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
                <p className="valeurItemResume">
                  {colocation.members.reduce(
                    (accumulator, m) => accumulator + m.points,
                    0
                  )}
                </p>
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
                <p className="valeurItemResume">
                  {
                    colocation.members.reduce((accumulator, m) => {
                      if (accumulator) {
                        return accumulator.points > m.points ? accumulator : m;
                      } else {
                        return m;
                      }
                    }, null).firstname
                  }
                </p>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

const Classement = ({ members, manager }) => {
  return (
    <BoxGrise
      style={{
        width: "65rem",
        backgroundColor: COLOR.bleuFonce,
        padding: 20,
        margin: 20,
      }}
    >
      <h1 className="titleClassement">Participants :</h1>
      <ItemClassement
        prenom={manager.firstname}
        role={"Créateur"}
        points={manager.points}
      />
      {members
        .filter((m) => m.id !== manager.id)
        .map((m) => (
          <ItemClassement
            prenom={m.firstname}
            role={"Membre"}
            points={m.points}
          />
        ))}
    </BoxGrise>
  );
};
const ServicesColoc = ({ services }) => {
  return (
    <BoxGrise
      style={{
        margin: 20,
        padding: 20,
        width: "65rem",
        height: 600,
        backgroundColor: COLOR.bleuFonce,
      }}
    >
      <p className="titreServicesEncoursColoc">
        Services en cours dans la coloc :
      </p>
      <div style={{ overflow: "scroll", maxHeight: 450, overflowX: "hidden" }}>
        {services.map((s) => (
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
    </BoxGrise>
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
