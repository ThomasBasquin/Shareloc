import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../constantes/Color";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */
export default function BoxResume({ children, ...other }) {
  return (
    <View style={styles.view} {...other}>
      {children}
    </View>
  );
}

const styles = new StyleSheet.create({
  view: {
    margin: "5%",
    padding: 10,
    borderColor: COLOR.gris,
    backgroundColor: COLOR.bleuFonce,
    borderWidth: 1,
    borderRadius: 15,
    width: 130,
    elevation: 3,
  },
});
