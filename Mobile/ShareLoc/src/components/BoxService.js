import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../constantes/Color";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */

export default function BoxService({ children, ...other }) {
  return (
    <View style={styles.view} {...other}>
      {children}
    </View>
  );
}

const styles = new StyleSheet.create({
  view: {
    flexDirection: "row",
    margin: "5%",
    padding: 15,
    backgroundColor: COLOR.gris,
    borderRadius: 15,
    elevation: 2.5,
  },
});
