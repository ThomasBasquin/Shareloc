import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import ButtonComponent from "../components/ButtonComponent";
import ModalGeneral from "../components/ModalGeneral";
import { COLOR } from "../constantes/Color";

const Profil = ({ navigation }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleEditable = () => {
    setEditable(!editable);
  };

  const annuler = () => {
    setModalVisibility(!modalVisibility);
  };

  const valider = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Title title="Profil" />

          <View style={styles.view}>
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

            {!editable ? <ShowInfo /> : <EditInfo />}
            <ButtonComponent
              style={{ width: 230, marginLeft: 75, marginTop: -30 }}
              primary
              onPress={() => {
                handleEditable();
              }}
            >
              <Text>Modifier mes informations</Text>
            </ButtonComponent>
          </View>
        </View>
        <ModalGeneral visible={modalVisibility}>
          <Text style={styles.titreModal}>
            Voulez-vous vraiment quitter votre collocation ?
          </Text>

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

const ShowInfo = () => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [number, setNumber] = useState("06 12 34 56 78");
  const [Password, setPassword] = useState("PetitCoquin");

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
          value={Nom}
          onChangeText={setNom}
          editable={false}
        />
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          value={Prenom}
          onChangeText={setPrenom}
          editable={false}
        />
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          value={Email}
          onChangeText={setEmail}
          editable={false}
        />
        <Text style={styles.label}>Numéro de portable :</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
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
            value={Password}
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

const EditInfo = () => {
  const [Nom, setNom] = useState("Basquin");
  const [Prenom, setPrenom] = useState("Thomas");
  const [Email, setEmail] = useState("thomas.basquin2@gmail.com");
  const [number, setNumber] = useState("06 12 34 56 78");
  const [Password, setPassword] = useState("PetitCoquin");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          value={Nom}
          onChangeText={setNom}
          editable={true}
        />
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          value={Prenom}
          onChangeText={setPrenom}
          editable={true}
        />
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          value={Email}
          onChangeText={setEmail}
          editable={true}
        />
        <Text style={styles.label}>Numéro de portable :</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          editable={true}
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
            value={Password}
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
