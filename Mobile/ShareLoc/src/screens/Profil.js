import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import ModalGeneral from "../components/ModalGeneral";
import { COLOR } from "../constantes/Color";
import { AuthContext } from "../Context/AuthContext";
import { UserContext } from "../Context/UserContext";
import useFetch from "../constantes/UseFetch";
import URLS from "../constantes/Routes";

const Profil = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { user, setUserInfo } = useContext(UserContext);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editable, setEditable] = useState(true);
  const [error, setError] = useState(null);

  const handleEditable = () => {
    setEditable(!editable);
  };

  function updateUser(userInfo) {
    useFetch(URLS.updateUser.replace("{id}", user.id), "PUT", {
      userInfo,
    }).then(() => setEditable(false));
  }

  const annuler = () => {
    setModalVisibility(!modalVisibility);
    setError(null);
  };

  const valider = () => {
    useFetch(URLS.leaveColocation.replace("{user}", user.id))
      .then(() => {
        setUserInfo({ ...user, colocation: null });
        setModalVisibility(false);
        setError(null);
      })
      .catch((e) => setError(e));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Title title="Profil" />

          <View style={styles.view}>
            {user.colocation ? (
              <ButtonComponent
                style={{
                  width: 180,
                  top: -123.5,
                  marginLeft: 140,
                }}
                red
                onPress={() => {
                  setModalVisibility(!modalVisibility);
                }}
              >
                <Text style={{ color: "white" }}>Quitter ma colocation</Text>
              </ButtonComponent>
            ) : null}
            <View style={{ marginTop: 25 }}>
              {!editable ? (
                <ShowInfo user={user} />
              ) : (
                <EditInfo setEditable={setEditable} />
              )}
            </View>
            <ButtonComponent onPress={logout}>Deconnexion</ButtonComponent>
          </View>
        </View>
        <ModalGeneral visible={modalVisibility}>
          <Text style={styles.titreModal}>
            Voulez-vous vraiment quitter votre collocation ?
          </Text>
          {error ? (
            <Text
              style={{ backgroundColor: "red", color: "white", padding: 10 }}
            >
              {error.detail}
            </Text>
          ) : null}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ButtonComponent style={{ width: 55 }} onPress={() => valider()}>
              Oui
            </ButtonComponent>
            <ButtonComponent primary onPress={() => annuler()}>
              <Text>Annuler</Text>
            </ButtonComponent>
          </View>
        </ModalGeneral>
      </ScrollView>
    </SafeAreaView>
  );
};

const ShowInfo = ({ user }) => {
  const [lastname, setLastname] = useState(user.lastname);
  const [firstname, setFirstname] = useState(user.firstname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  return (
    <View>
      <View
        style={{
          bottom: 70,
          elevation: 12,
          borderRadius: 20,
          padding: 15,
          paddingRight: 15,
          backgroundColor: COLOR.blanc,
        }}
      >
        <Text style={[styles.label]}>Nom :</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          editable={false}
        />
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          value={firstname}
          onChangeText={setFirstname}
          editable={false}
        />
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={false}
        />
        <Text style={styles.label}>Mot de passe :</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            width: 275,
            height: 40,
            marginLeft: 0,
            marginTop: 7,
            marginBottom: 15,
            borderColor: COLOR.grisFonce,
            borderRadius: 15,
          }}
        >
          <TextInput
            style={[
              styles.input,
              {
                width: 240,
                borderWidth: 0,
                margin: 0,
                padding: 0,
                marginBottom: 7,
                marginLeft: 10,
              },
            ]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType="oneTimeCode"
            editable={false}
          ></TextInput>
        </View>
      </View>
    </View>
  );
};

const EditInfo = (setEditable) => {
  const { user } = useContext(UserContext);

  const [lastname, setLastname] = useState(user.lastname);
  const [firstname, setFirstname] = useState(user.firstname);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function updateUser() {
    const passwordBody = password.length ? { password } : {};
    useFetch(URLS.updateUser.replace("{id}", user.id), "PUT", {
      ...passwordBody,
      lastname,
      firstname,
      email,
    })
      .then((u) => {
        setEditable(false);
      })
      .catch((e) => console.log(e));
  }

  return (
    <View>
      <View
        style={{
          bottom: 70,
          elevation: 12,
          borderRadius: 20,
          padding: 15,
          paddingRight: 15,
          backgroundColor: COLOR.blanc,
        }}
      >
        <Text style={[styles.label]}>Nom :</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          editable={true}
        />
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          value={firstname}
          onChangeText={setFirstname}
          editable={true}
        />
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={false}
        />
        <Text style={styles.label}>Mot de passe :</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            width: 275,
            height: 40,
            marginLeft: 0,
            marginTop: 7,
            marginBottom: 15,
            borderColor: COLOR.grisFonce,
            borderRadius: 15,
          }}
        >
          <TextInput
            style={[
              styles.input,
              {
                width: 240,
                borderWidth: 0,
                margin: 0,
                padding: 0,
                marginBottom: 7,
                marginLeft: 10,
              },
            ]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword ? true : false}
            textContentType="oneTimeCode"
            editable={true}
          ></TextInput>
          <TouchableOpacity
            onPressIn={() => {
              handleShowPassword();
            }}
          >
            <Ionicons
              name={!showPassword ? "eye-off" : "eye"}
              size={24}
              color={COLOR.grisFonce}
              style={{ right: 12, marginBottom: 0 }}
            />
          </TouchableOpacity>
        </View>
        <ButtonComponent primary onPress={updateUser}>
          Valider
        </ButtonComponent>
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  view: {
    // backgroundColor: COLOR.blanc,
    flexDirection: "column",
    marginTop: 35,
    margin: "5%",
    padding: 10,
    // borderRadius: 10,
    // elevation: 2.5,
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
    marginLeft: 0,
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
  titreModal: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
