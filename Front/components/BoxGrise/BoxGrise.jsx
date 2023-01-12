import React from "react";
import "./BoxGrise.css";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */
export default function BoxGrise({ children, ...other }) {
  return (
    <div className="boxGrise" {...other}>
      {children}
    </div>
  );
}


