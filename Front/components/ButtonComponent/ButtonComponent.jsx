import React from "react";
import './ButtonComponent.css';
import {Link} from "react-router-dom";
import {COLOR} from "../../constant/color"

/**
 *
 * @param {*} primary  Permet de choisir le style du bouton , false apr défaut
 * * @param {*} link Lien vers la page souhaité
 * @param children composants enfant
 * @param style
 * @param other props
 * @returns ButtonComponent
 */
export default function ButtonComponent({
  children,
  primary = false,
link,
  style,
  ...other
}) {
  const route = "/"+link;
  return (
    <Link
    to={route}
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
    </Link>
  );
}


