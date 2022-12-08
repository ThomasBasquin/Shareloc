import React from "react";
import { Text, View, Button } from "react-native";
import { Login } from "../components/Login";

const Authentification = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Authentication"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Authentification;
