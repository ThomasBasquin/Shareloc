import React from "react";

import { Text, View, Button } from "react-native";
import ButtonCustom from "../components/Button";

const Authentification = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ButtonCustom btnText="Cliquez ici !" primary />
      <Button
        title="Authentication"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Authentification;
