import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constantes/Color";


/**
 * 
 * @param {*} primary  Permet de choisir le style du bouton , false apr défaut
 * @param children composants enfant
 * @param style
 * @param other props
 * @returns ButtonComponent 
 */
export default function ButtonComponent({
  children,
  primary = false,
  style,
  ...other
}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.pressable,
        ...style,
        backgroundColor: primary ? COLOR.bleuFonce : COLOR.jaune,
        color: primary ? COLOR.jaune : COLOR.bleuFonce,
      }}
      {...other}
    >
      <Text
        style={{...styles.text, color: primary ? COLOR.jaune : COLOR.bleuFonce }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 15,
    margin: 15,
    padding: 10,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  text: {
    fontSize:16,
    fontWeight: "800",
    width:"100%",
    textAlign:"center"
  },
});
