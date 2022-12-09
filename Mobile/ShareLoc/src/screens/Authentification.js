import React, { useState } from "react";

import { Text, View, Button, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const Authentification = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Saisissez votre email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Saisissez votre mot de passe"
        onChangeText={setPassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />

      <ButtonComponent primary><Text>CC</Text></ButtonComponent>
      <Button
        title="Authentication"
        onPress={() => navigation.navigate("Home")}
      />
      <TouchableOpacity
        
        onPress={() => navigation.navigate("Signup")}
      >
        <Text>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 250,
    height: 250,
  },
  input: {
    height: 40,
    width : 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

export default Authentification;
