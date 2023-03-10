import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../constantes/Color";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */
export default function BoxGrise({ children, ...other }) {
  return (
    <View style={styles.view} {...other}>
      {children}
    </View>
  );
}

const styles = new StyleSheet.create({
  view: {
    margin: "3%",
    padding: 15,
    borderColor: COLOR.bleuFonce,
    backgroundColor: COLOR.grisFonce,

    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
