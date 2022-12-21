import React, { useState,useEffect,useContext } from "react";

import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from "../Context/AuthContext";

const Authentification = ({ navigation }) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    useFetch(URLS.whoami).then(() => navigation.navigate("Home")).catch(err => console.log(err))
  }, []);

  function loginHandle(){
    setIsLoading(true);
    login(email,password)
    .catch(err =>{
      if(err.code===401){
        setError({...err,message:"L'email ou le mot de passe est incorrect"});
      }else{
        setError(err);
      }
    })
    .finally(()=> setIsLoading(false))
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
        value={password}
        placeholder="Saisissez votre mot de passe"
        onChangeText={setPassword}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
      <ButtonComponent
        style={{ width: 200 }}
        primary
        onPress={loginHandle}
      >
        <Text>Connexion</Text>
      </ButtonComponent>

      <TouchableOpacity disabled={isLoading} onPress={() => navigation.navigate("Signup")}>
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
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

export default Authentification;
