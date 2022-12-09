import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import BoxGrise from "../components/BoxGrise"
import { FontAwesome } from '@expo/vector-icons';
import {COLOR} from "../constantes/Color"


const Accueil = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title title="Accueil" />
      <BoxGrise>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.points}>Mes points</Text>
        <Text style={styles.pointsScore}>76 <FontAwesome name="star" size={24} color={COLOR.jaune} /></Text>
        

        </View>
      </BoxGrise>
    </View>
  );
};
const styles = StyleSheet.create({
  points: {
    fontSize: 20,
    fontWeight: '600'
  },
  pointsScore: {
    fontSize: 20,
    fontWeight: '600',
    
  },

});

export default Accueil;
