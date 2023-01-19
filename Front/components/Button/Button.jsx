import React from "react";
import "./Button.css";
import { COLOR } from "../../constant/color";

export default function Button({
  children,
  primary = false,
  red = false,
  style,
  ...other
}) {
  return (
    <button
      className="buttonComposant"
      style={{
        ...style,
        backgroundColor: primary
          ? COLOR.bleuFonce
          : red
          ? "rgb(203, 27, 27)"
          : COLOR.jaune,
        color: primary ? COLOR.jaune : red ? "white" : COLOR.bleuFonce,
      }}
      {...other}
    >
      <p
        className="intituleButton"
        style={{
          color: primary ? COLOR.jaune : red ? "white" : COLOR.bleuFonce,
        }}
      >
        {children}
      </p>
    </button>
  );
}
