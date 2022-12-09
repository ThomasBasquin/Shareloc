import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";

const Accueil = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title title="Accueil" />
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    </View>
  );
};

export default Accueil;
