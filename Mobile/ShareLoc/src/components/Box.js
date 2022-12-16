import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../constantes/Color";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */
export default function Box({ children, ...other }) {
  return (
    <View style={styles.view} {...other}>
      {children}
    </View>
  );
}

const styles = new StyleSheet.create({
  view: {
    margin: "5%",
    padding: 12,
    borderColor: COLOR.gris,
    backgroundColor: COLOR.blanc,
    borderWidth: 1,
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
