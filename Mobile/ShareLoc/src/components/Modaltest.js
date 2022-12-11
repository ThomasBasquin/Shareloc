import React from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import {COLOR} from "../constantes/Color";

const Modaltest = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.center}>
        <View style={styles.modal}>
            <View>
          <Text style={styles.titre}>{props.title}</Text>
          </View>
          <Text>{props.contenu}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
          <ButtonComponent
            
            onPress={() => props.handleModalVisibility()}
          >Confirmer</ButtonComponent>
          <ButtonComponent primary
            
            onPress={() => props.handleModalVisibility()}
          ><Text>Annuler</Text></ButtonComponent>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modal: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titre: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,

  },
});

export default Modaltest;
