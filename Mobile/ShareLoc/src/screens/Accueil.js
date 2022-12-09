import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import BoxGrise from "../components/BoxGrise"



const Accueil = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title title="Accueil" />
      <BoxGrise>
        <Text>Mes points</Text>
      </BoxGrise>
    </View>
  );
};

export default Accueil;
