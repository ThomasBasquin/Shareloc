import React from "react";
import "./Button.css";
import { COLOR } from "../../constant/color";


export default function Button({
  children,
  primary = false,
  style,
  ...other
}) {
  return (
    <button
      className="buttonComposant"
      style={{
        ...style,
        backgroundColor: primary ? COLOR.bleuFonce : COLOR.jaune,
        color: primary ? COLOR.jaune : COLOR.bleuFonce,
      }}
      {...other}
    >
      <p
        className="intituleButton"
        style={{
          color: primary ? COLOR.jaune : COLOR.bleuFonce,
        }}
      >
        {children}
      </p>
    </button>
  );
}
