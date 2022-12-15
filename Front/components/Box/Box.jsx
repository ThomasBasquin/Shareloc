import React from "react";
import "./Box.css";

/**
 * 
 * @param {*} children composants enfants 
* @param  other props
 * @returns 
 */
export default function Box({
    children,
    ...other

}){

    return (
        <div className="box" {...other}>
            {children}
        </div>
    )
}