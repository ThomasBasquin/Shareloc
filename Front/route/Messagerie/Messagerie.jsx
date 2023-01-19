import React, { useState, useContext } from "react";
import Box from "../../components/Box/Box";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { COLOR } from "../../constant/color"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./Messagerie.css";

export default function Messagerie() {
  return (
    <div className="">
      <Title title="Messagerie" id="title" />
      <Discussion />
    </div>
  );
}

const Discussion = () => {
  return (
    <div className="center">
      <Box style={{ width: "80%", height: 650 }}>
        <div style={{overflow: "scroll",overflowX:'none',  height : '100%'}}>
        <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
            <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          
          <MessagePerso name="Hugo" hour="12:29" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessagePerso name="Hugo" hour="12:29" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessagePerso name="Hugo" hour="12:29" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessagePerso name="Hugo" hour="12:29" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
          <MessageAutre name="Hugo" hour="12:21" message='TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT'/>
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
