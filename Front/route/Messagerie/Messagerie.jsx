import React, { useState, useContext } from "react";
import Box from "../../components/Box/Box";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { COLOR } from "../../constant/color"
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
        <div style={{overflow: "scroll", height : '100%'}}>

        </div>
      </Box>
      <AddMessage />
    </div>
  );
};

const AddMessage =() => {
    const [message, setMessage] = useState("");
    return (
      <div style={{display : 'flex',flexDirection : 'row', padding : 20}}>
        <input
        className='ajoutMessage'
        value={message}
        placeholder="Nouveau message"
        onChange={setMessage} />
        <div style={{backgroundColor : COLOR.jaune, padding : 10, borderRadius : 20, height : 48, marginLeft : 10}}>
            <img src="../../src/assets/paper-plane-solid.svg" />
        </div>
      </div>
    )
  }
