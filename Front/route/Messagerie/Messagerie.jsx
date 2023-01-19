import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../constant/UseFetch";
import Box from "../../components/Box/Box";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { COLOR } from "../../constant/color";
import Button from "../../components/ButtonComponent/ButtonComponent";
import { UserContext } from "../../context/UserContext";
import URLS from "../../constant/Routes";
import moment from "moment-with-locales-es6";
import "./Messagerie.css";

moment.locale("fr");

export default function Messagerie() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    useFetch(
      URLS.getMessageFromColocation.replace("{idColoc}", user.colocation)
    ).then(setMessages);
  }, []);

  console.log({ messages });
  return (
    <div className="">
      <Title title="Messagerie" id="title" />
      <Discussion messages={messages} setMessages={setMessages} user={user} />
    </div>
  );
}

const Discussion = ({ messages, setMessages, user }) => {
  return (
    <div className="center">
      <Box style={{ width: "80%", height: 650 }}>
        <div style={{ overflow: "scroll", overflowX: "none", height: "100%" }}>
          {messages.length ? (
            messages.map((m) => {
              const messageDate = moment(m.sendAt);
              const today = moment();
              const yesterday = moment().subtract(1, "days");

              let messageDateFormatted;
              if (messageDate.isSame(today, "day")) {
                messageDateFormatted = messageDate.format(" à HH:mm");
              } else if (messageDate.isSame(yesterday, "day")) {
                messageDateFormatted = "Hier" + messageDate.format(" à HH:mm");
              } else {
                messageDateFormatted =
                  "le " + messageDate.format("DD MMMM YYYY à HH:mm");
              }

              if (m.sender.firstname == user.firstname) {
                return (
                  <MessagePerso
                    name={
                      <p style={{ fontWeight: "bold" }}>{m.sender.firstname}</p>
                    }
                    hour={messageDateFormatted}
                    message={m.message}
                  />
                );
              } else {
                return (
                  <MessageAutre
                    name={
                      <p style={{ fontWeight: "bold" }}>{m.sender.firstname}</p>
                    }
                    hour={messageDateFormatted}
                    message={m.message}
                  />
                );
              }
            })
          ) : (
            <p style={{ marginLeft: 20, color: "white", fontSize: 20 }}>
              Aucun message pour la colocation.
            </p>
          )}
        </div>
      </Box>
      <AddMessage user={user} setMessages={setMessages} />
    </div>
  );
};

const AddMessage = ({ user, setMessages }) => {
  const [message, setMessage] = useState("");
  async function addMessage(collocation, sender, message) {
    return useFetch(URLS.addMessage, "POST", {
      collocation,
      sender,
      message,
    }).then(() => {
      useFetch(
        URLS.getMessageFromColocation.replace("{idColoc}", user.colocation)
      ).then((messages) => {
        setMessages(messages);
        setMessage("");
      });
    });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 20,
        width: 1000,
      }}
    >
      <input
        style={{
          width: "100%",
          height: 50,
          border: "1px solid var(--bleuFonce)",
          padding: 10,
          marginTop: 10,
        }}
        value={message}
        placeholder="Nouveau message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => addMessage(user.colocation, user.id, message)}>
        Envoyer
      </button>
    </div>
  );
};

const MessageAutre = ({ name, hour, message }) => {
  return (
    <div style={{ marginTop: 7 }}>
      <NomHeure name={name} hour={hour} />
      <div className="messageAutre">
        <p style={{ fontSize: 22 }}>{message}</p>
      </div>
    </div>
  );
};

const NomHeure = ({ name, hour }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginBottom: 5,
      }}
    >
      <p style={{ marginRight: 5 }}>{name}</p>
      <p>{hour}</p>
    </div>
  );
};

const MessagePerso = ({ name, hour, message }) => {
  return (
    <div style={{ marginTop: 7, marginLeft: 700 }}>
      <div style={{ left: 160 }}>
        <NomHeure name={name} hour={hour} />
      </div>
      <div className="messagePerso">
        <p style={{ color: COLOR.blanc, fontSize: 22 }}>{message}</p>
      </div>
    </div>
  );
};
