import React from "react";
import { Text, View, Button } from "react-native";
import { Login } from "../components/Login";

const Authentification = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>Authentification</Text>
      <Button
        title="Authentication"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Authentification;
