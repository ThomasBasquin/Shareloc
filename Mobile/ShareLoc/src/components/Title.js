import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../constantes/Color";

/**
 *
 * @param {*} title titre
 * @returns
 */
export default function Title({ title }) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = new StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "800",
    color: COLOR.bleuFonce,
  },
  view: {
    margin: 15,
  },
  underline: {
    backgroundColor: COLOR.jaune,
    width: 40,
    height: 5,
    left: 10,
    position: "relative",
    borderRadius: 15,
  },
});
