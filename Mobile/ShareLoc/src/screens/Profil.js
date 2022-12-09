import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import { COLOR } from "../constantes/Color";

const Profil = ({ navigation }) => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [Password, setPassword] = useState("Mpeg-f1973");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title title="Profil" />
      <View style={styles.view}>
        <Text style={styles.label}>Nom :</Text>
        <TextInput style={styles.input} value={Nom} onChangeText={setNom} />
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          value={Prenom}
          onChangeText={setPrenom}
        />
        <Text style={styles.label}>Email :</Text>
        <TextInput style={styles.input} value={Email} onChangeText={setEmail} />
        <Text style={styles.label}>Mot de passe :</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={[styles.input]}
            value={Password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword ? true : false}
            textContentType="oneTimeCode"
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              handleShowPassword();
            }}
          >
            <Ionicons
              name="eye-off"
              size={24}
              color={COLOR.grisFonce}
              style={{ right: 45, marginBottom: 5 }}
            />
          </TouchableOpacity>
        </View>
        <ButtonComponent style={{ width: 250 }} primary>
          <Text>Modifier mes informations</Text>
        </ButtonComponent>
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLOR.blanc,
    flexDirection: "column",
    marginTop: 35,
    margin: "5%",
    padding: 15,
    borderRadius: 15,
    elevation: 2.5,
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    color: COLOR.bleuFonce,
    width: "100%",
    marginLeft: 15,
  },
  input: {
    height: 40,
    width: 275,
    margin: 5,
    marginLeft: 15,
    marginTop: 7,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLOR.grisFonce,
    padding: 10,
    borderRadius: 15,
    color: COLOR.bleuFonce,
    fontWeight: "500",
    fontSize: 14,
  },
});
