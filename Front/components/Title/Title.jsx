import React from "react";
import "./Title.css";

/**
 *
 * @param {*} title titre
 * @returns
 */
export default function Title({ title }) {
  return (
    <div className="view">
      <p className="text">{title}</p>
      <div className="underline" />
    </div>
  );
}

