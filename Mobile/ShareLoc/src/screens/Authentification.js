import React from "react";

import { Text, View, Button } from "react-native";

const Authentification = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button
        title="Authentication"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Authentification;
