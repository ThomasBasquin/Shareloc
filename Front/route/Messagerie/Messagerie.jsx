import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../constant/UseFetch";
import Box from "../../components/Box/Box";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { COLOR } from "../../constant/color"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {UserContext} from "../../context/UserContext";
import URLS from "../../constant/Routes";
import "./Messagerie.css";


export default function Messagerie() {
const [messages, setMessages] = useState([]);
  const {user}= useContext(UserContext);

  async function addMessage(prenom, heure, message) {
    return useFetch(URLS.register,"POST",{email,firstname,lastname,password})
    .then(() => {
        login(email,password);
    })
}

  useEffect(() => {
    useFetch(URLS.getMessageFromColocation.replace("{idColoc}",user.colocation))
    .then(setMessages)
  }, []);

  console.log({messages});
  return (
    <div className="">
      <Title title="Messagerie" id="title" />
      <Discussion messages={messages} user={user}/>
    </div>
  );
}

const Discussion = ({messages, user}) => {
  return (
    <div className="center">
      <Box style={{ width: "80%", height: 650 }}>
        <div style={{overflow: "scroll",overflowX:'none',  height : '100%'}}>
        {messages.length ? messages.map((m)=>
           {if(m.sender.firstname == user.firstname){
            return <MessagePerso name={m.sender.firstname} hour={m.sendAt} message={m.message}/>
           }
        else{
            return <MessageAutre name={m.sender.firstname} hour={m.sendAt} message={m.message} />
        }}   
          ) : <p style={{marginLeft:20, color : 'white', fontSize: 20}}>Aucun message pour la colocation.</p> }
        
        </div>
      </Box>
      <AddMessage />
    </div>
  );
};

const AddMessage =() => {
    const [message, setMessage] = useState("");
    return (
      <div style={{display : 'flex',flexDirection : 'row', padding : 20, width : 1000}}>
        <input
        style={{width : '100%', height : 50, border: '1px solid var(--bleuFonce)', padding : 10, marginTop : 10}}
        value={message}
        placeholder="Nouveau message"
        onChange={e => setMessage(e.target.value)} />
        <ButtonComponent>Envoyer</ButtonComponent>
      </div>
    )
  }
  
  const MessageAutre = ({name, hour, message}) => {
    return (<div style={{marginTop: 7}}>
      <NomHeure name={name} hour={hour} />
      <div className="messageAutre">
        <p>
          {message}
        </p>
      </div>
      </div>
    );
  };

  const NomHeure = ({name, hour}) => {
    return (
      <div style={{display : "flex",flexDirection: "row", marginLeft:5, marginBottom:5}}>
      <p style={{marginRight:5}}>{name}</p>
      <p>{hour}</p>
      </div>
    )
  }

  const MessagePerso = ({name, hour, message}) => {
    return (<div style={{marginTop: 7, marginLeft : 700}}>
      <div style={{left :160}}>
      <NomHeure name={name} hour={hour} />
      </div>
      <div className="messagePerso">
        
        <p style={{color : COLOR.blanc}}>
        {message}
        </p>
      </div>
      </div>
    );
  };
