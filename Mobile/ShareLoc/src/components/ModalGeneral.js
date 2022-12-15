import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import { COLOR } from "../constantes/Color";
import ButtonComponent from "../components/ButtonComponent";

/**
 *
 * @param {*} children composants enfants
 * @param  other props
 * @returns
 */
export default function ModalGeneral({ children, ...other }) {
  return (
    <Modal animationType="fade" transparent={true} {...other}>
      <View style={styles.view}>
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = new StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 15,
  },
  modal: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
