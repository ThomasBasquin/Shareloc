import React, { useState } from "react";

import { Text, View, Button, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

const Signup = ({ navigation }) => {
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
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Confirmez votre mot de passe"
        onChangeText={setPassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />

      <ButtonComponent  primary ><Text>Connexion</Text></ButtonComponent>
      <Button
        title="Créez"
        onPress={() => navigation.navigate("Authentification")}
      />
      
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

export default Signup;
