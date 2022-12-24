import React, { useState,useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from "../Context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const {register} = useContext(AuthContext);

  function registerHandle(){
    if(comfirmPassword != password){
      setError({message : "Les deux mot de passe ne corresponent pas"});
      return;
    }
    register(email,firstname,lastname,password)
    .catch(err => setError({message :err.status==409 ? "Cette email a déjà un compte" : "Une erreur est survenue lors de la création de votre compte"}))
  }


  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      {error ? <ErrorMessage text={error.message} /> : null}
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Saisissez votre email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={firstname}
        placeholder="Saisissez votre prénom"
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        value={lastname}
        placeholder="Saisissez votre nom"
        onChangeText={setLastname}
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
        value={comfirmPassword}
        placeholder="Confirmez votre mot de passe"
        onChangeText={setComfirmPassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />

      <ButtonComponent
        primary
        onPress={registerHandle}
      >
        <Text>Créez</Text>
      </ButtonComponent>
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
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

export default Signup;
